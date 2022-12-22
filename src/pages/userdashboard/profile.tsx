import { GetServerSidePropsContext } from 'next/types';

import { useRouter } from 'next/router';

import UserLayout from '../../components/user/UserLayout';
import PlanetUpdate from '../../components/admin/planet/PlanetUpdate';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';
import UserProfileUpdate from '../../components/user/profile/UserProfileUpdate';

export async function getServerSideProps(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession(ctx)

  if (!session || session.user?.role !== "USER") {
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

const UserProfile = () => {
  const detail = trpc.userRouter.profile.getUserProfile.useQuery()
  
  const router = useRouter()

  if (detail.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (detail.isError) {
    return (
      <UserLayout>
        <div className=' p-4 bg-secondaryDark flex flex-col gap-4'>
          <div>{detail.error.data?.code}</div>
          <div>{detail.error.message}</div>
        </div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <UserProfileUpdate data={detail?.data?.userProfile!} pass={detail.data.userProfile?.passenger ? true : false}/>
    </UserLayout>
  )
}

export default UserProfile