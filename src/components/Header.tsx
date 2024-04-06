'use client';

import { MdOutlineStarBorder } from 'react-icons/md';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between w-full p-5'>
      <h1 onClick={() => router.push('/')} className='text-6xl cursor-pointer'>
        Filmy
      </h1>
      <Button
        disableAnimation
        startContent={<MdOutlineStarBorder className='text-yellow-400' />}
        onClick={() => router.push('/favorites')}>
        Obľúbené
      </Button>
    </div>
  );
};

export default Header;
