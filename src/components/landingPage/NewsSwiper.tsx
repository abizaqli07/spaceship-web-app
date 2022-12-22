import Image from 'next/image';
import { Autoplay, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { BiRightArrow } from 'react-icons/bi';
import { trpc } from '../../utils/trpc';


function NewsSwiper() {
  const news = trpc.signUp.getUserBlog.useQuery()

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

        {news.data?.blog.map((data) => (
          <SwiperSlide key={data.id_blog}>
            <div className="news__card mx-auto flex flex-col glass rounded-xl overflow-hidden sm:grid sm:grid-cols-2 sm:max-h-72 md:flex md:flex-col md:max-h-fit  xl:grid xl:grid-cols-2 xl:max-h-[21rem]">
              <div className="border-b-2 rounded-xl overflow-hidden border-primary max-h-60 sm:max-h-full sm:border-b-transparent sm:border-r-2 md:max-h-60 md:border-b-2 md:border-r-transparent xl:max-h-full xl:border-b-transparent xl:border-r-2">
                <Image
                  alt='News Picture'
                  className="object-cover min-h-full min-w-full"
                  src={data.link.startsWith("http") ? data.link : "/header.png"}
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="p-8 flex flex-col gap-y-4">
                <div className="text-normal font-semibold">{data.title}</div>
                <div className="text-small">{data.description}</div>
                <div className="px-3 w-fit py-1 flex gap-2 hover:gap-4 cursor-pointer items-center transition-all duration-300 ease-in-out bg-primary hover:bg-primaryHover rounded-full">View More<BiRightArrow /></div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div >
  )
}

export default NewsSwiper