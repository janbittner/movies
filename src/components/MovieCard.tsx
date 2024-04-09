/* eslint-disable @next/next/no-img-element */
import { Movie } from '@/types/movie';
import { Card, CardFooter, Button, Chip } from '@nextui-org/react';
import { MdOutlineStar } from 'react-icons/md';

import React from 'react';

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card
      isFooterBlurred
      radius='lg'
      className='border-none group relative overflow-hidden h-full'>
      <img
        className='object-cover h-full w-full'
        alt='todo'
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'missing-poster.png'
        }
      />
      <CardFooter className='hidden backdrop-blur-3xl group-hover:flex flex-col justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xl ml-1 z-10'>
        <p className='text-tiny text-white/80 line-clamp-6'>{movie.overview}</p>
        <div className='mb-1 mt-3 flex justify-between items-center w-full'>
          <Chip
            className='text-tiny'
            radius='full'
            color='warning'
            variant='solid'
            startContent={<MdOutlineStar />}>
            {(Math.round(movie.vote_average * 10) / 10).toString()}
          </Chip>
          <Button
            className='text-tiny bg-gradient-to-tr from-yellow-500 to-red-500 text-white shadow-xl'
            variant='shadow'
            radius='full'
            size='sm'>
            Add to favorites
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
