import { GetServerSidePropsContext } from 'next/types';

import { useRouter } from 'next/router';

import AdminLayout from '../../../../components/admin/AdminLayout';
import PassengerTicketList from '../../../../components/admin/passenger/PassengerTicketList';
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

const PlanetDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const detail = trpc.adminRouter.passenger.getDetailPassenger.useQuery({ id: id as string })

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

  const d = detail.data.passenger

  return (
    <AdminLayout>
      <div className='w-full rounded-xl bg-secondaryDark p-3 flex flex-col gap-8'>
        <div className='flex flex-col gap-4 bg-ternaryDark rounded-xl p-3'>
          <div>Fullname : {d.fullname}</div>
        </div>

        <div className='flex flex-col gap-4 bg-ternaryDark rounded-xl p-3'>
          <div>Username : {d.user?.username}</div>
          <div>Email : {d.user?.email}</div>
        </div>

        <div className='flex flex-col gap-4 bg-ternaryDark rounded-xl p-3'>
          <div>Gender : {d.gender}</div>
          <div>Datebirth : {d.datebirth.split("T")[0]}</div>
          <div>No. Tlp : {d.no_tlp}</div>
          <div>Member since : {d.created_at.toJSON()}</div>
        </div>

        <PassengerTicketList data={detail.data.passenger.ticket} />

      </div>
    </AdminLayout>
  )
}

export default PlanetDetails