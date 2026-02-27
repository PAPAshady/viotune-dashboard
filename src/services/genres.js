import supabase from './supabase';

import { getFileUrl, uploadFile } from './storage';

export const getGenres = async () => {
  const { data, error } = await supabase.from('genres_extended').select('*');
  if (error) throw error;
  return data;
};

export const getGenresStats = async () => {
  const { data, error } = await supabase.functions.invoke('get_genres_stats');
  if (error) throw error;
  return data;
};

export const createGenre = async (data) => {
  const uploadedAt = new Date().toISOString();
  const newGenre = { ...data };

  // upload genre coverfile if it exists
  if (newGenre.coverFile && newGenre.coverFile.length > 0) {
    const coverFile = newGenre.coverFile[0];

    const { data: coverFileData, error: coverFileError } = await uploadFile(
      'genres-cover',
      `${newGenre.title}-${uploadedAt}`,
      coverFile
    );

    if (coverFileError) throw coverFileError;

    newGenre.cover_path = coverFileData.path;
    newGenre.cover = getFileUrl('genres-cover', coverFileData.path);
  }

  // delete coverFile property because we already exctracted it
  delete newGenre.coverFile;

  const { data: dbData, error: dbError } = await supabase
    .from('genres')
    .insert(newGenre)
    .select()
    .single();

  if (dbError) throw dbError;

  return dbData;
};

export const updateGenre = async (data) => console.log(data);
