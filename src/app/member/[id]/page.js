'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Image from 'next/image'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getMemberById } from '@/services/memberServices'
import BannerSection from '@/components/BannerSection'
import Link from 'next/link'

const MySwal = withReactContent(Swal)

export default function MemberPage() {
    const { id } = useParams()
    const router = useRouter()
    const [member, setMember] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMember = async () => {
            try {
                // แสดง SweetAlert บอกกำลังโหลด
                MySwal.fire({
                    title: 'กำลังโหลดข้อมูล...',
                    text: 'กรุณารอสักครู่',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    allowOutsideClick: false, // ป้องกันการคลิกออกนอก SweetAlert
                    showConfirmButton: false, // ปิดปุ่มยืนยัน
                })

                console.log("🔍 ID จาก URL:", id)

                const res = await getMemberById(id)
                if (res.success && res.data) {
                    setMember(res.data)
                } else {
                    throw new Error(res.error || 'ไม่พบข้อมูล')
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาด:", error.message)
                MySwal.fire({
                    title: 'ไม่พบข้อมูลสมาชิก',
                    text: 'ขออภัย ไม่พบข้อมูลของสมาชิกที่คุณต้องการดู',
                    icon: 'error',
                    confirmButtonText: 'ย้อนกลับ',
                }).then(() => {
                    router.back()
                })
            } finally {
                setLoading(false)
                // เมื่อโหลดเสร็จแล้วปิด SweetAlert
                MySwal.close()
            }
        }

        if (id) {
            fetchMember()
        }
    }, [id, router])

    // แสดงข้อมูลเมื่อข้อมูลโหลดเสร็จ
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-primary">
            <Nav />
            <BannerSection />
            <div className="px-4 py-12 max-w-6xl mx-auto space-y-16 text-center items-center">
                <p className="text-3xl font-bold text-gray-800 mb-12 text-center">ข้อมูลสมาชิก</p>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                    <div className="flex flex-col items-center">
                        <div className="w-64 h-64 bg-gray-200 rounded-full overflow-hidden">
                            {member && member.photoUrl ? (
                                <Image
                                    src={member.photoUrl}
                                    alt={`${member.prefix} ${member.name} ${member.surname}` || 'รูปสมาชิก'}
                                    width={256}
                                    height={256}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
                                    <p className="text-center text-gray-500">ไม่มีรูป</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 text-center">
                            {member ? (
                                <>
                                    <p className="text-xl font-semibold">{member.prefix} {member.name} {member.surname}</p>
                                    <p className="text-gray-600 text-base">({member.nickname})</p>
                                </>
                            ) : (
                                <p>กำลังโหลดข้อมูล...</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 text-lg md:ml-12 w-full">
                        <div className="flex items-center gap-2 p-4">
                            <p className="font-semibold text-gray-700">ตำแหน่ง:</p>
                            <p className="text-gray-800">{member?.position}</p>
                        </div>

                        <div className="flex items-center gap-2 p-4">
                            <p className="font-semibold text-gray-700">คณะ:</p>
                            <p className="text-gray-800">{member?.faculty}</p>
                        </div>

                        <div className="flex items-center gap-2 p-4">
                            <p className="font-semibold text-gray-700">ปี พ.ศ.:</p>
                            <p className="text-gray-800">{member?.year}</p>
                        </div>

                        <div className="flex items-center gap-2 p-4">
                            <p className="font-semibold text-gray-700">ปรัชญา / คติประจำใจ:</p>
                            <p className="italic text-gray-600">{member?.motto || '-'}</p>
                        </div>
                    </div>

                </div>
                <Link href="/member" className="text-blue-500 mt-4 items-center flex justify-center">
                    <button className="px-4 py-2 bg-primary text-white rounded-md shadow-md hover:scale-105 transition duration-200 cursor-pointer">
                        กลับไปหน้าทำเนียบสมาชิก
                    </button>
                </Link>
            </div>

            <Footer />
        </div>
    )
}
