'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Banner from '../../assets/images/banner.png'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

import roles from '../../data/MemberData'

export default function RolePage() {

    const currentYear = new Date().getFullYear();
    const startYear = 2540;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i + 543);

    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    // 1. ประธาน (id "0")
    const presidents = useMemo(() => roles.filter(r => r.id === '0'), [roles])

    // 2. ฝ่ายบริหาร, รองประธาน, เลขาธิการ, เลขานุการ, เหรัญญิก (id "1","2","3","4")
    const leadership = useMemo(
        () => roles.filter(r => ['1', '2', '3', '4'].includes(r.id)),
        [roles]
    )

    // 3. ประธานคณะกรรมการบริการ 6 ฝ่าย (id "5")
    const chairs = useMemo(() => roles.filter(r => r.id === '5'), [roles])

    // 4. คณะกรรมการบริการ 6 ฝ่าย (id "6")
    const committeeGuests = useMemo(() => roles.filter(r => r.id === '6'), [roles])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-primary ">
            <Nav />

            {/* Banner */}
            <Image
                src={Banner}
                alt="Banner"
                className="w-full h-64 object-cover"
                data-aos="fade-up"
            />

            <div className="px-4 py-12 max-w-6xl mx-auto space-y-16">
                {/* ปีการศึกษา */}
                <div
                    className="flex flex-col md:flex-row justify-between items-center"
                    data-aos="fade-up"
                >
                    <h2 className="text-xl font-bold text-primary">
                        ทำเนียบสภาฯ ประจำปีการศึกษา
                    </h2>
                    <select className="mt-4 md:mt-0 border rounded px-4 py-2">
                        <option value="" disabled>เลือกปี</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 1. ประธาน */}
                <section data-aos="fade-up">
                    <h3 className="text-lg font-semibold text-secondary mb-4 border-b-2 inline-block">
                        ประธานสภานิสิต
                    </h3>
                    <div className="flex justify-center">
                        {presidents.map((p, index) => (
                            <Link
                                key={`${p.id}-${index}`}
                                href={`/member/${p.id}`}
                                className="w-60 h-60 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                            >
                                <Image
                                    src={p.image}
                                    alt={p.name}
                                    width={240}
                                    height={240}
                                    className="object-cover rounded-full mb-2"
                                />
                                <span className="font-medium">{p.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 2. ฝ่ายบริหาร · รองประธาน · เลขาธิการ · เลขานุการ · เหรัญญิก */}
                <section data-aos="fade-up" data-aos-delay="100">
                    <h3 className="text-lg font-semibold text-secondary mb-6 border-b-2 inline-block">
                        ฝ่ายบริหาร · รองประธาน · เลขาธิการ · เลขานุการ · เหรัญญิก
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {leadership.map((m, index) => (
                            <Link
                                key={`${m.id}-${index}`}
                                href={`/member/${m.id}`}
                                className="aspect-square bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                            >
                                <Image
                                    src={m.image}
                                    alt={m.name}
                                    width={160}
                                    height={160}
                                    className="object-cover rounded-full mb-2"
                                />
                                <span className="font-medium">{m.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 3. ประธานคณะกรรมการบริการ 6 ฝ่าย */}
                <section data-aos="fade-up" data-aos-delay="200">
                    <h3 className="text-lg font-semibold text-secondary mb-6 border-b-2 inline-block">
                        ประธานคณะกรรมการบริการ 6 ฝ่าย
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {chairs.map((c, index) => (
                            <Link
                                key={`${c.id}-${index}`}
                                href={`/member/${c.id}`}
                                className="aspect-square bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                            >
                                <Image
                                    src={c.image}
                                    alt={c.name}
                                    width={160}
                                    height={160}
                                    className="object-cover rounded-full mb-2"
                                />
                                <span className="font-medium">{c.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 4. คณะกรรมการบริการ 6 ฝ่าย */}
                <section data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-lg font-semibold text-secondary mb-6 border-b-2 inline-block">
                        คณะกรรมการบริการ 6 ฝ่าย
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {committeeGuests.map((m, index) => (
                            <Link
                                key={`${m.id}-${index}`}
                                href={`/member/${m.id}`}
                                className="aspect-square bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
                            >
                                <Image
                                    src={m.image}
                                    alt={m.name}
                                    width={160}
                                    height={160}
                                    className="object-cover rounded-full mb-2"
                                />
                                <span className="font-medium ">{m.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}
