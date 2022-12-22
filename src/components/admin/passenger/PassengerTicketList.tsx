import { planet, spaceship, ticket, ticket_has_status } from '@prisma/client';

import { useRouter } from 'next/router';

import { useState } from 'react';
import { trpc } from '../../../utils/trpc';

type Props = {
  data: (ticket & {
    schedule: {
      spaceship: spaceship;
      destination: planet;
      time_depart: string;
      time_land: string;
    };
    ticket_has_status: ticket_has_status | null;
  })[]
}

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

const PlanetDetails = (props: Props) => {
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })
  const [confirm, setConfirm] = useState({ visible: false, id: "" })
  const router = useRouter()

  const approve = trpc.adminRouter.ticket.approveCancel.useMutation({
    onSuccess(data) {
      router.reload()
    }
  })

  const handleConfirm = (id: string) => {
    setConfirm({ visible: true, id: id });
  }

  const handleApprove = async () => {
    approve.mutate({ id: confirm.id })
  }

  return (
    <div className='flex flex-col gap-6'>
      {confirm.visible && (
        <div className=' popup'>
          <div>Approve Cancellation ?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='button__danger' onClick={() => handleApprove()}>Confirm</div>
          </div>
        </div>
      )}

      {callback.visible && (
        <div className=' popup'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? "Error Occured" : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => { setCallback({ visible: false, data: null }); router.reload() }}>Close</div>
          </div>
        </div>
      )}


      <div className='flex flex-col gap-4 bg-primaryDark rounded-xl p-3'>
        <div className=' text-xl'>Active Tickets</div>
        <div className=' flex flex-col gap-4'>
          {props.data.length === 0 && (
            <div>No ticket active</div>
          )}
          {props.data && props.data.filter((prev) => prev.ticket_has_status?.status === "ACTIVE").map((data) => {
            return (
              <div className=' bg-ternaryDark flex flex-col p-3 rounded-xl gap-4' key={data.id_ticket}>
                <div>Id Ticket : {data.id_ticket}</div>
                <div>Destination :{data.schedule.destination.name}</div>
                <div>Spaceship : {data.schedule.spaceship.name}</div>
                <div>Time Depart : {data.schedule.time_depart}</div>
                <div>Time Landing : {data.schedule.time_land}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col gap-4 bg-primaryDark rounded-xl p-3'>
        <div className=' text-xl'>Cancellation Request</div>
        <div className=' flex flex-col gap-4'>
          {props.data.length === 0 && (
            <div>No Cancellation request</div>
          )}
          {props.data && props.data.filter((prev) => prev.ticket_has_status?.status === "WAITING").map((data) => {
            return (
              <div className=' bg-ternaryDark flex flex-col p-3 rounded-xl gap-4' key={data.id_ticket}>
                <div>Id Ticket : {data.id_ticket}</div>
                <div>Destination :{data.schedule.destination.name}</div>
                <div>Spaceship : {data.schedule.spaceship.name}</div>
                <div>Time Depart : {data.schedule.time_depart}</div>
                <div>Time Landing : {data.schedule.time_land}</div>
                <div className='button__danger' onClick={() => handleConfirm(data.id_ticket)}>Approve Cancellation</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col gap-4 bg-primaryDark rounded-xl p-3'>
        <div className=' text-xl'>Cancelled Tickets</div>
        <div className=' flex flex-col gap-4'>
          {props.data.length === 0 && (
            <div>No cancelled ticket</div>
          )}
          {props.data && props.data.filter((prev) => prev.ticket_has_status?.status === "CANCELLED").map((data) => {
            return (
              <div className=' bg-gray-800 flex flex-col p-3 rounded-xl gap-4' key={data.id_ticket}>
                <div>Id Ticket : {data.id_ticket}</div>
                <div>Destination :{data.schedule.destination.name}</div>
                <div>Spaceship : {data.schedule.spaceship.name}</div>
                <div>Time Depart : {data.schedule.time_depart}</div>
                <div>Time Landing : {data.schedule.time_land}</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default PlanetDetails