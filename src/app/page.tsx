'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { MdOutlineStarBorder } from 'react-icons/md';

const Home = () => {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex items-center justify-center relative w-full'>
        <h1 className='text-6xl'>Filmy</h1>
        <Button
          className='absolute right-2'
          disableAnimation
          startContent={<MdOutlineStarBorder className='text-yellow-400' />}
          onClick={() => router.push('/favorites')}>
          Obľúbené
        </Button>
      </div>
    </div>
  );
};

export default Home;
