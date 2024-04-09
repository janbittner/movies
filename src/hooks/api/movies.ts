import { api } from '@/api/api';
import endpoints from '@/api/endpoints';
import { Movie } from '@/types/movie';
import { useInfiniteQuery } from '@tanstack/react-query';
import qs from 'qs';

type PaginatedMoviesResponse = {
  dates: { maximum: string; minimum: string };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const getNowPlayingMovies = async (page: number) => {
  const query = qs.stringify({
    page,
  });
  const response = await api.get<PaginatedMoviesResponse>(
    `${endpoints.MOVIE.NOW_PLAYING}?${query}`
  );

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

const searchMovies = async (page: number, searchQuery: string) => {
  const query = qs.stringify({
    page,
    include_adult: false,
    query: searchQuery,
  });
  const response = await api.get<PaginatedMoviesResponse>(
    `${endpoints.MOVIE.SEARCH}?${query}`
  );

  return response.data;
};

export const useSearchMovies = (searchQuery: string) => {
  const initialPage = 1;

  return useInfiniteQuery({
    queryKey: ['search-movies', searchQuery],
    queryFn: ({ pageParam }) => searchMovies(pageParam, searchQuery),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    enabled: !!searchQuery,
  });
};
