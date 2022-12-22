import { passenger, pilots, planet, schedule, spaceship, ticket, ticket_has_status } from '@prisma/client'

import { useRouter } from 'next/router'
import { useState } from 'react'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: schedule & {
    spaceship: spaceship;
    destination: planet;
    pilot: pilots;
  },
  passenger: (passenger & {
    ticket: (ticket & {
      ticket_has_status: ticket_has_status | null;
    })[];
  })
}

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}


const UserScheduleDetail = (props: Props) => {
  const [confirm, setConfirm] = useState({ visible: false })
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const buyTicket = trpc.userRouter.ticket.buyTicket.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data });
      setConfirm({ visible: false })
    }
  })

  const router = useRouter()

  const handleConfirm = () => {
    setConfirm({ visible: true });
  }

  const handleBuy = async () => {
    buyTicket.mutate({
      id_schedule: props.data.id_schedule,
      id_passenger: props.passenger.id_passenger
    })
  }

  const haveTicket = props.passenger.ticket.filter((fil) => { return (fil.scheduleId === props.data.id_schedule) && (fil.ticket_has_status?.status === "ACTIVE") }).length

  const spaceship = props.data.spaceship;
  const planet = props.data.destination;
  const pilots = props.data.pilot

  return (
    <div>

      {confirm.visible && (
        <div className=' popup'>
          <div>Anda ingin membeli ticket?</div>

          <div className='bg-ternaryDark flex flex-col p-3 rounded-xl gap-4'>
            <div>Destination : {props.data.destination.name}</div>
            <div>Price : {props.data.price.toString()}</div>
            <div>Capacity : {props.data.capacity}</div>
            <div>Time departure : {`${props.data.time_depart.split("T")[0]} ${props.data.time_depart.split("T")[1]}`}</div>
            <div>Time Landing : {`${props.data.time_land.split("T")[0]} ${props.data.time_land.split("T")[1]}`}</div>
          </div>

          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700' onClick={() => setConfirm({ visible: false })}>Cancel</div>
            <div className='button__danger' onClick={() => handleBuy()}>Buy Ticket</div>
          </div>
        </div>
      )}

      {callback.visible && (
        <div className=' popup'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? "Error Occured" : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => setCallback({ visible: false, data: null })}>Close</div>
          </div>
        </div>
      )}

      <div className=' w-full rounded-xl bg-secondaryDark p-3 flex flex-col gap-8'>
        <div className='bg-ternaryDark flex flex-col p-3 rounded-xl gap-4'>
          <div>Destination : {props.data.destination.name}</div>
          <div>Price : {props.data.price.toString()}</div>
          <div>Capacity : {props.data.capacity}</div>
          <div>Time departure : {`${props.data.time_depart.split("T")[0]} ${props.data.time_depart.split("T")[1]}`}</div>
          <div>Time Landing : {`${props.data.time_land.split("T")[0]} ${props.data.time_land.split("T")[1]}`}</div>
        </div>
        <div className='bg-ternaryDark flex flex-col p-3 rounded-xl gap-4'>
          <div className='text-lg'>Spaceship Details</div>
          <div className=' flex flex-col gap-3'>
            <div>Name : {spaceship.name}</div>
            <div>Description : {spaceship.description}</div>
          </div>
        </div>
        <div className='bg-ternaryDark flex flex-col p-3 rounded-xl gap-4'>
          <div className=' text-lg'>Destination details</div>
          <div className=' flex flex-col gap-3'>
            <div>Name : {planet.name}</div>
            <div>Description : {planet.description}</div>
            <div>Distance Y/L : {planet.distance}</div>
            <div>Exploration : {planet.is_explored ? "Explorated planet" : "Unexplorated planet"}</div>
            <div>Population : {planet.is_populated ? "Populated planet" : "Unpopulated planet"}</div>
          </div>
        </div>
        <div className='bg-ternaryDark flex flex-col p-3 rounded-xl gap-4'>
          <div className='text-lg'>Pilots details</div>
          <div className=' flex flex-col gap-3'>
            <div>Name : {pilots.name}</div>
            <div>Gender : {pilots.gender}</div>
            <div>Verification : {pilots.is_verified ? "Verified pilot" : "Unverified pilot"}</div>
          </div>
        </div>
        {(haveTicket !== 0) ? (
          <div className='flex flex-col gap-4'>
            <div>You Already buy this ticket</div>
            <div className='button__confirm' onClick={() => handleConfirm()}>Buy Again</div>
          </div>
        ) : (
          <div>
            <div className='button__confirm' onClick={() => handleConfirm()}>Buy Ticket</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserScheduleDetail