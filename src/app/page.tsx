'use client';

import { useGetNowPlayingMovies } from '@/hooks/api/movies';
import { Button, Input } from '@nextui-org/react';
import { useMemo } from 'react';
import { Spinner } from '@nextui-org/react';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';
import { MdOutlineSearch } from 'react-icons/md';

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
    <div className='flex flex-col items-center justify-center'>
      <Input
        isClearable
        radius='full'
        classNames={{
          base: ['max-w-md', 'px-8'],
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60',
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focused=true]:bg-default-200/50',
            'dark:group-data-[focused=true]:bg-default/60',
            '!cursor-text',
          ],
        }}
        placeholder='Type to search...'
        startContent={
          <MdOutlineSearch className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
        }
      />

      <div className='flex flex-col justify-center items-center min-h-96'>
        {isFetching && !movies.length && (
          <Spinner label='Loading...' color='warning' labelColor='warning' />
        )}

        {!!movies.length && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20'>
            {movies.map((movie: Movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}

        {hasNextPage && (
          <Button
            className='mb-5'
            onClick={() => fetchNextPage()}
            radius='full'>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
