'use client';

import { useGetNowPlayingMovies } from '@/hooks/api/movies';
import { Button } from '@nextui-org/react';
import { useMemo } from 'react';
import { Spinner } from '@nextui-org/react';

const Home = () => {
  const {
    data: nowPlayingMovies,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetNowPlayingMovies();

  const movies = useMemo(
    () => nowPlayingMovies?.pages.flatMap(({ results }) => results) ?? [],
    [nowPlayingMovies?.pages]
  );

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      {isFetching && (
        <Spinner label='Načítavanie...' color='warning' labelColor='warning' />
      )}

      {!isFetching && !!movies.length && (
        <div className='my-7'>
          {movies.map((movie) => (
            <div key={movie.id} className='text-white'>
              {movie.title}
            </div>
          ))}

          {hasNextPage && (
            <Button className='mt-5' onClick={() => fetchNextPage()}>
              Načítať ďalšie
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
