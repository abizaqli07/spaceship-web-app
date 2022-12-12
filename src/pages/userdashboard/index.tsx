import { type GetServerSidePropsContext } from "next";
import type { Session } from "next-auth/core/types";

import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from "next-auth/react"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import { trpc } from "../../utils/trpc";
import { hash } from "bcryptjs";

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

  return (
    <div>
      <div>UserDashboard</div>
      <Link href={"/"}>To Home</Link>
      <div>{sessionData?.user?.email}</div>
      <div>
        {sessionData && (
          <button
            className="rounded-full bg-blue-600 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  )
}

export default User