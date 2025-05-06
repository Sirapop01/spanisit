'use client'

import { useEffect } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import AOS from 'aos'
import 'aos/dist/aos.css'
import BannerSection from '@/components/BannerSection'

// Import ข้อมูลจากไฟล์ rulesData.js
import { rulesData } from '@/data/rulesData'

export default function RulePage() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    return (
        <div>
            <Nav />

            <BannerSection />

            {/* Main Content */}
            <main className="max-w-4xl mx-auto p-6 text-black">
                <h1
                    className="text-2xl font-bold text-primary mb-6"
                    data-aos="fade-up"
                >
                    ระเบียบและธรรมนูญนิสิต
                </h1>

                {rulesData.map((section, idx) => (
                    <div key={idx} className="mb-8" data-aos="fade-up" data-aos-delay={idx * 100}>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h2>
                        <table className="w-full border border-gray-400">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2 text-left">ชื่อ</th>
                                    <th className="border border-gray-400 px-4 py-2 text-left">ไฟล์</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section.files.map((file, i) => (
                                    <tr key={i}>
                                        <td className="border border-gray-400 px-4 py-2">{file.name}</td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            <a
                                                href={file.path}
                                                download
                                                className="text-blue-600 hover:underline"
                                            >
                                                ดาวน์โหลด PDF
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </main>

            <Footer />
        </div>
    )
}
