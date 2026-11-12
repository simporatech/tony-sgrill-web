import imageCompression from 'browser-image-compression';

export interface CompressedImageResult {
  file: File;
  dataUrl: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  savingsPercent: number;
}

/**
 * Client-Side Image Compression Utility for Tony's Grill CMS
 * 
 * Compresses images client-side before sending to Supabase Storage:
 * - Target Max Size: 200 KB
 * - Max Resolution Width/Height: 1920 px
 * - Output format: WebP (or fallback JPEG)
 * - Quality: Visually lossless (~85%)
 */
export async function compressClientImage(file: File): Promise<CompressedImageResult> {
  const originalSizeKB = Math.round(file.size / 1024);

  const options = {
    maxSizeMB: 0.2, // ~200 KB maximum
    maxWidthOrHeight: 1920, // Max 1920px
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.85,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const compressedSizeKB = Math.round(compressedFile.size / 1024);
    const savingsPercent = Math.max(0, Math.round(((file.size - compressedFile.size) / file.size) * 100));

    // Convert to DataURL for immediate local preview and storage
    const dataUrl = await imageCompression.getDataUrlFromFile(compressedFile);

    return {
      file: compressedFile,
      dataUrl,
      originalSizeKB,
      compressedSizeKB,
      savingsPercent,
    };
  } catch (error) {
    console.warn('browser-image-compression failed, using canvas fallback:', error);
    return fallbackCanvasCompress(file);
  }
}

/**
 * Native Canvas compression fallback if web worker / library encounters unsupported image formats
 */
function fallbackCanvasCompress(file: File): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const maxDim = 1920;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export to WebP at 0.82 quality
        const dataUrl = canvas.toDataURL('image/webp', 0.82);
        
        // Approximate size
        const head = 'data:image/webp;base64,';
        const rawBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const compressedSizeKB = Math.round(rawBytes / 1024);
        const originalSizeKB = Math.round(file.size / 1024);
        const savingsPercent = Math.max(0, Math.round(((file.size - rawBytes) / file.size) * 100));

        // Create dummy compressed file
        const blob = dataURItoBlob(dataUrl);
        const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
          type: "image/webp",
        });

        resolve({
          file: compressedFile,
          dataUrl,
          originalSizeKB,
          compressedSizeKB,
          savingsPercent,
        });
      };
      img.onerror = (e) => reject(e);
    };
    reader.onerror = (e) => reject(e);
  });
}

function dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

