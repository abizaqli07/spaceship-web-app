import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';

import { signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';

import { AiFillSchedule, AiFillSetting } from 'react-icons/ai';
import { BiPlanet, BiSearch } from 'react-icons/bi';
import { FaSpaceShuttle, FaUserAlt, FaUserAstronaut, FaUserSecret } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { HiNewspaper } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';


const AdminLayout = ({ children }: PropsWithChildren) => {
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
    if (screenSize! <= 1024) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  // ==================================

  const router = useRouter()

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize! <= 1024) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md text-gray-200 hover:bg-primary m-2 transition-all duration-300 ease-in-out';


  return (
    <div className='min-h-screen'>

      {/* =================== Sidebar ================== */}
      {activeMenu && (
        <div className='w-72 fixed z-50 sidebar gradient'>
          <div className=' ml-3 h-screen lg:overflow-hidden overflow-auto lg:hover:overflow-auto pb-10'>
            <>
              <div className="flex justify-between items-center">
                <Link href="/" className="items-center gap-3 ml-3 mt-4 flex text-2xl font-extrabold tracking-tight text-white ">
                  <FaUserSecret /> <span>Admin</span>
                </Link>
              </div>
              <div className="mt-10 ">
                {/* Infographics menu */}
                <div>
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    infographics
                  </p>
                  <Link
                    href={`/admindashboard`}
                    onClick={handleCloseSideBar}
                    className={`${normalLink}`}
                  >
                    <MdOutlineDashboard />
                    <span className="capitalize ">Dashboard</span>
                  </Link>
                </div>

                {/* Main menu */}
                <div>
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    Data
                  </p>
                  <Link
                    href={`/admindashboard/spaceship`}
                    onClick={handleCloseSideBar}
                    className={`${normalLink}`}
                  >
                    <FaSpaceShuttle />
                    <span className="capitalize ">Spaceship</span>
                  </Link>
                  <Link
                    href={`/admindashboard/planet`}
                    onClick={handleCloseSideBar}
                    className={`${normalLink}`}
                  >
                    <BiPlanet />
                    <span className="capitalize ">Planet</span>
                  </Link>
                  <Link
                    href={`/admindashboard/schedule`}
                    onClick={handleCloseSideBar}
                    className={`${normalLink}`}
                  >
                    <AiFillSchedule />
                    <span className="capitalize ">Schedule</span>
                  </Link>
                  <Link
                    href={`/admindashboard/blog`}
                    onClick={handleCloseSideBar}
                    className={`${normalLink}`}
                  >
                    <HiNewspaper />
                    <span className="capitalize">Blogs</span>
                  </Link>
                </div>

                <div>
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    Users Data
                  </p>
                  <Link
                    href={`/admindashboard/passenger`}
                    onClick={handleCloseSideBar}
                    className={`${normalLink}`}
                  >
                    <FiUsers />
                    <span className="capitalize ">Passengers</span>
                  </Link>
                  <Link
                    href={`/admindashboard/pilots`}
                    onClick={handleCloseSideBar}
                    className={`${normalLink}`}
                  >
                    <FaUserAstronaut />
                    <span className="capitalize ">Pilots</span>
                  </Link>
                </div>

              </div>
            </>
          </div>
        </div>
      )}
      {/* ===================  End Sidebar ================== */}


      {/* ===================  Navbar ================== */}
      <div className='lg:ml-72 relative h-full max-h-screen rounded-xl bg-secondaryDark text-shade'>
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start">
          <div className="flex md:items-center justify-between w-full px-4 py-1 mx-auto flex-col gap-y-4 md:flex-row">
            <nav>
              {/* <!-- breadcrumb --> */}
              <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li className="leading-normal text-sm">
                  <a className="opacity-50 text-shade">Pages</a>
                </li>
                <li className="text-sm pl-2 capitalize leading-normal text-shade before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">Dashboard</li>
              </ol>
              <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
            </nav>

            <div className="flex justify-between items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <div className="flex items-center md:ml-auto md:pr-4">
                <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                  <span className="text-sm ease-soft leading-[20px] absolute z-40 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <BiSearch />
                  </span>
                  <input type="text" className="pl-8 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Type here..." />
                </div>
              </div>

              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                <li className="flex items-center">
                  <div
                    className="flex items-center gap-2 px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500 cursor-pointer hover:text-primary"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <FaUserAlt />
                    <span className="hidden sm:inline">Sign Out</span>
                  </div>
                </li>
                <li className="flex items-center pl-4 lg:hidden cursor-pointer">
                  <a className="block p-0 transition-all ease-in-out text-sm text-slate-500 hover:text-primary" onClick={() => setActiveMenu(!activeMenu)}>
                    <div className="w-[20px] overflow-hidden">
                      <i className="ease-in-out mb-[3px] relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                      <i className="ease-in-out mb-[3px] relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                      <i className="ease-in-out relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                    </div>
                  </a>
                </li>
                <li className="flex items-center px-4">
                  <a className="p-0 transition-all ease-nav-brand text-slate-500">
                    <AiFillSetting className='text-base' />
                  </a>
                </li>
              </ul>

            </div>
          </div>
        </nav>
        {/* ================================== End Navbar ============================ */}

        {/* ================================== Content ============================ */}
        <div className='w-full min-h-screen px-6 py-6 mx-auto gradient text-shade'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout