import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import UserLayout from '../../../components/user/UserLayout';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';

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

const UserSchedule = () => {
  const router = useRouter()

  const schedule = trpc.adminRouter.schedule.getSchedule.useQuery()

  if (schedule.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (schedule.data?.schedule.length === 0) {
    return (
      <UserLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
            <div>Input New Schedule :</div>
            <div className=' button__confirm font-medium' onClick={() => router.push(`${router.pathname}/inputschedule`)}>Input</div>
          </div>
          <div>
            No Data Found
          </div>
        </div>
      </UserLayout>
    )
  }

  if (schedule.isError) {
    return (
      <UserLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
            <div>Input New Schedule :</div>
            <div className=' button__confirm font-medium' onClick={() => router.push(`${router.pathname}/inputschedule`)}>Input</div>
          </div>
          <div>
            error occured
          </div>
        </div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>

      <div className=' flex flex-col gap-8'>



        <div className='flex flex-col gap-8'>
          {
            schedule.data.schedule.map((data) => {
              return (
                <div key={data.id_schedule} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
                  <div>Destination : {data.destination.name}</div>
                  <div>Price : {data.price.toString()}</div>
                  <div>Capacity : {data.capacity.toString()}</div>
                  <div className=' flex flex-col gap-4'>
                    <div>Time Departure : {data.time_depart}</div>
                    <div>Time Landing : {data.time_land}</div>
                  </div>
                  <div className=' flex gap-4'>
                    <Link
                      href={`${router.pathname}/details/${data.id_schedule}`}
                      className="button__confirm"
                    >Details</Link>
                  </div>
                </div>
              )
            })
          }
        </div>


      </div>
    </UserLayout>
  )
}

export default UserSchedule