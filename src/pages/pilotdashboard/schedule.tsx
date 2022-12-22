import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import PilotLayout from '../../components/pilot/PilotDashboardLayout';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';

export async function getServerSideProps(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession(ctx)

  if (!session || session.user?.role !== "PILOT") {
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

const PilotSchedule = () => {
  const router = useRouter()

  const pilotData = trpc.pilotRouter.schedule.getSchedule.useQuery()

  const schedule = pilotData.data?.schedule?.schedule

  if (pilotData.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (schedule?.length === 0) {
    return (
      <PilotLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
            <div>My Schedule</div>
          </div>
          <div>
            You have no schedule this time
          </div>
        </div>
      </PilotLayout>
    )
  }

  if (pilotData.isError) {
    return (
      <PilotLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
            <div>Input New Schedule :</div>
            <div className=' base__button bg-lime-500 hover:bg-lime-700 font-medium' onClick={() => router.push(`${router.pathname}/inputschedule`)}>Input</div>
          </div>
          <div>
            error occured
          </div>
        </div>
      </PilotLayout>
    )
  }

  return (
    <PilotLayout>

      <div className=' list__wrapper'>

          {
            schedule?.map((data) => {
              return (
                <div key={data.id_schedule} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
                  <div>Destination : {data.destination.name}</div>
                  <div>Price : {data.price.toString()}</div>
                  <div>Capacity : {data.capacity.toString()}</div>
                  <div className=' flex flex-col gap-4'>
                    <div>Time Departure : {data.time_depart}</div>
                    <div>Time Landing : {data.time_land}</div>
                  </div>
                </div>
              )
            })
          }
        </div>

    </PilotLayout>
  )
}

export default PilotSchedule