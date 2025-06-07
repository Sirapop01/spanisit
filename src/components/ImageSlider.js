'use client'

import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules' // นำ Navigation ออกถ้าไม่ต้องการลูกศร
import Aos from 'aos'

import SlideCard from './SlideCard'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
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
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} style={{ width: '250px', height: '250px' }}>
            {/* SlideCard ที่แก้ไขแล้วจะทำงานในนี้ */}
            <SlideCard slide={slide} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}