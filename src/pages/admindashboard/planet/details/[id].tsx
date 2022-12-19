import { GetServerSidePropsContext } from 'next/types';

import { useRouter } from 'next/router';

import AdminLayout from '../../../../components/admin/AdminLayout';
import PlanetUpdate from '../../../../components/admin/planet/PlanetUpdate';
import { getServerAuthSession } from '../../../../server/common/get-server-auth-session';
import { trpc } from '../../../../utils/trpc';

type Props = {}

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

const PlanetDetails = (props: Props) => {
  const router = useRouter()
  let { id } = router.query

  const detail = trpc.adminRouter.planet.getDetailPlanet.useQuery({ id: id as string })

  if (detail.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (detail.isError) {
    return (
      <AdminLayout>
        <div className=' p-4 bg-gray-600 flex flex-col gap-4'>
          <div>{detail.error.data?.code}</div>
          <div>{detail.error.message}</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <PlanetUpdate data={detail?.data?.planet!}/>
    </AdminLayout>
  )
}

export default PlanetDetails