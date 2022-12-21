import React from 'react'

import { BsArrowRightShort } from 'react-icons/bs'

type Props = {}

interface Details {
  key: React.Key
  name: string
  desc: string
  icon: string
}

const Services = (props: Props) => {
  const ServiceDetail: Details[] = [
    {
      key: 1,
      name: "User Friendly",
      desc: "MiSides brings comfort and friendliness to the user by considering many things. Misides is the best community for people who are looking for minimalist fashion",
      icon: ""
    },
    {
      key: 2,
      name: "Best Classification",
      desc: "With so many fashions available, MiSides comes with a breakthrough to classify fashion into certain categories to make it easier for you to find the design you like.",
      icon: ""
    },
    {
      key: 3,
      name: "Latest Trends",
      desc: "MiSides always keeps up and is present in every latest fashion trend for you, of course, to look more trendy and confident to show off",
      icon: ""
    }
  ]

  return (
    <div className='flex flex-wrap justify-center items-center mt-24 gap-12 md:gap-20 lg:gap-28'>

      {ServiceDetail.map((service) => (
        <div key={service.key} className=' w-[260px] aspect-[3/4] p-6 flex flex-col gap-6 text-center items-center service__card rounded-xl'>
          <div className='w-[50px] h-auto'><img src={service.icon} /></div>
          <div className=' font-semibold text-xl'>{service.name}</div>
          <div className=' text-sm text-shade'>{service.desc}</div>
          <div className=' text-primaryLight font-semibold flex gap-3 items-center group hover:text-primary cursor-pointer transition-all duration-300 ease-out'>More <BsArrowRightShort className='text-2xl font-bold group-hover:translate-x-2 transition-all duration-300 ease-out' /></div>
        </div>
      ))}

    </div>
  )
}

export default Services