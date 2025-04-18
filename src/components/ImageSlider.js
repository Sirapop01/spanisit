'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Aos from 'aos'

// Components
import SlideCard from './SlideCard'

// Styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'aos/dist/aos.css'

export default function ImageSlider({ slides = [] }) {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4" data-aos="fade-up">
      <Swiper
        spaceBetween={5}
        
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 30,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2000}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="overflow-visible custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className='!w-[250px] rounded-2xl'>
            <SlideCard slide={slide} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
