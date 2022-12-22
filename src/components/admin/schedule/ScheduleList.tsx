import { planet, schedule } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
        <div className=' popup'>
          <div>Anda ingin menghapus?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='button__danger' onClick={() => handleDelete()}>Confirm</div>
          </div>
        </div>
      )}

      {deleteSchedule.isError && (
        <div className='popup'>
          <div>{deleteSchedule.error.message}</div>
        </div>
      )}

      <div className='list__wrapper'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_schedule} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
                <div>Destination : {data.destination.name}</div>
                <div>Price : {data.price.toString()}</div>
                <div>Capacity : {data.capacity.toString()}</div>
                <div className=' flex flex-col gap-4'>
                  <div>Time Departure : {data.time_depart}</div>
                  <div>Time Landing : {data.time_land}</div>
                </div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_schedule}`}
                    className="button__confirm"
                  >Details</Link>
                  <div className='button__danger' onClick={() => handleConfirm(data.id_schedule)}>Delete</div>
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