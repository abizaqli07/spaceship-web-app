import { GetServerSidePropsContext } from 'next/types';

import { useRouter } from 'next/router';

import PilotLayout from '../../components/pilot/PilotDashboardLayout';
import PilotProfileUpdate from '../../components/pilot/profile/PilotProfileUpdate';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';

type Props = {}

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

const PilotProfile = (props: Props) => {
  const detail = trpc.pilotRouter.profile.getPilotProfile.useQuery()
  
  const router = useRouter()

  if (detail.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (detail.isError) {
    return (
      <PilotLayout>
        <div className=' p-4 bg-secondaryDark flex flex-col gap-4'>
          <div>{detail.error.data?.code}</div>
          <div>{detail.error.message}</div>
        </div>
      </PilotLayout>
    )
  }

  return (
    <PilotLayout>
      <PilotProfileUpdate data={detail?.data?.pilotProfile!}/>
    </PilotLayout>
  )
}

export default PilotProfile