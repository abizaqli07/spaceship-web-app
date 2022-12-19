import { GetServerSidePropsContext } from 'next/types';
import { useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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

const Admin = (props: Props) => {

  return (
      <AdminLayout>
        <div>
          <div>Admin dashboard</div>
        </div>
      </AdminLayout>
  )
}

export default Admin