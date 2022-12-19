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

  const detail = trpc.adminRouter.passenger.getDetailPassenger.useQuery({ id: id as string })

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

  const d = detail.data.passenger

  return (
    <AdminLayout>
      <div className='w-full rounded-xl bg-gray-600 p-3 flex flex-col gap-8'>
        <div className='flex flex-col gap-4 bg-gray-700 rounded-xl p-3'>
          <div>Fullname : {d.fullname}</div>
        </div>

        <div className='flex flex-col gap-4 bg-gray-700 rounded-xl p-3'>
          <div>Username : {d.user?.username}</div>
          <div>Email : {d.user?.email}</div>
        </div>

        <div className='flex flex-col gap-4 bg-gray-700 rounded-xl p-3'>
          <div>Gender : {d.gender}</div>
          <div>Datebirth : {d.datebirth.split("T")[0]}</div>
          <div>No. Tlp : {d.no_tlp}</div>
          <div>Member since : {d.created_at.toJSON()}</div>
        </div>


        <div className='flex flex-col gap-4 bg-gray-700 rounded-xl p-3'>
          <div className=' text-xl'>Active Ticket</div>
          <div className=' flex flex-col gap-4'>
            {d.ticket.length === 0  && (
              <div>No ticket active</div>
            )}
            {d.ticket && d.ticket.filter((prev) => prev.ticket_has_status?.status === "ACTIVE").map((data) => {
              return (
                <div className=' bg-gray-800 flex flex-col p-3 rounded-xl'>
                  <div>Id Ticket : {data.id_ticket}</div>
                  <div>Destination :{data.schedule.destination.name}</div>
                  <div>Spaceship : {data.schedule.spaceship.name}</div>
                  <div>Time Depart : {data.schedule.time_depart.toJSON()}</div>
                  <div>Time Landing : {data.schedule.time_land.toJSON()}</div>
                </div>
              )
            })}
          </div>
        </div>


      </div>
    </AdminLayout>
  )
}

export default PlanetDetails