import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';

import AdminLayout from '../../../components/admin/AdminLayout';
import PlanetList from '../../../components/admin/planet/PlanetList';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';
import BlogList from '../../../components/admin/blog/BlogList';

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

const Blog = (props: Props) => {
  const router = useRouter()

  const blog = trpc.adminRouter.blog.getBlog.useQuery()

  if (blog.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (blog.isError) {
    return (
      <AdminLayout>
        <div className=' flex flex-col gap-8'>
          <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
            <div>Input New Blog :</div>
            <div className=' button__confirm' onClick={() => router.push(`${router.pathname}/inputblog`)}>Input</div>
          </div>
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
        <div className=' w-full bg-secondaryDark flex flex-col gap-4 p-6 rounded-xl'>
          <div>Input New Blog :</div>
          <div className=' button__confirm' onClick={() => router.push(`${router.pathname}/input`)}>Input</div>
        </div>

        <BlogList data={blog?.data?.blog!} />

      </div>
    </AdminLayout>
  )
}

export default Blog