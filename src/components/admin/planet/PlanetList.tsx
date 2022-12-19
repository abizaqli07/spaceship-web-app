import { planet } from '@prisma/client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: planet[]
}

const SpaceshipList = (props: Props) => {
  const [confirm, setConfirm] = useState({ visible: false, id: "" })
  const router = useRouter()
  const deletePlanet = trpc.adminRouter.planet.deletePlanet.useMutation({
    onSuccess(data) {
      router.reload()
    },
  })


  const handleConfirm = (id: string) => {
    setConfirm({ visible: true, id: id });
  }

  const handleDelete = async () => {
    deletePlanet.mutate({ id: confirm.id })
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

      {deletePlanet.isError && (
        <div className='flex flex-col gap-4'>
          <div>{deletePlanet.error.message}</div>
        </div>
      )}

      <div className='flex flex-col gap-8'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_planet} className=" bg-gray-600 p-6 rounded-lg flex flex-col gap-4">
                <div>Nama : {data.name}</div>
                <div>Description : {data.description}</div>
                <div>Distance : {data.distance.toString()}</div>
                <div className=' flex flex-col gap-4'>
                  <div>{data.is_explored ? "Explored Planet" : "Unexplored Planet"}</div>
                  <div>{data.is_populated ? "Populated Planet" : "Unpopulated Planet"}</div>
                </div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_planet}`}
                    className="base__button bg-lime-500 hover:bg-lime-700"
                  >Details</Link>
                  <div className='base__button bg-red-500 hover:bg-red-700' onClick={() => handleConfirm(data.id_planet)}>Delete</div>
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