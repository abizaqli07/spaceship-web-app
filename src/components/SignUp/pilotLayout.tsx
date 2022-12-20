import React from 'react'
import type { PropsWithChildren } from 'react'
import styles from '../../styles/Layout.module.css'

const PilotLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=' min-h-screen bg-blue-400 flex'>
      <div className=' m-auto bg-slate-50 rounded-md w-[80%] py-12 lg:py-24'>
        <div className=' flex flex-col gap-8 lg:gap-16'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PilotLayout