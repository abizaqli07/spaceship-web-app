import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import AdminLayout from '../../../components/admin/AdminLayout';
import PilotsList from '../../../components/admin/pilots/PilotsList';
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

const AdminPilots = (props: Props) => {
  const router = useRouter()

  const pilots = trpc.adminRouter.pilots.getPilots.useQuery()

  if (pilots.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (pilots.isError) {
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
        <div className=' w-full bg-gray-600 flex flex-col gap-4 p-6 rounded-xl'>
          <div className='text-xl'>Pilots List :</div>
        </div>

        <PilotsList data={pilots.data.pilots} />

      </div>
    </AdminLayout>
  )
}

export default AdminPilots