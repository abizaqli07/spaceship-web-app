import { GetServerSidePropsContext } from 'next/types';

import { useRouter } from 'next/router';

import AdminLayout from '../../../../components/admin/AdminLayout';
import ScheduleUpdate from '../../../../components/admin/schedule/ScheduleUpdate';
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

const ScheduleDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const detail = trpc.adminRouter.schedule.getDetailSchedule.useQuery({ id: id as string })
  const dataSpaceship = trpc.adminRouter.spaceship.getSpaceship.useQuery()
  const dataPilots = trpc.adminRouter.pilots.getPilots.useQuery()
  const dataPlanet = trpc.adminRouter.planet.getPlanet.useQuery()

  if (detail.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (detail.isError) {
    return (
      <AdminLayout>
        <div className=' p-4 bg-secondaryDark flex flex-col gap-4'>
          <div>{detail.error.data?.code}</div>
          <div>{detail.error.message}</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <ScheduleUpdate 
        data={detail.data.schedule!}
        spaceship={dataSpaceship.data?.spaceship!} 
        pilots={dataPilots.data?.pilots!} 
        planet={dataPlanet.data?.planet!}
      />
    </AdminLayout>
  )
}

export default ScheduleDetails