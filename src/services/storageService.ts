import { supabase, isSupabaseConfigured } from './supabaseClient';
import imageCompression from 'browser-image-compression';

/**
 * Uploads a client-side compressed image file to the Supabase 'cms_images' bucket.
 * Returns the permanent public CDN URL.
 */
export async function uploadCmsImage(compressedFile: File): Promise<string> {
  // If Supabase credentials are not configured yet, fallback to Data URL for uninterrupted local preview
  if (!isSupabaseConfigured()) {
    console.info('Supabase not configured in .env. Falling back to local data URL.');
    return await imageCompression.getDataUrlFromFile(compressedFile);
  }

  const fileExt = 'webp';
  const cleanBaseName = compressedFile.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
  const fileName = `${cleanBaseName}_${Date.now()}.${fileExt}`;
  const filePath = `cms/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('cms_images')
    .upload(filePath, compressedFile, {
      contentType: 'image/webp',
      cacheControl: '31536000', // 1 year cache
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading image to Supabase Storage:', uploadError);
    // Fallback to Data URL so UI doesn't break
    return await imageCompression.getDataUrlFromFile(compressedFile);
  }

  const { data: publicUrlData } = supabase.storage
    .from('cms_images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

