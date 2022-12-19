import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import { useSession, signOut } from "next-auth/react"

import type { PropsWithChildren } from 'react';



const UserLayout = ({ children }: PropsWithChildren) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);

  // Catch resizing window width
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize! <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  // ==================================

  const router = useRouter()

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize! <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className=' min-h-screen w-full bg-gray-800 text-slate-200'>
      <div className='flex gap-6'>
        <div className='w-fit px-8 py-4 flex flex-col gap-8 h-screen bg-gray-700'>
          <div className='text-xl'>User Dashboard</div>
          <div className=' flex flex-col gap-4'>
            <div><Link href="/userdashboard">Dashboard</Link></div>
            <div><Link href="/userdashboard/profile">Profile</Link></div>
            <div><Link href="/userdashboard/schedule">Schedule</Link></div>
          </div>
          <div>
            <div className=' base__button bg-red-500 hover:bg-red-700' onClick={() => signOut().finally(() => router.push("/"))}>Sign Out</div>
          </div>
        </div>
        <div className='w-full p-8'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout