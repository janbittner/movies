import { api } from '@/api/api';
import endpoints from '@/api/endpoints';
import { useInfiniteQuery } from '@tanstack/react-query';
import qs from 'qs';

const getNowPlayingMovies = async (page: number) => {
  const query = qs.stringify({
    page,
    language: 'sk',
  });
  const response = await api.get(`${endpoints.MOVIE.NOW_PLAYING}?${query}`);
  return response.data;
};

export const useGetNowPlayingMovies = () => {
  const initialPage = 1;

  return useInfiniteQuery({
    queryKey: ['now-playing-movies'],
    queryFn: ({ pageParam }) => getNowPlayingMovies(pageParam),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};
