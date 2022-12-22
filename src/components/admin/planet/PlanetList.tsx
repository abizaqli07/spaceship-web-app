import { planet } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
        <div className=' popup'>
          <div>Anda ingin menghapus?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='button__danger' onClick={() => handleDelete()}>Confirm</div>
          </div>
        </div>
      )}

      {deletePlanet.isError && (
        <div className='popup'>
          <div>{deletePlanet.error.message}</div>
        </div>
      )}

      <div className='list__wrapper'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_planet} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
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
                    className="button__confirm"
                  >Details</Link>
                  <div className='button__danger' onClick={() => handleConfirm(data.id_planet)}>Delete</div>
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