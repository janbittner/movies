import { api } from '@/api/api';
import endpoints from '@/api/endpoints';
import { Movie } from '@/types/movie';
import {
  UseQueryResult,
  useInfiniteQuery,
  useQueries,
} from '@tanstack/react-query';
import qs from 'qs';
import { useCallback } from 'react';

type PaginatedMoviesResponse = {
  dates: { maximum: string; minimum: string };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const getMovieById = async (id: number) => {
  const response = await api.get<Movie>(`${endpoints.MOVIE.GET}/${id}`);

  return response.data;
};

export const useGetMoviesByIds = (ids: number[]) => {
  const combineUseCallback = useCallback(
    (results: UseQueryResult<Movie, Error>[]) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
    []
  );

  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['movie', id],
      queryFn: () => getMovieById(id),
    })),
    combine: combineUseCallback,
  });
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
