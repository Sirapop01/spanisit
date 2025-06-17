'use client';

import { useState, useRef, useEffect } from "react"; // เพิ่ม useRef และ useEffect
import { Icon } from "@iconify/react";
import Link from "next/link";
import Logo from "../assets/images/spa_logo.png";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // สำหรับ mobile menu
    const [isDropdownOpen, setDropdownOpen] = useState(false); // สำหรับ mobile dropdown
    const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false); // <-- เพิ่ม state สำหรับ desktop dropdown
    const pathname = usePathname();
    const isWorkingPage = pathname.startsWith('/activities') || pathname.startsWith('/complaint');
    const router = useRouter();
    const dropdownRef = useRef(null); // <-- เพิ่ม ref สำหรับ dropdown container

    const handleClick = () => {
        router.push('/');
    };

    // <-- เพิ่ม useEffect เพื่อจัดการการคลิกนอก dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDesktopDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    return (
        <div className="bg-primary h-16 sticky top-0 z-50 shadow-md">
            <div className="hidden lg:flex justify-between items-center h-full max-w-7xl mx-auto px-8">
                <div className="flex items-center gap-5 cursor-pointer" onClick={handleClick}>
                    <Image src={Logo} alt="Logo" className="h-16 w-auto" />
                    <div className="flex flex-col text-white text-sm">
                        <span>สภาผู้แทนนิสิต องค์การนิสิต</span>
                        <span>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</span>
                    </div>
                </div>
                <div className="flex gap-10 text-white">
                    <Link
                        className={`hover:text-secondary ${pathname === '/' ? 'text-secondary' : 'text-white'}`}
                        href="/"
                    >
                        หน้าหลัก
                    </Link>

                    <Link
                        className={`hover:text-secondary ${pathname === '/member' ? 'text-secondary' : 'text-white'}`}
                        href="/member"
                    >
                        ทำเนียบสภา
                    </Link>

                    {/* vvv ส่วนที่แก้ไขสำหรับ Desktop Dropdown vvv */}
                    <div className="relative group" ref={dropdownRef}>
                        <button
                            onClick={() => setDesktopDropdownOpen(prev => !prev)} // <-- เพิ่ม onClick เพื่อสลับสถานะ
                            className={`hover:text-secondary flex items-center ${isWorkingPage ? 'text-secondary' : 'text-white'}`}
                        >
                            การทำงาน
                            <Icon icon="mdi:chevron-down" width="20" />
                        </button>

                        {/* Dropdown menu */}
                        <div
                            className={`absolute left-0 top-9 mt-2 pb-2 w-56 h-auto bg-white text-secondary rounded-md shadow-lg origin-top transition-all duration-300 z-50 border-b-6 border-primary 
                            ${isDesktopDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'} 
                            group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto`}
                        >
                            <Link
                                href="/activities"
                                onClick={() => setDesktopDropdownOpen(false)} // ปิด dropdown เมื่อคลิกลิงก์
                                className={`block py-2 hover:text-primary border-b border-secondary ml-3 mr-3 ${pathname === '/activities' ? 'text-primary' : 'text-secondary'}`}
                            >
                                | โครงการ/กิจกรรม
                            </Link>
                            <Link
                                href="/complaint"
                                onClick={() => setDesktopDropdownOpen(false)} // ปิด dropdown เมื่อคลิกลิงก์
                                className={`block py-2 hover:text-primary border-b border-secondary ml-3 mr-3 ${pathname === '/complaint' ? 'text-primary' : 'text-secondary'}`}
                            >
                                | การผลักดันปัญหา
                            </Link>
                        </div>
                    </div>
                    {/* ^^^ สิ้นสุดส่วนที่แก้ไข ^^^ */}

                    <Link
                        className={`hover:text-secondary ${pathname === '/regulations' ? 'text-secondary' : 'text-white'}`}
                        href="/regulations"
                    >
                        ระเบียบ
                    </Link>

                    <Link
                        className={`hover:text-secondary ${pathname === '/contact' ? 'text-secondary' : 'text-white'}`}
                        href="/contact"
                    >
                        ติดต่อและร้องเรียน
                    </Link>
                </div>
            </div>

            {/* --- โค้ดส่วน Mobile ไม่มีการเปลี่ยนแปลง --- */}
            <div className="flex lg:hidden justify-between items-center h-full px-4">
                <div className="flex items-center gap-3" onClick={handleClick}>
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
                <div className="flex flex-col items-center mt-10 ml-5 mr-5 text-white text-sm font-semibold">
                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/' ? 'text-secondary' : ''}`}
                        href="/"
                        onClick={() => setIsOpen(false)}
                    >
                        หน้าหลัก
                    </Link>

                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/member' ? 'text-secondary' : ''}`}
                        href="/member"
                        onClick={() => setIsOpen(false)}
                    >
                        ทำเนียบสภา
                    </Link>

                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary flex justify-between ${isWorkingPage ? 'text-secondary' : ''}`}
                    >
                        การทำงาน :
                        <Icon
                            icon="mdi:chevron-down"
                            className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            width="20"
                        />
                    </button>
                    
                    <div
                        className={`flex flex-col gap-3 text-sm text-white w-full pl-6 overflow-hidden transition-all duration-600 ease-in-out transform 
                            ${isDropdownOpen ? 'max-h-40 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'}`}
                    >
                        <Link
                            href="/activities"
                            onClick={() => setIsOpen(false)}
                            className={`border-b border-secondary pb-2 w-full hover:text-secondary ${pathname === '/activities' ? 'text-secondary' : ''}`}
                        >
                            กิจกรรม
                        </Link>
                        <Link
                            href="/complaint"
                            onClick={() => setIsOpen(false)}
                            className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/complaint' ? 'text-secondary' : ''}`}
                        >
                            การผลักดันปัญหา
                        </Link>
                    </div>

                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/regulations' ? 'text-secondary' : ''}`}
                        href="/regulations"
                        onClick={() => setIsOpen(false)}
                    >
                        ระเบียบ
                    </Link>

                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/contact' ? 'text-secondary' : ''}`}
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                    >
                        ติดต่อและร้องเรียน
                    </Link>
                </div>
            </div>
        </div>
    );
}