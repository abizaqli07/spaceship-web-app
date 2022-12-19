import { passenger } from '@prisma/client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: passenger[]
}

const PassengerList = (props: Props) => {
  const router = useRouter()

  return (
    <div>
      <div className='flex flex-col gap-8'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_passenger} className=" bg-gray-600 p-6 rounded-lg flex flex-col gap-4">
                <div>Nama : {data.fullname}</div>
                <div>Gender : {data.gender}</div>
                <div>No. Tlp : {data.no_tlp}</div>
                <div>Datebirth : {`${data.datebirth.split("T")[0]}`}</div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_passenger}`}
                    className="base__button bg-lime-500 hover:bg-lime-700"
                  >Details</Link>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PassengerList