'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/footer'
import Navbar from '@/components/nav'
import Link from 'next/link'
import Swal from 'sweetalert2'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

import { getYearsWithActivities } from '@/services/activityServices'
import BannerSection from '@/components/BannerSection'

export default function Activity() {
    const [years, setYears] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        AOS.init({ duration: 1000 })

        const fetchYearsWithActivities = async () => {
            const loadingSwal = Swal.fire({
                title: 'กำลังโหลดข้อมูล...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })

            try {
                const response = await getYearsWithActivities()

                if (response.success) {
                    setYears(response.data)
                    console.log('Years with activities:', response.data)
                } else {
                    setError('ไม่สามารถดึงข้อมูลปีที่มีกิจกรรมได้')
                }
            } catch (err) {
                setError('เกิดข้อผิดพลาดในการดึงข้อมูล')
            } finally {
                Swal.close()
                setLoading(false)
            }
        }

        fetchYearsWithActivities()
    }, [])

    return (
        <div>
            <Navbar />
            <BannerSection />

            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center" data-aos="zoom-in">
                    โครงการ/กิจกรรม
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {years.map((item, index) => (
                        <Link key={`${item.year}-${index}`} href={`/activities/${item.year}`}>
                            <div
                                data-aos="fade-up"
                                data-aos-delay={100}
                                className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 bg-white cursor-pointer"
                            >
                                <img
                                    src={item.photoURL[0]}
                                    alt={`year-${item.year}`}
                                    className="w-full h-48 object-cover"
                                />

                                {/* ข้อความด้านล่าง */}
                                <div
                                    className="absolute bottom-0 left-0 w-full px-4 py-2 bg-white/80 
                                               text-center text-yellow-800 text-lg font-semibold 
                                               md:opacity-0 md:group-hover:opacity-100 
                                               transition-opacity duration-300"
                                >
                                    ปีการศึกษา {item.year}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
