import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from "swiper";
import Image from 'next/image'

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { BiRightArrow } from 'react-icons/bi'

interface NewsType {
  key: React.Key
  name: string
  desc: string
  date: string
  link: string
  img: string
}



function NewsSwiper() {

  const NewsContent: NewsType[] = [
    {
      key: 1,
      name: "13 Halloween Costumes Inspired By This Years Viral Fashion Moments",
      desc: "Are you struggling to come up with an amazing Halloween costume this year?",
      date: "October 11, 2022",
      link: "https://www.vogue.com/slideshow/halloween-costume-ideas-viral-fashion-moments",
      img: ""
    },
    {
      key: 2,
      name: "The Princess Diana Uniform in Street Style",
      desc: "With The Crowns fifth season closely upon us, we`re getting in the mood to dress like Princess Diana.",
      date: "October 26, 2022",
      link: "https://www.vogue.com/article/street-style-fashion-week-princess-diana-street-style-looks",
      img: ""
    },
    {
      key: 3,
      name: "6 Fall Fashion Trends That Are Celebrity-Approved",
      desc: "Wondering what fall fashion trends are worth the investment right now?",
      date: "October 26, 2022",
      link: "https://www.vogue.com/article/6-fall-fashion-trends-inspired-by-celebrity-outfits",
      img: ""
    },
  ]

  return (
    <div>
      <Swiper
        slidesPerView={1.1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            centeredSlides: false
          },
          900: {
            slidesPerView: 3
          }
        }}
        spaceBetween={80}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="newsswiper"
      >

        {NewsContent.map((data) => (
          <SwiperSlide key={data.key}>
            <div className="news__card mx-auto flex flex-col glass rounded-xl overflow-hidden sm:grid sm:grid-cols-2 sm:max-h-72 md:flex md:flex-col md:max-h-fit  xl:grid xl:grid-cols-2 xl:max-h-[21rem]">
              <div className="border-b-2 rounded-xl overflow-hidden border-primary max-h-60 sm:max-h-full sm:border-b-transparent sm:border-r-2 md:max-h-60 md:border-b-2 md:border-r-transparent xl:max-h-full xl:border-b-transparent xl:border-r-2">
                <Image 
                  alt='News Picture' 
                  className="object-cover min-h-full min-w-full" 
                  src=""
                />
              </div>
              <div className="p-8 flex flex-col gap-y-4">
                <div className="text-normal font-semibold">May be once in lifetime</div>
                <div className="text-small">You can book and go to the top. Its worth it in the sense that you get this experience rarely - considering this is the tallest building. So may be once in a life time.</div>
                <div className="newscard__button">View More<BiRightArrow /></div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div >
  )
}

export default NewsSwiper