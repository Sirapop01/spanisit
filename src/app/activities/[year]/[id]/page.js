'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Banner from '@/assets/images/banner.png';
import Navbar from '@/components/nav'
import Footer from '@/components/footer'

// ตัวอย่างข้อมูลกิจกรรม (คุณสามารถแทนที่ด้วยข้อมูลจริงจาก API)
const activityData = [
    {
        id: 1,
        title: 'กิจกรรม A',
        description: 'รายละเอียดของกิจกรรม A รวมถึงการเรียนรู้และพัฒนา...',
        duration: '1 มกราคม - 31 ธันวาคม 2566',
        location: 'หอประชุมใหญ่',
        images: [
            '/images/activity-image1.jpg',
            '/images/activity-image2.jpg',
            '/images/activity-image3.jpg',
            '/images/activity-image4.jpg',
        ]
    },
    {
        id: 2,
        title: 'กิจกรรม B',
        description: 'รายละเอียดของกิจกรรม B เป็นกิจกรรมที่เน้นการสร้างความร่วมมือ...',
        duration: '15 พฤษภาคม - 30 กันยายน 2567',
        location: 'สนามกีฬา',
        images: [
            '/images/activity-image5.jpg',
            '/images/activity-image6.jpg',
            '/images/activity-image7.jpg',
            '/images/activity-image8.jpg',
        ]
    },
    // เพิ่มกิจกรรมอื่นๆ ที่มี id, title, description, duration, location, images
]

export default function ActivityDetailPage() {
    const params = useParams()
    const { year, id } = params
    const [activity, setActivity] = useState(null)

    useEffect(() => {
        // ดึงข้อมูลกิจกรรมจาก data (แทนการดึงจาก API จริงๆ)
        const activityDetail = activityData.find(item => item.id === parseInt(id))
        setActivity(activityDetail)
    }, [id])

    if (!activity) {
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
                    <p className="text-center text-gray-500">ไม่พบข้อมูลกิจกรรมนี้</p>
                </div>
                <Footer />
            </div>
        )
    }

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
                <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
                    {activity.title}
                </h1>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">รายละเอียดโครงการ</p>
                    <p className="text-lg text-gray-600 mt-2">{activity.description}</p>
                </div>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">ระยะเวลาโครงการ</p>
                    <p className="text-lg text-gray-600 mt-2">{activity.duration}</p>
                </div>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">สถานที่จัดโครงการ</p>
                    <p className="text-lg text-gray-600 mt-2">{activity.location}</p>
                </div>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-700">ภาพกิจกรรม</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                        {activity.images.map((image, index) => (
                            <div
                                key={index}
                                className="
                                        relative group
                                        rounded-xl overflow-hidden
                                        shadow-lg border border-gray-200
                                        bg-white
                                        transition-transform duration-300
                                        hover:shadow-2xl hover:scale-105
                                        "
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
                <Link href={`/activity/${year}`}>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-full mt-6 hover:bg-blue-600 transition">
                        กลับไปหน้ากิจกรรม
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    )
}
