import { type GetServerSidePropsContext } from "next";

import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from "next-auth/react"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { trpc } from "../../utils/trpc";
import UserLayout from "../../components/user/UserLayout";

type Props = {}

export async function getServerSideProps(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);


  if (!session) {
    return {
      redirect: {
        destination: "/redirect",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const User = (props: Props) => {
  const { data: sessionData } = useSession()

  console.log(sessionData)

  return (
    <UserLayout>
      <div>
        <div>UserDashboard</div>
        <Link href={"/"}>To Home</Link>
        <div>{sessionData?.user?.email}</div>
      </div>
    </UserLayout>
  )
}

export default User