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
        <div className='popup'>
          <div>Anda ingin menghapus?</div>
          <div className=' flex gap-3'>
            <div className='button__confirm' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='button__danger' onClick={() => handleDelete()}>Confirm</div>
          </div>
        </div>
      )}

      {deleteSpaceship.isError && (
        <div className=' popup'>
          <div>Error Occured</div>
          <div className=' flex gap-3 flex-col'>
            <div>{deleteSpaceship.error.message}</div>
            <div className='button__danger' >Confirm</div>
          </div>
        </div>
      )}

      <div className='list__wrapper'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_spaceship} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
                <div>Nama : {data.name}</div>
                <div>Description : {data.description}</div>
                <div>Model : {data.model}</div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_spaceship}`}
                    className="button__confirm"
                  >Details</Link>
                  <div className='button__danger' onClick={() => handleConfirm(data.id_spaceship)}>Delete</div>
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