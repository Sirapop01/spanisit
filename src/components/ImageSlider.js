'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from "next/image";
import 'swiper/css'
import 'swiper/css/pagination'
import Aos from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import Link from 'next/link';

export default function ImageSlider({ slides = [] }) {

  useEffect(() => {
    Aos.init({
      duration: 1000, // เวลาในการแสดงแอนิเมชั่น
      once: true,     // แสดงแอนิเมชั่นเพียงครั้งเดียว
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4 " data-aos="fade-up">
      <Swiper
        spaceBetween={5}
        centeredSlides={true}
        slidesPerView={2.2}
        breakpoints={{
          768: {
            slidesPerView: 4,
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
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="
                relative aspect-square 
                w-full max-w-[200px] md:max-w-none
                group mx-auto
                transition-all duration-300
                md:hover:w-[110%]
              "
            >
              <Link href={`/history/${item.id}`} passHref>
                <div className="relative w-full h-full cursor-pointer group">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={`slide-${index}`}
                    fill
                    className="object-cover rounded-lg"
                  />

                  {/* Overlay message */}
                  <div
                    className="
                      absolute inset-0 bg-black/40 
                      flex items-end rounded-lg
                      opacity-100      // mobile: แสดงข้อความตลอด
                      lg:opacity-0     // desktop: ซ่อนตอนปกติ
                      lg:group-hover:opacity-100  // desktop: hover แล้วค่อยแสดง
                      transition-opacity duration-300
                      z-10
                    "
                  >
                    <p className="text-white/70 lg:text-white text-sm pl-4 pb-3">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </Link>


            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
