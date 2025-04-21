'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '@/components/nav'
import Footer from '@/components/footer'
import Banner from '@/assets/images/banner.png'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function YearActivityPage() {
  const params = useParams()
  const year = params.year   // ดึงปีจาก URL

  const [images, setImages] = useState([])

  useEffect(() => {
    AOS.init({ duration: 800, once: true })

    // ตัวอย่าง mock data
    const allData = [
      { id: 1, title: 'กิจกรรม A', year: '2566', url: '/sample1.jpg' },
      { id: 2, title: 'กิจกรรม B', year: '2567', url: '/sample2.jpg' },
      { id: 3, title: 'กิจกรรม C', year: '2567', url: '/sample3.jpg' },
    ]

    if (year) {
      const filtered = allData.filter((item) => item.year === year)
      setImages(filtered)
    }
  }, [year])

  return (
    <div>
      <Navbar />

      <Image
        src={Banner}
        alt="Banner"
        className="w-full object-cover h-56"
        data-aos="fade-up"
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1
          className="text-3xl font-bold text-yellow-700 mb-6 text-center"
          data-aos="zoom-in"
        >
          โครงการ/กิจกรรม – ปีการศึกษา {year}
        </h1>

        {images.length === 0 ? (
          <p className="text-center text-gray-500" data-aos="fade-up">
            ไม่พบกิจกรรมในปี {year}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((item, idx) => (
              <Link key={item.id} href={`/activity/${year}/${item.id}`}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 bg-white cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-10">
                    <p className="text-white text-lg font-semibold text-center px-2">
                      {item.title}
                    </p>
                  </div>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
