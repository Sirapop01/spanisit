'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from '@/components/nav'
import Footer from '@/components/footer'
import { getActivityById } from '@/services/activityServices'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import BannerSection from '@/components/BannerSection'

export default function ActivityDetailPage() {
    const MySwal = withReactContent(Swal)
    const params = useParams()
    const { year, id } = params
    const [activity, setActivity] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return;
        console.log("Activity ID:", id);
        const fetchActivity = async () => {
            const res = await getActivityById(id);
            console.log("Activity data:", res.data); // ✅ ดูผลลัพธ์จริง
            if (res.success) {
                setActivity(res.data);
            } else {
                console.error(res.error);
            }
            setLoading(false);
        };
        fetchActivity();
    }, [id]);

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

    const formatDateRange = (start, end) => {
        if (!start || !end) return ''
        const startDate = start.toDate()
        const endDate = end.toDate()
        return `${format(startDate, 'd MMMM yyyy', { locale: th })} - ${format(endDate, 'd MMMM yyyy', { locale: th })}`
    }

    if (!activity) {
        return (
            <div>
                <Navbar />
                <BannerSection />
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <p className="text-center text-gray-500">ไม่พบข้อมูลกิจกรรมนี้</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <BannerSection />
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
                    {activity.title}
                </h1>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">รายละเอียดโครงการ</p>
                    <p className="text-lg text-gray-600 mt-2 whitespace-pre-line">
                        {activity.details}
                    </p>
                </div>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">ระยะเวลาโครงการ</p>
                    <p className="text-lg text-gray-600 mt-2">
                        {formatDateRange(activity.startDate, activity.endDate)}
                    </p>
                </div>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">สถานที่จัดโครงการ</p>
                    <p className="text-lg text-gray-600 mt-2">{activity.location}</p>
                </div>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">ภาพกิจกรรม</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                        {activity.photoURL.map((image, index) => (
                            <div
                                key={index}
                                className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white transition-transform duration-300 hover:shadow-2xl hover:scale-105"
                            >
                                <img
                                    src={image}
                                    alt={`กิจกรรมภาพที่ ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Link href={`/activities/${year}`}>
                    <button
                        className="px-6 py-3 text-white rounded-full mt-6 transition cursor-pointer"
                        style={{ backgroundColor: '#D98E04' }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#b87403'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#D98E04'}
                    >
                        กลับไปหน้ากิจกรรม ปีการศึกษา {year}
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    )
}
