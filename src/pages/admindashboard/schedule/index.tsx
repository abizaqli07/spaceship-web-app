import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import AdminLayout from '../../../components/admin/AdminLayout';
import ScheduleList from '../../../components/admin/schedule/ScheduleList';
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

const AdminSchedule = (props: Props) => {
  const router = useRouter()

  const schedule = trpc.adminRouter.schedule.getSchedule.useQuery()

  if (schedule.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if(schedule.data?.schedule.length === 0){
    return (
      <AdminLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
            <div>Input New Schedule :</div>
            <div className=' base__button bg-lime-500 hover:bg-lime-700 font-medium' onClick={() => router.push(`${router.pathname}/inputschedule`)}>Input</div>
          </div>
          <div>
            No Data Found
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (schedule.isError) {
    return (
      <AdminLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
            <div>Input New Schedule :</div>
            <div className=' base__button bg-lime-500 hover:bg-lime-700 font-medium' onClick={() => router.push(`${router.pathname}/inputschedule`)}>Input</div>
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
        <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
          <div>Input New Schedule :</div>
          <div className=' base__button bg-lime-500 hover:bg-lime-700 font-medium' onClick={() => router.push(`${router.pathname}/inputschedule`)}>Input</div>
        </div>

        <ScheduleList data={schedule?.data?.schedule!} />

      </div>
    </AdminLayout>
  )
}

export default AdminSchedule