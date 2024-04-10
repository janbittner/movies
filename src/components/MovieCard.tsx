/* eslint-disable @next/next/no-img-element */
import { Movie } from '@/types/movie';
import { MdOutlineStar } from 'react-icons/md';
import React from 'react';
import { useFavoritesStore } from '@/store/favorites';
import {
  Card,
  CardFooter,
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

interface Props {
  movie: Movie;
  actionButtonType: 'add' | 'remove';
}

const MovieCard = ({ movie, actionButtonType }: Props) => {
  const addIdToFavorites = useFavoritesStore((state) => state.addMovieId);
  const removeFromFavorites = useFavoritesStore((state) => state.removeMovieId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      onClick={onOpen}
      className='cursor-pointer border-none group relative overflow-hidden h-full '>
      <Card
        isFooterBlurred
        radius='lg'
        className='border-none group relative overflow-hidden h-full'>
        <img
          className='object-cover h-full w-full'
          alt={movie.title}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'missing-poster.png'
          }
        />
        <CardFooter className='hidden backdrop-blur-3xl group-hover:flex flex-col justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xl ml-1 z-10'>
          <p className='text-tiny text-white/80 mt-3 mb-2 line-clamp-6'>
            {movie.overview || 'Overview missing for this movie..'}
          </p>

          <div className='my-1 flex justify-between items-center w-full'>
            <Chip
              className='text-tiny cursor-default'
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
              size='sm'
              onClick={() =>
                actionButtonType === 'add'
                  ? addIdToFavorites(movie.id)
                  : removeFromFavorites(movie.id)
              }>
              {actionButtonType === 'add' ? 'Add to favorites' : 'Remove'}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='max-h-fit m-10'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col text-center bg-gradient-to-r from-yellow-600 to-red-500 text-transparent bg-clip-text'>
                {movie.title}
              </ModalHeader>
              <ModalBody className='flex flex-col items-center text-center'>
                <img
                  className='object-cover max-h-52'
                  alt={movie.title}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'missing-poster.png'
                  }
                />
                <p className='text-small text-white/80 mt-3 mb-2'>
                  {movie.overview || 'Overview missing for this movie..'}
                </p>
              </ModalBody>
              <ModalFooter className='flex gap-3'>
                <Button
                  className='text-tiny bg-gradient-to-tr from-yellow-500 to-red-500 text-white shadow-xl mt-1'
                  variant='shadow'
                  radius='full'
                  size='sm'
                  onClick={() =>
                    actionButtonType === 'add'
                      ? addIdToFavorites(movie.id)
                      : removeFromFavorites(movie.id)
                  }>
                  {actionButtonType === 'add' ? 'Add to favorites' : 'Remove'}
                </Button>
                <Button
                  variant='shadow'
                  color='danger'
                  radius='full'
                  size='sm'
                  className='text-tiny mt-1'
                  onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MovieCard;
