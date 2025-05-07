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

// SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import { getActivityByYrs } from '@/services/activityServices'

export default function YearActivityPage() {
  const params = useParams()
  const year = params.year

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      try {
        const response = await getActivityByYrs(parseInt(year))
        if (response.success) {
          setActivities(response.data)
        } else {
          setError("ไม่สามารถโหลดกิจกรรมได้")
        }
      } catch (e) {
        setError("เกิดข้อผิดพลาดขณะดึงข้อมูลกิจกรรม")
      } finally {
        setLoading(false)
      }
    }

    if (year) {
      fetchActivities()
    }
  }, [year])

  useEffect(() => {
    if (loading) {
      MySwal.fire({
        title: 'กำลังโหลดข้อมูล...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
    } else {
      Swal.close()
    }
  }, [loading])

  return (
    <div>
      <Navbar />
      <Image
        src={Banner}
        alt="Banner"
        className="w-full object-cover h-56"
        data-aos="fade-up"
        priority // ✅ เพิ่ม priority สำหรับ LCP image
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1
          className="text-3xl font-bold text-yellow-700 mb-6 text-center"
          data-aos="zoom-in"
        >
          โครงการ/กิจกรรม – ปีการศึกษา {year}
        </h1>

        {error && (
          <p className="text-center text-red-500" data-aos="fade-up">
            {error}
          </p>
        )}

        {!error && activities.length === 0 ? (
          <p className="text-center text-gray-500" data-aos="fade-up">
            ไม่พบกิจกรรมในปี {year}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((item, idx) => (
              <Link key={item.id} href={`/activities/${year}/${item.id}`}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 bg-white cursor-pointer"
                >
                  {/* ข้อความที่ขอบล่างของรูป */}
                  <div
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300"
                  >
                    <p className="text-white text-lg font-semibold text-center">
                      {item.title}
                    </p>
                  </div>

                  {/* รูปภาพ */}
                  <img
                    src={item.photoURL[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
        <Link href={`/activities`}>
              <button
                className="px-6 py-3 text-white rounded-full mt-6 transition cursor-pointer"
                style={{ backgroundColor: '#D98E04' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#b87403'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#D98E04'}
              >
                กลับไปหน้ากิจกรรม
              </button>
            </Link>
      </div>

      <Footer />
    </div>
  )
}
