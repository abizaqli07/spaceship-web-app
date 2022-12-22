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

  const detail = trpc.adminRouter.pilots.getDetailPilots.useQuery({ id: id as string })

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

  const d = detail.data.pilots

  return (
    <AdminLayout>
      <div className='w-full rounded-xl bg-secondaryDark p-3 flex flex-col gap-8'>
        <div className='flex flex-col gap-4 bg-ternaryDark rounded-xl p-3'>
          <div>Fullname : {d.name}</div>
        </div>

        <div className='flex flex-col gap-4 bg-ternaryDark rounded-xl p-3'>
          <div>Username : {d.user?.username}</div>
          <div>Email : {d.user?.email}</div>
        </div>

        <div className='flex flex-col gap-4 bg-ternaryDark rounded-xl p-3'>
          <div>Gender : {d.gender}</div>
          <div>Datebirth : {d.datebirth.split("T")[0]}</div>
          <div>No. Tlp : {d.no_tlp}</div>
          <div>Member since : {d.is_verified ? "Verificated Pilot" : "Unverificated Pilot"}</div>
        </div>


        <div className='flex flex-col gap-4 bg-ternaryDark rounded-xl p-3'>
          <div className=' text-xl'>Active Schedule</div>
          <div className=' flex flex-col gap-4'>
            {d.schedule.length === 0  && (
              <div>No Schedule active</div>
            )}
            {d.schedule && d.schedule.map((data) => {
              return (
                <div className=' bg-secondaryDark flex flex-col p-3 rounded-xl gap-4'>
                  <div>Id Ticket : {data.id_schedule}</div>
                  <div>Destination :{data.destination.name}</div>
                  <div>Spaceship : {data.spaceship.name}</div>
                  <div>Time Depart : {data.time_depart.split("T")[0]}</div>
                  <div>Time Landing : {data.time_land.split("T")[0]}</div>
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