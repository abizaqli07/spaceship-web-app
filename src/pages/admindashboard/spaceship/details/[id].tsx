import { GetServerSidePropsContext } from 'next/types';

import { useRouter } from 'next/router';

import AdminLayout from '../../../../components/admin/AdminLayout';
import SpaceshipUpdate from '../../../../components/admin/spaceship/SpaceshipUpdate';
import { getServerAuthSession } from '../../../../server/common/get-server-auth-session';
import { trpc } from '../../../../utils/trpc';

export async function getServerSideProps(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession(ctx)

  if (!session || session.user?.role !== "ADMIN") {
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

const SpaceshipDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const detail = trpc.adminRouter.spaceship.getDetailSpaceship.useQuery({ id: id as string })

  if (detail.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (detail.isError) {
    return (
      <AdminLayout>
        <div className=' p-4 bg-primaryDark flex flex-col gap-4'>
          <div>{detail.error.data?.code}</div>
          <div>{detail.error.message}</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <SpaceshipUpdate data={detail?.data?.spaceship!}/>
    </AdminLayout>
  )
}

export default SpaceshipDetails