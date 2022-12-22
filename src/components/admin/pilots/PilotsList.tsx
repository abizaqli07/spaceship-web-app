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
      <div className='list__wrapper'>
        {
          props.data.map((data) => {
            return (
              <div key={data.id_pilot} className=" bg-secondaryDark p-6 rounded-lg flex flex-col gap-4">
                <div>Nama : {data.name}</div>
                <div>Gender : {data.gender}</div>
                <div>No. Tlp : {data.no_tlp}</div>
                <div>Datebirth : {`${data.datebirth.split("T")[0]}`}</div>
                <div>Verification : {data.is_verified ? "Verificated Pilot" : "Unverificated Pilot"}</div>
                <div className=' flex gap-4'>
                  <Link
                    href={`${router.pathname}/details/${data.id_pilot}`}
                    className="button__confirm"
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