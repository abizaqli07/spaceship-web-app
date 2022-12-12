import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../utils/trpc'

const Redirect = () => {
  const { data: sessionData } = useSession()
  const router = useRouter()
  const { data, error, mutate } = trpc.userRouter.getUser.useMutation({
    onSuccess(data) {
      if (data.userData?.role === "USER") {
        router.push("/userdashboard")
      } else if (data.userData?.role === "PILOT") {
        router.push("/pilotdashboard")
      } else if (data.userData?.role === "ADMIN") {
        router.push("/admindashboard")
      }
    },
  });

  if (!sessionData) {
    return (
      <div>
        <div>Unauthorize User</div>
        <div><Link href={"/"}>Go to Home</Link></div>
      </div>
    )
  } else {
    mutate({ email: sessionData?.user?.email! })
  }

  return (
    <div>
      <div>Some error occured</div>
      <div><Link href={"/"}>Go to Home</Link></div>
    </div>
  )
}

export default Redirect