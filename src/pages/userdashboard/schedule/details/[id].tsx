import { GetServerSidePropsContext } from 'next/types';

import { useRouter } from 'next/router';

import { getServerAuthSession } from '../../../../server/common/get-server-auth-session';
import { trpc } from '../../../../utils/trpc';
import UserLayout from '../../../../components/user/UserLayout';
import UserScheduleDetail from '../../../../components/user/schedule/UserScheduleDetail';

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

const ScheduleDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const detail = trpc.userRouter.schedule.getDetailSchedule.useQuery({ id: id as string })
  const passenger = trpc.userRouter.ticket.getTicket.useQuery()

  if (detail.isLoading || passenger.isLoading) {
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

  if (passenger.isError) {
    return (
      <UserLayout>
        <div className=' p-4 bg-secondaryDark flex flex-col gap-4'>
          <div>{passenger.error.data?.code}</div>
          <div>{passenger.error.message}</div>
        </div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <UserScheduleDetail 
        data={detail.data.schedule!}
        passenger={passenger.data.userProfile?.passenger!}
      />
    </UserLayout>
  )
}

export default ScheduleDetails