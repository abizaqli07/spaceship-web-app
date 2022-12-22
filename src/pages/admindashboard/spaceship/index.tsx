import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import AdminLayout from '../../../components/admin/AdminLayout';
import SpaceshipList from '../../../components/admin/spaceship/SpaceshipList';
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

const Spaceship = (props: Props) => {
  const router = useRouter()

  const spaceship = trpc.adminRouter.spaceship.getSpaceship.useQuery()

  if (spaceship.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if(spaceship.isError) {
    return (
      <AdminLayout>
        <div>
          error occured
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>

      <div className=' flex flex-col gap-8'>
        <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
          <div>Input New Spaceship :</div>
          <div className='button__confirm font-medium' onClick={() => router.push(`${router.pathname}/inputspaceship`)}>Input</div>
        </div>

        <SpaceshipList data={spaceship?.data?.spaceship!} />

      </div>
    </AdminLayout>
  )
}

export default Spaceship