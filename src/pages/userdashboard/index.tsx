import { type GetServerSidePropsContext } from "next";

import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { authOptions } from "../api/auth/[...nextauth]";

import UserLayout from "../../components/user/UserLayout";

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

const User = () => {
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