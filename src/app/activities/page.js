'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/nav'
import Link from 'next/link'
import Banner from '@/assets/images/banner.png'
import Image from 'next/image'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Activity() {
    const [years, setYears] = useState([])

    useEffect(() => {
        AOS.init({ duration: 1000 })

        // mock ปี + รูปภาพของแต่ละปี
        const yearData = [
            { year: '2569', image: '/images/year-2569.jpg' },
            { year: '2568', image: '/images/year-2568.jpg' },
            { year: '2567', image: '/images/year-2567.jpg' },
            { year: '2566', image: '/images/year-2566.jpg' },
            { year: '2565', image: '/images/year-2565.jpg' },
            { year: '2564', image: '/images/year-2564.jpg' },
            { year: '2563', image: '/images/year-2563.jpg' },
          ]
          

        setYears(yearData)
    }, [])

    return (
        <div>
            <Navbar />
            <Image
                src={Banner}
                alt="Banner"
                className="w-full object-cover"
                data-aos="fade-up"
            />

            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center" data-aos="zoom-in">
                โครงการ/กิจกรรม
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {years.map((item, i) => (
                        <Link key={item.year} href={`/activity/${item.year}`}>
                            <div
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                                className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 bg-white cursor-pointer"
                            >
                                {/* overlay ปี พ.ศ. */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-10">
                                    <p className="text-white text-2xl font-bold">ปีการศึกษา {item.year}</p>
                                </div>
                                <img
                                    src={item.image}
                                    alt={`year-${item.year}`}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
