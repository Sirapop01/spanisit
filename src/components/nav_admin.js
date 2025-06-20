'use client';

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Logo from "../assets/images/spa_logo.png";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = () => {
        router.push('/admin')
    }

    return (
        <div className="bg-primary h-16 ">
            <div className="hidden lg:flex justify-between items-center h-full max-w-7xl mx-auto px-8">
                <div className="flex items-center gap-5 cursor-pointer" onClick={handleClick}>
                    <Image src={Logo} alt="Logo" className="h-16 w-auto" />
                    <div className="flex flex-col text-white text-sm">
                        <span>สภาผู้แทนนิสิต องค์การนิสิต</span>
                        <span>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</span>
                    </div>
                </div>
                
                {/* ✅ ส่วนของ Desktop Menu ที่แก้ไขแล้ว */}
                <div className="flex gap-6 text-white">
                    <Link className={`hover:text-secondary ${pathname.startsWith('/admin/announcements') ? 'text-secondary' : 'text-white'}`} href="/admin/announcements">
                        ประกาศ
                    </Link>
                    <Link className={`hover:text-secondary ${pathname.startsWith('/admin/member') ? 'text-secondary' : 'text-white'}`} href="/admin/member">
                        ทำเนียบสภา
                    </Link>
                  { /* <Link className={`hover:text-secondary ${pathname.startsWith('/admin/regulations') ? 'text-secondary' : 'text-white'}`} href="/admin/regulations">
                        ระเบียบ
                    </Link> */}
                    <Link className={`hover:text-secondary ${pathname.startsWith('/admin/activities') ? 'text-secondary' : 'text-white'}`} href="/admin/activities">
                        โครงการ/กิจกรรม
                    </Link>
                    <Link className={`hover:text-secondary ${pathname.startsWith('/admin/complaint') ? 'text-secondary' : 'text-white'}`} href="/admin/complaint">
                        เรื่องร้องเรียน
                    </Link>
                </div>

            </div>

            {/* Mobile Menu */}
            <div className="flex lg:hidden justify-between items-center h-full px-4">
                <div className="flex items-center gap-3">
                    <Image src={Logo} alt="Logo" className="h-12 w-auto" />
                    <div className="flex flex-col text-white text-sm leading-tight">
                        <span>สภาผู้แทนนิสิต องค์การนิสิต</span>
                        <span>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</span>
                    </div>
                </div>
                <button onClick={() => setIsOpen(true)} className="text-secondary">
                    <Icon icon="ei:navicon" width="32" height="32" />
                </button>
            </div>

            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-full bg-[#db9717] z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <Icon className="text-secondary" icon="mdi:close" width="32" height="32" />
                    </button>
                </div>
                {/* ✅ ส่วนของ Mobile Menu ที่แก้ไขแล้ว */}
                <div className="flex flex-col items-center mt-10 ml-5 mr-5 text-white text-sm font-semibold">
                    <Link className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname.startsWith('/admin/announcements') ? 'text-secondary' : ''}`} href="/admin/announcements" onClick={() => setIsOpen(false)}>
                        ประกาศ
                    </Link>
                    <Link className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname.startsWith('/admin/member') ? 'text-secondary' : ''}`} href="/admin/member" onClick={() => setIsOpen(false)}>
                        ทำเนียบสภา
                    </Link>
                    <Link className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname.startsWith('/admin/regulations') ? 'text-secondary' : ''}`} href="/admin/regulations" onClick={() => setIsOpen(false)}>
                        ระเบียบ
                    </Link>
                    <Link className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname.startsWith('/admin/activities') ? 'text-secondary' : ''}`} href="/admin/activities" onClick={() => setIsOpen(false)}>
                        โครงการ/กิจกรรม
                    </Link>
                    <Link className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname.startsWith('/admin/complaint') ? 'text-secondary' : ''}`} href="/admin/complaint" onClick={() => setIsOpen(false)}>
                        เรื่องร้องเรียน
                    </Link>
                </div>
            </div>
        </div>
    );
}