'use client';
import MovieCard from '@/components/MovieCard';
import { useGetMoviesByIds } from '@/hooks/api/movies';
import { useFavoritesStore } from '@/store/favorites';
import { Spinner } from '@nextui-org/react';

const Favorites = () => {
  const favoritesIds = useFavoritesStore((state) => state.moviesIds);
  const { data: movies, pending } = useGetMoviesByIds(favoritesIds);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col text-xl font-bold text-center bg-gradient-to-r from-yellow-600 to-red-500 text-transparent bg-clip-text'>
        Favorite movies
      </div>

      <div className='flex flex-col justify-center items-center min-h-96'>
        {pending && !movies.length && (
          <Spinner label='Loading...' color='warning' labelColor='warning' />
        )}

        {!pending && !!movies.length && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20'>
            {movies.map(
              (movie) =>
                movie && (
                  <div key={movie.id}>
                    <MovieCard movie={movie} actionButtonType='remove' />
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
