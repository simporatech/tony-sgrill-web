import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Image as ImageIcon, Link as LinkIcon, X, Loader2 } from 'lucide-react';
import { compressClientImage, CompressedImageResult } from '../../utils/imageCompression';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  helperText = 'Compresión automática WebP ≤ 200KB a 1920px max',
}) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalKB: number;
    compressedKB: number;
    savings: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor seleccione un archivo de imagen válido (JPG, PNG, WEBP).');
      return;
    }

    setIsCompressing(true);
    try {
      const result: CompressedImageResult = await compressClientImage(file);
      setCompressionStats({
        originalKB: result.originalSizeKB,
        compressedKB: result.compressedSizeKB,
        savings: result.savingsPercent,
      });
      // Store the compressed base64 dataUrl (ready for Supabase Storage or preview)
      onChange(result.dataUrl);
    } catch (err) {
      console.error('Error al comprimir la imagen:', err);
      alert('Hubo un problema al comprimir la imagen. Puede usar el campo de URL directa como alternativa.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-[10px] text-zinc-500 font-mono">
          {helperText}
        </span>
      </div>

      {/* Upload Zone & Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-[#D90302] bg-[#D90302]/10' 
            : 'border-white/10 hover:border-white/20 bg-[#161619] hover:bg-[#1a1a1e]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {isCompressing ? (
          <div className="py-2 flex items-center justify-center gap-2 text-xs text-zinc-300">
            <Loader2 className="w-4 h-4 animate-spin text-[#D90302]" />
            <span>Comprimiendo a WebP &lt;200KB (visual lossless)...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
              <UploadCloud className="w-4 h-4 text-[#EBFA00]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">
                Subir y Comprimir Imagen
              </p>
              <p className="text-[10px] text-zinc-400">
                Arrastre o haga clic (JPG, PNG, WebP)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Compression Success Badge */}
      {compressionStats && (
        <div className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#03AF45]" />
            Compresión exitosa
          </span>
          <span className="font-mono text-[10px]">
            {compressionStats.originalKB} KB → <strong className="text-white">{compressionStats.compressedKB} KB</strong> (-{compressionStats.savings}%)
          </span>
        </div>
      )}

      {/* Fallback Text Input for Direct URL */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
          <LinkIcon className="w-3 h-3 text-zinc-500" />
          <span>O pegar URL externa (Fallback):</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={value.startsWith('data:') ? '(Imagen local comprimida en WebP)' : value}
            onChange={(e) => {
              setCompressionStats(null);
              onChange(e.target.value);
            }}
            placeholder="https://images.unsplash.com/..."
            className="flex-grow px-3 py-1.5 bg-[#1b1b1e] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D90302] font-mono text-[11px]"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                setCompressionStats(null);
                onChange('');
              }}
              className="p-1.5 text-zinc-500 hover:text-red-400 rounded-md hover:bg-white/5 transition-colors"
              title="Limpiar imagen"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mini Image Preview */}
      {value && (
        <div className="relative rounded-lg overflow-hidden border border-white/10 h-20 bg-black/40 flex items-center justify-center">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover filter brightness-90"
          />
          <span className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-zinc-300">
            Vista Previa Activa
          </span>
        </div>
      )}
    </div>
  );
};
