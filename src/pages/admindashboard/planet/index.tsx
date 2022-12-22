import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import AdminLayout from '../../../components/admin/AdminLayout';
import PlanetList from '../../../components/admin/planet/PlanetList';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';

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

const Spaceship = () => {
  const router = useRouter()

  const planet = trpc.adminRouter.planet.getPlanet.useQuery()

  if (planet.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (planet.isError) {
    return (
      <AdminLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
            <div>Input New Spaceship :</div>
            <div className=' button__confirm' onClick={() => router.push(`${router.pathname}/inputplanet`)}>Input</div>
          </div>
          <div>
            error occured
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>

      <div className=' flex flex-col gap-8'>
        <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
          <div>Input New Spaceship :</div>
          <div className=' button__confirm' onClick={() => router.push(`${router.pathname}/inputplanet`)}>Input</div>
        </div>

        <PlanetList data={planet?.data?.planet!} />

      </div>
    </AdminLayout>
  )
}

export default Spaceship