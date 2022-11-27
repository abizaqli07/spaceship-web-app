import React from 'react'
import type { PropsWithChildren } from 'react'
import styles from '../../styles/Layout.module.css'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className=' h-screen bg-blue-400 flex'>
      <div className=' m-auto bg-slate-50 rounded-md w-[75%] h-[90%] grid lg:grid-cols-2'>
        <div>
          <div>Sign Up</div>
        </div>
        <div className=' flex flex-col justify-evenly'>
          <div className=' text-center py-5'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout