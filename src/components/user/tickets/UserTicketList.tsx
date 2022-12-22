import { planet, schedule, spaceship, ticket, ticket_has_status } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: (ticket & {
    schedule: schedule & {
      spaceship: spaceship;
      destination: planet;
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

const UserTicketList = (props: Props) => {
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })
  const [confirm, setConfirm] = useState({ visible: false, id: "" })
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, id: "" })
  const router = useRouter()
  const cancelTicket = trpc.userRouter.ticket.cancelBuyTicket.useMutation({
    onSuccess(data) {
      setConfirm({ visible: false, id: "" })
      setCallback({ visible: true, data: data })
    },
  });
  const deleteTicket = trpc.userRouter.ticket.deleteTicket.useMutation({
    onSuccess(data) {
      console.log(data)
    }
  })


  const handleConfirm = (id: string) => {
    setConfirm({ visible: true, id: id });
  }

  const handleConfirmDelete = (id: string) => {
    setConfirmDelete({ visible: true, id: id });
  }

  const handleCancel = async () => {
    cancelTicket.mutate({ id_ticket: confirm.id })
  }

  const handleDelete = async () => {
    deleteTicket.mutate({ id: confirmDelete.id })
    setConfirmDelete({ visible: false, id: "" })
    router.reload()
  }

  return (
    <div>
      {confirm.visible && (
        <div className=' popup'>
          <div>Cancel Purchase ?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false, id: "" })}>Cancel</div>
            <div className='button__danger' onClick={() => handleCancel()}>Confirm</div>
          </div>
        </div>
      )}

      {confirmDelete.visible && (
        <div className=' popup'>
          <div>Delete Ticket ?</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirmDelete({ visible: false, id: "" })}>Cancel</div>
            <div className='button__danger' onClick={() => handleDelete()}>Confirm</div>
          </div>
        </div>
      )}

      {cancelTicket.isError && (
        <div className='flex flex-col gap-4'>
          <div>{cancelTicket.error.message}</div>
        </div>
      )}

      {callback.visible && (
        <div className=' popup'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? "Error Occured" : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => {setCallback({ visible: false, data: null }); router.reload()}}>Close</div>
          </div>
        </div>
      )}

      <div className='list__wrapper'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_ticket} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
                <div>Nama : {data.schedule.destination.name}</div>
                <div>Description : {data.schedule.spaceship.name}</div>
                <div>Time Departure : {`${data.schedule.time_depart.split("T")[0]} ${data.schedule.time_depart.split("T")[1]}`}</div>
                <div>Time Landed : {`${data.schedule.time_land.split("T")[0]} ${data.schedule.time_land.split("T")[1]}`}</div>
                <div className=' flex flex-col gap-4'>
                  <div>Total price : {data.schedule.price.toString()}</div>
                </div>
                {(data.ticket_has_status?.status === "ACTIVE") && (
                  <div className='button__danger' onClick={() => handleConfirm(data.id_ticket)}>Cancel Ticket</div>
                )}
                {(data.ticket_has_status?.status === "WAITING") && (
                  <div className='base__button bg-gray-700'>Waiting for Cancellation Approval</div>
                )}
                {(data.ticket_has_status?.status === "CANCELLED") && (
                  <div className='flex gap-2'>
                    <div className='base__button bg-gray-700'>Ticket Cancelled </div>
                    <div className=' button__danger' onClick={() => handleConfirmDelete(data.id_ticket)}>Delete data ticket</div>
                  </div>
                )}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default UserTicketList