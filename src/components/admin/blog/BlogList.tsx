import { blog } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: blog[]
}

const BlogList = (props: Props) => {
  const [confirm, setConfirm] = useState({ visible: false, id: "" })
  const router = useRouter()
  const deleteBlog = trpc.adminRouter.blog.deleteBlog.useMutation({
    onSuccess(data) {
      router.reload()
    },
  })


  const handleConfirm = (id: string) => {
    setConfirm({ visible: true, id: id });
  }

  const handleDelete = async () => {
    deleteBlog.mutate({ id: confirm.id })
  }

  return (
    <div>
      {confirm.visible && (
        <div className=' popup'>
          <div>Anda ingin menghapus?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='button__danger' onClick={() => handleDelete()}>Confirm</div>
          </div>
        </div>
      )}

      {deleteBlog.isError && (
        <div className='popup'>
          <div>{deleteBlog.error.message}</div>
        </div>
      )}

      <div className='list__wrapper'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_blog} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
                <div>Title : {data.title}</div>
                <div>Description : {data.description}</div>
                <div>Link : {data.link}</div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_blog}`}
                    className="button__confirm"
                  >Details</Link>
                  <div className='button__danger' onClick={() => handleConfirm(data.id_blog)}>Delete</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default BlogList