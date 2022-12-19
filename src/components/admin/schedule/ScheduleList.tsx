import { schedule, planet } from '@prisma/client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: (schedule & { destination: planet })[]
}

const ScheduleList = (props: Props) => {
  const [confirm, setConfirm] = useState({ visible: false, id: "" })
  const router = useRouter()
  const deleteSchedule = trpc.adminRouter.schedule.deleteSchedule.useMutation({
    onSuccess(data) {
      router.reload()
    },
  })


  const handleConfirm = (id: string) => {
    setConfirm({ visible: true, id: id });
  }

  const handleDelete = async () => {
    deleteSchedule.mutate({ id: confirm.id })
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

      {deleteSchedule.isError && (
        <div className='flex flex-col gap-4'>
          <div>{deleteSchedule.error.message}</div>
        </div>
      )}

      <div className='flex flex-col gap-8'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_schedule} className=" bg-gray-600 p-6 rounded-lg flex flex-col gap-4">
                <div>Destination : {data.destination.name}</div>
                <div>Price : {data.price.toString()}</div>
                <div>Capacity : {data.capacity.toString()}</div>
                <div className=' flex flex-col gap-4'>
                  <div>Time Departure : {data.time_depart.toDateString()}</div>
                  <div>Time Landing : {data.time_land.toDateString()}</div>
                </div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_schedule}`}
                    className="base__button bg-lime-500 hover:bg-lime-700"
                  >Details</Link>
                  <div className='base__button bg-red-500 hover:bg-red-700' onClick={() => handleConfirm(data.id_schedule)}>Delete</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ScheduleList