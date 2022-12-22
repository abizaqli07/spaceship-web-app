import type { PropsWithChildren } from 'react'
import styles from '../../styles/Layout.module.css'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className=' h-screen bg-gradient-to-tr from-secondaryDark via-primaryHover to-primary flex'>
      <div className=' m-auto bg-slate-50 rounded-md w-[75%] h-[90%] grid lg:grid-cols-2'>
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className=' flex flex-col justify-evenly bg-secondaryDark'>
          <div className=' text-center py-5'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout