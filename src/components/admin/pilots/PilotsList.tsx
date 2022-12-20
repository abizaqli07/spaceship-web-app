import { passenger, pilots } from '@prisma/client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc'

type Props = {
  data: pilots[]
}

const PilotsList = (props: Props) => {
  const router = useRouter()

  return (
    <div>
      <div className='flex flex-col gap-8'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_pilot} className=" bg-gray-600 p-6 rounded-lg flex flex-col gap-4">
                <div>Nama : {data.name}</div>
                <div>Gender : {data.gender}</div>
                <div>No. Tlp : {data.no_tlp}</div>
                <div>Datebirth : {`${data.datebirth.split("T")[0]}`}</div>
                <div>Verification : {data.is_verified ? "Verificated Pilot" : "Unverificated Pilot"}</div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_pilot}`}
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

export default PilotsList