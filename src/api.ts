import axios from 'axios';
import { type UnsplashResponse } from './types';

export const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;

export async function fetchImages(
  query: string,
  page = 1,
): Promise<UnsplashResponse> {
  const response = await axios.get<UnsplashResponse>(
    'https://api.unsplash.com/search/photos',
    {
      params: {
        query,
        client_id: accessKey,
        page,
        per_page: 12,
      },
    },
  );

  return response.data;
}
