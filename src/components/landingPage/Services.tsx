import React from 'react'

import { BsArrowRightShort } from 'react-icons/bs'
import { FaBriefcaseMedical, FaToilet } from 'react-icons/fa'
import { MdFastfood } from 'react-icons/md'

interface Details {
  key: React.Key
  name: string
  desc: string
  icon: React.ReactNode
}

const Services = () => {
  const ServiceDetail: Details[] = [
    {
      key: 1,
      name: "Eat and drink",
      desc: "For those of you who forgot to bring food and drinks, we are ready to serve you. If you are hungry or thirsty, we provide various types of food and drinks.",
      icon: <MdFastfood className='text-4xl mx-auto'/>
    },
    {
      key: 2,
      name: "Toilet",
      desc: "This rocket is equipped with toilet facilities for your convenience during the trip because your comfort is our priority.",
      icon: <FaToilet  className='text-4xl mx-auto'/>
    },
    {
      key: 3,
      name: "Drugs",
      desc: "In this rocket, medicines are also available for those of you who are not feeling well, just go to our officers and we will give you the first treatment.",
      icon: <FaBriefcaseMedical className='text-4xl mx-auto'/>
    }
  ]

  return (
    <div className='flex flex-wrap justify-center items-center mt-24 gap-12 md:gap-20 lg:gap-28'>

      {ServiceDetail.map((service) => (
        <div key={service.key} className=' w-[260px] aspect-[3/4] p-6 flex flex-col gap-6 text-center items-center service__card rounded-xl'>
          <div className='w-[50px] h-auto'>{service.icon}</div>
          <div className=' font-semibold text-xl'>{service.name}</div>
          <div className=' text-sm text-shade'>{service.desc}</div>
          <div className=' text-primaryLight font-semibold flex gap-3 items-center group hover:text-primary cursor-pointer transition-all duration-300 ease-out'>More <BsArrowRightShort className='text-2xl font-bold group-hover:translate-x-2 transition-all duration-300 ease-out' /></div>
        </div>
      ))}

    </div>
  )
}

export default Services