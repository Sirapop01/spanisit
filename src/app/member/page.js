'use client'

import { use, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Banner from '../../assets/images/banner.png'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'

import { getAvailableYears, getMemberByYrs } from '@/services/memberServices'
import BannerSection from '@/components/BannerSection'

export default function RolePage() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const currentYear = new Date().getFullYear()
    const startYear = 2567
    const years = Array.from({ length: currentYear - (startYear - 543) + 1 }, (_, i) => currentYear - i + 543)

    const [selectedYear, setSelectedYear] = useState(years[0] ?? null)

    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 800, once: true })

        const fetchYears = async () => {
            const response = await getAvailableYears();
            if (response.success) {
                setAvailableYears(response.data);
                setSelectedYear(response.data[0] ?? null);
            } else {
                setError('ไม่สามารถโหลดปีที่มีข้อมูลได้');
            }
        };

        fetchYears();
    }, [])



    useEffect(() => {
        const fetchMember = async () => {
            Swal.fire({
                title: 'กำลังโหลดข้อมูล...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })

            try {
                const response = await getMemberByYrs(parseInt(selectedYear))
                if (response.success) {
                    setMembers(response.data)
                } else {
                    setError('ไม่สามารถโหลดข้อมูลสมาชิกในวาระที่เลือกได้')
                }
            } catch (e) {
                setError('เกิดข้อผิดพลาดขณะดึงข้อมูลสมาชิกในวาระที่เลือก')
            } finally {
                Swal.close()
            }
        }

        if (selectedYear) {
            fetchMember()
        }
    }, [selectedYear])

    // Filtering ด้วยชื่อของตำแหน่ง
    const presidents = useMemo(() => members.filter(m => m.position.startsWith('ประธานสภาผู้แทนนิสิต')), [members])
    const leadership = useMemo(
        () =>
            members.filter(m =>
                ['เลขาธิการ', 'เลขานุการ', 'เหรัญญิก'].some(role => m.position.includes(role))
            ),
        [members]
    )
    const vicePresidents = useMemo(() => members.filter(m => m.position.startsWith('รองประธาน')), [members])
    const chairs = useMemo(() => members.filter(m => m.position.startsWith('ประธานคณะกรรมาธิการ')), [members])
    const committeeGuests = useMemo(() => members.filter(m => m.position.startsWith('คณะกรรมาธิการ')), [members]);

    // แยกคณะกรรมการตามฝ่าย
    const committees = {
        "คณะกรรมาธิการฝ่ายกิจการภายใน และ ทรัพย์สิน": committeeGuests.filter(m => m.position === "คณะกรรมาธิการฝ่ายกิจการภายใน และทรัพย์สิน"),
        "คณะกรรมาธิการฝ่ายองค์กรกิจกรรมนิสิต": committeeGuests.filter(m => m.position === "คณะกรรมาธิการฝ่ายองค์กรกิจกรรมนิสิต"),
        "คณะกรรมาธิการฝ่ายส่งเสริมภาพลักษณ์ และ สื่อสารองค์กร": committeeGuests.filter(m => m.position === "คณะกรรมาธิการฝ่ายส่งเสริมภาพลักษณ์ และสื่อสารองค์กร"),
        "คณะกรรมาธิการฝ่ายธรรมนูญนิสิต": committeeGuests.filter(m => m.position === "คณะกรรมาธิการฝ่ายธรรมนูญนิสิต"),
        "คณะกรรมาธิการฝ่ายนโยบาย และ แผน": committeeGuests.filter(m => m.position === "คณะกรรมาธิการฝ่ายนโยบาย และแผน"),
        "คณะกรรมาธิการฝ่ายควบคุม ติดตาม และ ตรวจสอบ": committeeGuests.filter(m => m.position === "คณะกรรมาธิการฝ่ายควบคุม ติดตาม และตรวจสอบ")
    };

    const renderMembers = (data) =>
        data.map((m, index) => (
            <Link
                key={`${m.name}-${index}`}
                href={`/member/${m.id}`}
                className=" flex flex-col items-center justify-center p-4 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
                {m.photoUrl ? (
                    <Image
                        src={m.photoUrl}
                        alt={m.name}
                        width={160}
                        height={160}
                        className="object-cover [object-position:center_30%] rounded-full mb-2 shadow-lg border-4 border-white w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                    />

                ) : (
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2 text-sm text-white font-semibold">
                        ไม่มีรูป
                    </div>
                )}
                <span className="font-bold ">{m.name}</span>
                <span className="font-medium ">{m.position}</span>
            </Link>
        ))


    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-primary">
            <Nav />

            <BannerSection />
            <div className="px-4 py-12 max-w-6xl mx-auto space-y-16 ">
                {/* ปีการศึกษา */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4" data-aos="fade-up">
                    <h2 className="text-xl font-bold text-primary">ทำเนียบสภาฯ ประจำปีการศึกษา</h2>
                    <select
                        className="mt-4 md:mt-0 border rounded px-4 py-2"
                        value={selectedYear ?? ''}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        <option value="" disabled>
                            เลือกปี
                        </option>
                        {availableYears.length > 0 ? (
                            availableYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))
                        ) : (
                            <option disabled>ไม่มีข้อมูล</option>
                        )}
                    </select>
                </div>
                {/* 1. ประธาน */}
                {presidents.length > 0 && (
                    <section data-aos="fade-up">
                        <h3 className="text-lg font-semibold text-secondary mb-4 border-b-2 inline-block">
                            ประธานสภานิสิต
                        </h3>
                        <div className="flex justify-center text-ellipsis overflow-hidden whitespace-nowrap">{renderMembers(presidents)}</div>
                    </section>
                )}

                {/* 4. รองประธาน */}
                {vicePresidents.length > 0 && (
                    <section data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-lg font-semibold text-secondary mb-6 border-b-2 inline-block ">
                            รองประธานสภาฯ
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-ellipsis overflow-hidden whitespace-nowrap">{renderMembers(vicePresidents)}</div>
                    </section>
                )}

                {/* 3. ฝ่ายบริหาร */}
                {leadership.length > 0 && (
                    <section data-aos="fade-up" data-aos-delay="100">
                        <h3 className="text-lg font-semibold text-secondary mb-6 border-b-2 inline-block">
                            ฝ่ายบริหาร · เลขาธิการ · เลขานุการ · เหรัญญิก
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-ellipsis overflow-hidden whitespace-nowrap">{renderMembers(leadership)}</div>
                    </section>
                )}


                {/* 4. ประธานคณะกรรมการบริการ */}
                {chairs.length > 0 && (
                    <section data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-lg font-semibold text-secondary mb-6 border-b-2 inline-block">
                            ประธานคณะกรรมการบริการ 6 ฝ่าย
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-ellipsis overflow-hidden whitespace-nowrap">{renderMembers(chairs)}</div>
                    </section>
                )}

                {/* 5. คณะกรรมการบริการ */}

                {committeeGuests.length > 0 && (
                    <section data-aos="fade-up" data-aos-delay="300" className='item-center'>

                        {Object.keys(committees).map((committeeName) => (
                            committees[committeeName].length > 0 && (
                                <div key={committeeName} className='mb-8'>
                                    <h4 className="text-lg font-semibold text-secondary my-4 border-b-2 inline-block mx-auto">
                                        {committeeName}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15 text-ellipsis overflow-hidden whitespace-nowrap">
                                        {renderMembers(committees[committeeName])}
                                    </div>
                                </div>
                            )
                        ))}
                    </section>
                )}
            </div>

            <Footer />
        </div>
    )
}
