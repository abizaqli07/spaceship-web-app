import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import AdminLayout from '../../../components/admin/AdminLayout';
import PassengerList from '../../../components/admin/passenger/PassengerList';
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

const AdminPassenger = (props: Props) => {
  const router = useRouter()

  const passenger = trpc.adminRouter.passenger.getPassenger.useQuery()

  if (passenger.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (passenger.isError) {
    return (
      <AdminLayout>
        <div className=' flex flex-col gap-8'>
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
        <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl font-semibold'>
          <div className='text-xl'>Passenger List :</div>
        </div>

        <PassengerList data={passenger.data.passenger!} />

      </div>
    </AdminLayout>
  )
}

export default AdminPassenger