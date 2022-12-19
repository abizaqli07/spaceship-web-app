import { spaceship } from '@prisma/client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: spaceship[]
}

const SpaceshipList = (props: Props) => {
  const [confirm, setConfirm] = useState({ visible: false, id: "" })
  const router = useRouter()
  const deleteSpaceship = trpc.adminRouter.spaceship.deleteSpaceship.useMutation({
    onSuccess(data) {
      router.reload()
    },
  })


  const handleConfirm = (id: string) => {
    setConfirm({ visible: true, id: id });
  }

  const handleDelete = async () => {
    deleteSpaceship.mutate({ id: confirm.id })
  }
  return (
    <div>
      {confirm.visible && (
        <div className=' p-4 bg-gray-600 flex flex-col gap-4'>
          <div>Anda ingin menghapus?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='base__button bg-red-500 hover:bg-red-700' onClick={() => handleDelete()}>Confirm</div>
          </div>
        </div>
      )}

      {deleteSpaceship.isError && (
        <div className='flex flex-col gap-4'>
          <div>{deleteSpaceship.error.message}</div>
        </div>
      )}

      <div className='flex flex-col gap-8'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_spaceship} className=" bg-gray-600 p-6 rounded-lg flex flex-col gap-4">
                <div>Nama : {data.name}</div>
                <div>Description : {data.description}</div>
                <div>Model : {data.model}</div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_spaceship}`}
                    className="base__button bg-lime-500 hover:bg-lime-700"
                  >Details</Link>
                  <div className='base__button bg-red-500 hover:bg-red-700' onClick={() => handleConfirm(data.id_spaceship)}>Delete</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SpaceshipList