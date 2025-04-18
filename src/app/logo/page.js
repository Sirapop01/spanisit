'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import {
    FaUniversity,
    FaThLarge,
    FaFileAlt,
    FaCalendarAlt,
} from 'react-icons/fa'
import { GiLotusFlower } from 'react-icons/gi'
import Aos from 'aos'

import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Banner from '../../assets/images/banner.png'
import Logo from '../../assets/images/SPAB_LOGO.png'

import 'aos/dist/aos.css'

export default function LogoPage() {
    useEffect(() => {
        Aos.init({ duration: 1000, once: true })
    }, [])

    const items = [
        {
            title: 'ตราองค์กร สภาผู้แทนนิสิตฯ',
            text: '(4 วิทยาเขต) อยู่ตรงกลางบนตราสภา',
            icon: <FaUniversity className="text-primary" />,
        },
        {
            title: 'กรอบรูป 6 เหลี่ยม',
            text: 'หลัก 6 ข้อเรื่องการศึกษาของคณะราษฎร์',
            icon: <FaThLarge className="text-primary" />,
        },
        {
            title: 'ธรรมนูญ 4 พับ',
            text: 'สภาผู้แทนนิสิตทั้ง 4 วิทยาเขต',
            icon: <FaFileAlt className="text-primary" />,
        },
        {
            title: 'พานบัว 10 กลีบ',
            text: '10 พันธกิจของสภาผู้แทนนิสิต',
            icon: <GiLotusFlower className="text-primary" />,
        },
        {
            title: 'พ.ศ. 2495',
            text: 'ปีที่ก่อตั้งสภาผู้แทนนิสิต องค์การนิสิต มหาวิทยาลัยเกษตรศาสตร์ ศรีราชา',
            icon: <FaCalendarAlt className="text-primary" />,
            fullWidth: true,
        },
    ]

    return (
        <div className="bg-gray-50">
            <Nav />

            {/* Banner */}
            <Image
                src={Banner}
                alt="Banner"
                className="w-full h-64 md:h-80 object-cover"
                data-aos="fade-down"
            />

            {/* Section Container */}
            <div className="px-4 py-12 max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12" data-aos="fade-up">

                    {/* Intro Box */}
                    <div className="bg-gray-50 p-6 rounded-xl mb-10 text-center">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">
                            สภาผู้แทนนิสิตฯ คืออะไร
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            สภาผู้แทนนิสิต องค์การนิสิต มหาวิทยาลัยเกษตรศาสตร์<br />
                            ชื่อเรียกทั่วไป คือ <span className="font-semibold">“สภา”</span><br />
                            ตรวจสอบการทำงานขององค์การบริหาร สโมสรนิสิต และชมรม<br />
                            พร้อมทำหน้าที่อื่น ๆ ตามพันธกิจ 10 ประการ
                        </p>
                    </div>

                    {/* Logo Box */}
                    <div className="bg-gray-50 p-6 rounded-xl mb-10 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                            ตราองค์กร สภาผู้แทนนิสิตฯ
                        </h2>
                        <div className="inline-block w-48 h-48 relative">
                            <Image
                                src={Logo}
                                alt="ตราสภาผู้แทนนิสิต"
                                fill
                                className="object-contain drop-shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Feature Grid Box */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`${item.fullWidth ? 'md:col-span-2' : ''
                                        } bg-white p-6 rounded-2xl shadow hover:shadow-lg transition`}
                                    data-aos="fade-up"
                                    data-aos-delay={100 + idx * 100}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        {item.icon}
                                        <h3 className="text-xl font-semibold text-primary">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            <Footer />
        </div>
    )
}
