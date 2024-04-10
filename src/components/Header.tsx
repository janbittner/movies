'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { PiTelevisionBold } from 'react-icons/pi';

const Header = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between w-full p-5'>
      <div className='flex' onClick={() => router.push('/')}>
        <PiTelevisionBold
          className='text-6xl cursor-pointer bg-gradient-to-r from-red-500 to-yellow-500 inline-block text-transparent bg-clip-text'
          color='orange'
        />
        <h1 className='hidden sm:inline-block text-6xl font-black cursor-pointer bg-gradient-to-r from-yellow-600 to-red-500 text-transparent bg-clip-text'>
          Movies
        </h1>
      </div>
      <Button
        radius='full'
        className='bg-gradient-to-tr from-red-500 to-yellow-500 text-white shadow-lg'
        onClick={() => router.push('/favorites')}>
        Favorites
      </Button>
    </div>
  );
};

export default Header;
