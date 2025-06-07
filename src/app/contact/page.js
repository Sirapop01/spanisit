'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Icon } from '@iconify/react';
import BannerSection from '@/components/BannerSection';
import { SiLine } from 'react-icons/si';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

import Swal from 'sweetalert2';
import { addComplaint } from '@/services/complaintServices';

export default function ContactPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่ม state สำหรับ loading

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    // --- ✅ อัปเดตฟังก์ชัน handleSubmit ---
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        // แสดง loading alert
        Swal.fire({
            title: 'กำลังส่งข้อมูล...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const result = await addComplaint(form);
            if (result.success) {
                
                Swal.fire({
                    icon: 'success',
                    title: 'ส่งเรื่องร้องเรียนสำเร็จ!',
                    html: 'เราได้รับข้อความของคุณแล้ว<br>คุณสามารถติดตามสถานะการดำเนินการได้ที่หน้า<b>การผลักดันปัญหา</b>',
                    showCancelButton: true,
                    confirmButtonText: 'ไปที่หน้าติดตามปัญหา',
                    cancelButtonText: 'ปิด',
                    confirmButtonColor: '#153A57', 
                    cancelButtonColor: '#6c757d',
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/issues'); 
                    }
                });
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('ไม่สามารถส่งข้อมูลได้');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถส่งเรื่องร้องเรียนได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <BannerSection />
            {/* Intro + Map */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* left info */}
                <div data-aos="fade-right">
                    <h1 className="text-3xl font-bold text-primary mb-4">
                        ติดต่อกับเรา
                    </h1>
                    <p className="mb-2 text-gray-700">
                        ส่งข้อความหาเรา หากท่านมีคำถาม ข้อเสนอแนะ หรือร้องทุกข์
                    </p>
                    <h2 className="text-xl font-semibold mb-2">ข้อมูลสำหรับติดต่อ</h2>
                    <ul className="space-y-4 text-gray-800">
                        <li className="flex items-start gap-2">
                            <Icon icon="mdi:map-marker" className="text-2xl text-secondary mt-1" />
                            <span>
                                ชั้น 2 อาคารศูนย์กิจกรรม(อาคาร 9)<br />
                                199 หมู่6 ถนนสุขุมวิท ตำบลทุ่งสุขลา อำเภอศรีราชา ชลบุรี 20230
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Icon icon="mdi:email-outline" className="text-2xl text-secondary" />
                            <a href="mailto:spanisit.ku.src@gmail.com" className="hover:underline">
                                spanisit.ku.src@gmail.com
                            </a>
                        </li>
                        <li className="flex flex-col gap-4 mt-4">
                            <a href="https://facebook.com/spanisit.ku.src" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                                <FaFacebook className="text-2xl text-secondary hover:text-primary transition" />
                                <span>สภาผู้แทนนิสิตฯ ศรีราชา</span>
                            </a>
                            <a href="https://instagram.com/spanisit.ku.src" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                                <FaInstagram className="text-2xl text-secondary hover:text-primary transition" />
                                <span>SPANISIT.KU.SRC</span>
                            </a>
                            <a href="https://twitter.com/spanisit_kusrc" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                                <FaTwitter className="text-2xl text-secondary hover:text-primary transition" />
                                <span>@spanisit_kusrc</span>
                            </a>
                            <a href="https://line.me/R/ti/p/@459wzngs?ref=website_button" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                                <SiLine className="text-2xl text-secondary hover:text-primary transition" />
                                <span>@spanisit_kusrc</span>
                            </a>
                            <a href="https://tiktok.com/@spanisit.ku.src" target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                                <FaTiktok className="text-2xl text-secondary hover:text-primary transition" />
                                <span>spanisit.ku.src</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* right map */}
                <div
                    className="w-full h-full rounded-xl overflow-hidden shadow-lg"
                    data-aos="fade-left"
                >
                    <iframe
                        title="KU Sriracha Campus"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.204501229792!2d100.92138991535917!3d13.111838690858104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102c5d183185c7d%3A0x85326f83b1a5e143!2sKasetsart%20University%20Sriracha%20Campus!5e0!3m2!1sen!2sth!4v1628585474883!5m2!1sen!2sth"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            {/* Feedback form */}
            <div className="bg-gray-50 py-12">
                <h2
                    className="text-2xl text-primary font-bold text-center mb-6"
                    data-aos="fade-up"
                >
                    หากคุณมีปัญหาเรายินดีรับฟัง
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6"
                    data-aos="fade-up"
                    data-aos-delay={200}
                >
                    <div>
                        <label className="block text-gray-700 mb-1">ชื่อ–นามสกุล</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="กรอกชื่อ–นามสกุลของคุณ"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-secondary focus:ring-1 placeholder-gray-500 text-secondary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">อีเมล</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-secondary focus:ring-1 placeholder-gray-500 text-secondary"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-1">หัวข้อการร้องเรียน</label>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="กรอกหัวข้อการร้องเรียน"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-secondary focus:ring-1 placeholder-gray-500 text-secondary"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-1">รายละเอียด</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="กรอกรายละเอียดเพิ่มเติมเกี่ยวกับการร้องเรียนของคุณ"
                            rows={5}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-secondary focus:ring-1 placeholder-gray-500 text-secondary"
                            required
                        />
                    </div>
                    <div className="md:col-span-2 text-center">
                        <button
                            type="submit"
                            className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-primary transition disabled:bg-gray-400"
                            disabled={isLoading} // ✅ ปิดปุ่มเมื่อกำลังโหลด
                        >
                            {isLoading ? 'กำลังส่ง...' : 'ส่งเรื่องร้องเรียน'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}