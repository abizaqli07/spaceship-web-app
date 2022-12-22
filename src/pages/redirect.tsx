import { GetServerSidePropsContext } from 'next/types';

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../utils/trpc'
import { getServerAuthSession } from '../server/common/get-server-auth-session';


const Redirect = () => {
  const router = useRouter()
  const session = trpc.auth.getSessionData.useQuery()

  if(session.data?.session) {
    if (session.data?.session.role === "USER") {
      router.push("/userdashboard")
    } else if (session.data?.session.role === "PILOT") {
      router.push("/pilotdashboard")
    } else if (session.data?.session.role === "ADMIN") {
      router.push("/admindashboard")
    }
  }

  if (session.data?.session === null || session.data?.session === undefined) {
    return (
      <div>
        <div>Unauthorize User</div>
        <div><Link href={"/"}>Go to Home</Link></div>
      </div>
    )
  }

  return (
    <div className='text-white bg-secondaryDark'>
      <div>redirecting...</div>
    </div>
  )
}

export default Redirect