'use client'

import { useParams } from 'next/navigation'
import { useMemo, useEffect, useState } from 'react'
import roles from '../../../data/MemberData'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Image from 'next/image'

export default function MemberPage() {
    const { id } = useParams() // ดึง id จาก params ใน URL

    // ดึงข้อมูลสมาชิกจาก roles โดยใช้ id
    const member = useMemo(() => roles.find(r => r.id === id), [id])

    const [loading, setLoading] = useState(true)

    // ตรวจสอบว่า id พร้อมแล้ว
    useEffect(() => {
        if (id) {
            setLoading(false)
        }
    }, [id])

    // ถ้า member ไม่มีข้อมูลให้แสดง
    if (!member) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <h2 className="text-2xl font-bold text-primary">ไม่พบข้อมูลสมาชิก</h2>
            </div>
        )
    }

    // ถ้ากำลังโหลด
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <h2 className="text-2xl font-bold text-primary">กำลังโหลด...</h2>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-primary">
            <Nav />

            {/* ข้อมูลสมาชิก */}
            <div className="px-4 py-12 max-w-6xl  space-y-16">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div>
                        {/* รูปภาพ */}
                        <div className="w-64 h-64 bg-gray-200 rounded-full overflow-hidden">
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={256}
                                height={256}
                                className="object-cover rounded-full"
                            />
                        </div>
                        <div className='text-primary text-2xl text-center mt-10 mb-10'>{member.name}</div>
                    </div>

                    {/* ข้อมูลสมาชิก */}
                    <div className="space-y-4 ml-20">
                        <h2 className="text-2xl font-bold">{member.name}</h2>
                        <p className="text-lg">{member.position}</p>
                        <p className="text-lg">{member.faculty}</p>
                        <p className="italic text-gray-600">{member.motto}</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
