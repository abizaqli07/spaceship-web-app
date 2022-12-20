import { GetServerSidePropsContext } from 'next/types';
import { ticket, spaceship, planet, ticket_has_status } from '@prisma/client'

import { useRouter } from 'next/router';

import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';
import { useState } from 'react';

type Props = {
  data: (ticket & {
    schedule: {
      spaceship: spaceship;
      destination: planet;
      time_depart: Date;
      time_land: Date;
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
        <div className=' p-4 bg-gray-600 flex flex-col gap-4'>
          <div>Approve Cancellation ?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='base__button bg-red-500 hover:bg-red-700' onClick={() => handleApprove()}>Confirm</div>
          </div>
        </div>
      )}

      {callback.visible && (
        <div className=' p-4 bg-gray-600 flex flex-col gap-4'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? "Error Occured" : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => { setCallback({ visible: false, data: null }); router.reload() }}>Close</div>
          </div>
        </div>
      )}


      <div className='flex flex-col gap-4 bg-gray-700 rounded-xl p-3'>
        <div className=' text-xl'>Active Tickets</div>
        <div className=' flex flex-col gap-4'>
          {props.data.length === 0 && (
            <div>No ticket active</div>
          )}
          {props.data && props.data.filter((prev) => prev.ticket_has_status?.status === "ACTIVE").map((data) => {
            return (
              <div className=' bg-gray-800 flex flex-col p-3 rounded-xl gap-4'>
                <div>Id Ticket : {data.id_ticket}</div>
                <div>Destination :{data.schedule.destination.name}</div>
                <div>Spaceship : {data.schedule.spaceship.name}</div>
                <div>Time Depart : {data.schedule.time_depart.toJSON()}</div>
                <div>Time Landing : {data.schedule.time_land.toJSON()}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col gap-4 bg-gray-700 rounded-xl p-3'>
        <div className=' text-xl'>Cancellation Request</div>
        <div className=' flex flex-col gap-4'>
          {props.data.length === 0 && (
            <div>No Cancellation request</div>
          )}
          {props.data && props.data.filter((prev) => prev.ticket_has_status?.status === "WAITING").map((data) => {
            return (
              <div className=' bg-gray-800 flex flex-col p-3 rounded-xl gap-4'>
                <div>Id Ticket : {data.id_ticket}</div>
                <div>Destination :{data.schedule.destination.name}</div>
                <div>Spaceship : {data.schedule.spaceship.name}</div>
                <div>Time Depart : {data.schedule.time_depart.toJSON()}</div>
                <div>Time Landing : {data.schedule.time_land.toJSON()}</div>
                <div className='base__button bg-red-500 hover:bg-red-700' onClick={() => handleConfirm(data.id_ticket)}>Approve Cancellation</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col gap-4 bg-gray-700 rounded-xl p-3'>
        <div className=' text-xl'>Cancelled Tickets</div>
        <div className=' flex flex-col gap-4'>
          {props.data.length === 0 && (
            <div>No cancelled ticket</div>
          )}
          {props.data && props.data.filter((prev) => prev.ticket_has_status?.status === "CANCELLED").map((data) => {
            return (
              <div className=' bg-gray-800 flex flex-col p-3 rounded-xl gap-4'>
                <div>Id Ticket : {data.id_ticket}</div>
                <div>Destination :{data.schedule.destination.name}</div>
                <div>Spaceship : {data.schedule.spaceship.name}</div>
                <div>Time Depart : {data.schedule.time_depart.toJSON()}</div>
                <div>Time Landing : {data.schedule.time_land.toJSON()}</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default PlanetDetails