'use client';

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Logo from "../assets/images/spa_logo.png";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();
    const isWorkingPage = pathname.startsWith('/activities') || pathname.startsWith('/issues'); // สำหรับ dropdown

    return (
        <div className="bg-primary h-16 ">
            <div className="hidden lg:flex justify-between items-center h-full max-w-7xl mx-auto px-8">
                <div className="flex items-center gap-5">
                    <Image src={Logo} alt="Logo" className="h-16 w-auto" />
                    <div className="flex flex-col text-white text-sm">
                        <span>สภาผู้แทนนิสิต องค์การนิสิต</span>
                        <span>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</span>
                    </div>
                </div>
                <div className="flex gap-10 text-white">
                    <Link
                        className={`hover:text-secondary ${pathname === '/admin/member' ? 'text-secondary' : 'text-white'}`}
                        href="/"
                    >
                        ทำเนียบสภา
                    </Link>

                    <Link
                        className={`hover:text-secondary ${pathname === '/admin/role' ? 'text-secondary' : 'text-white'}`}
                        href="/admin/role"
                    >
                        ระเบียบ
                    </Link>

                    <Link
                        className={`hover:text-secondary ${pathname === '/admin/activities' ? 'text-secondary' : 'text-white'}`}
                        href="/admin/activities"
                    >
                        โครงการ/กิจกรรม
                    </Link>

                    <Link
                        className={`hover:text-secondary ${pathname === '/contact' ? 'text-secondary' : 'text-white'}`}
                        href="/contact"
                    >
                        การแก้ไขปัญหา
                    </Link>
                </div>

            </div>

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
                className={`lg:hidden fixed top-0 right-0 h-full w-full bg-[#db9717] z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <Icon className="text-secondary" icon="mdi:close" width="32" height="32" />
                    </button>
                </div>
                <div className="flex flex-col items-center mt-10 ml-5 mr-5 text-white text-sm font-semibold">
                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/' ? 'text-secondary' : ''
                            }`}
                        href="/"
                        onClick={() => setIsOpen(false)}
                    >
                        ทำเนียบสภา
                    </Link>


                    <Link
                        className={`hover:text-secondary ${pathname === '/statue' ? 'text-secondary' : 'text-white'}`}
                        href="/statue"
                    >
                        โครงการ/กิจกรรม
                    </Link>


                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/regulations' ? 'text-secondary' : ''
                            }`}
                        href="/regulations"
                        onClick={() => setIsOpen(false)}
                        >
                        ระเบียบ
                    </Link>

                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/contact' ? 'text-secondary' : ''
                            }`}
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
