import { GetServerSidePropsContext } from 'next/types';


import AdminLayout from '../../../components/admin/AdminLayout';
import ScheduleInputAdmin from '../../../components/admin/schedule/ScheduleInputAdmin';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';

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

const InputSpaceship = (props: Props) => {
  const dataSpaceship = trpc.adminRouter.spaceship.getSpaceship.useQuery()
  const dataPilots = trpc.adminRouter.pilots.getPilots.useQuery()
  const dataPlanet = trpc.adminRouter.planet.getPlanet.useQuery()

  if(dataPilots.isLoading || dataSpaceship.isLoading || dataPlanet.isLoading){
    return (
      <AdminLayout>
        <div>
          Loading...
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <ScheduleInputAdmin spaceship={dataSpaceship.data?.spaceship!} pilots={dataPilots.data?.pilots!} planet={dataPlanet.data?.planet!} />
    </AdminLayout>
  )
}

export default InputSpaceship