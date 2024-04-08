'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between w-full p-5'>
      <h1 onClick={() => router.push('/')} className='text-6xl cursor-pointer'>
        Movies
      </h1>
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
