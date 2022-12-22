import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';
import UserTicketList from '../../components/user/tickets/UserTicketList';
import UserLayout from '../../components/user/UserLayout';

type Props = {}

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

const UserTickets = (props: Props) => {
  const router = useRouter()

  const tickets = trpc.userRouter.ticket.getDetailTicket.useQuery()

  if (tickets.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if(tickets.data?.ticket?.length === 0){
    return (
      <UserLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
            <div>Start your flight :</div>
            <div className=' button__confirm font-medium' onClick={() => router.push("/userdashboard/schedule")}>Buy Ticket</div>
          </div>
          <div>
            You have no ticket yet.
          </div>
        </div>
      </UserLayout>
    )
  }

  if (tickets.isError) {
    return (
      <UserLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
            <div>Start your flight :</div>
            <div className=' button__confirm font-medium' onClick={() => router.push("/userdashboard/schedule")}>Buy Ticket</div>
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
        <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
          <div>Start your flight :</div>
          <div className=' button__confirm font-medium' onClick={() => router.push("/userdashboard/schedule")}>Buy Ticket</div>
        </div>

        <UserTicketList data={tickets?.data?.ticket!} />

      </div>
    </UserLayout>
  )
}

export default UserTickets