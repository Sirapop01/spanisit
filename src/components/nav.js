
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
                        className={`hover:text-secondary ${pathname === '/' ? 'text-secondary' : 'text-white'}`}
                        href="/"
                    >
                        หน้าหลัก
                    </Link>

                    <Link
                        className={`hover:text-secondary ${pathname.startsWith('/history') ? 'text-secondary' : 'text-white'}`}
                        href="/history/1"
                    >
                        ทำเนียบสภา
                    </Link>

                    <div className="relative group">
                        <button
                            className={`hover:text-secondary flex items-center ${isWorkingPage ? 'text-secondary' : 'text-white'}`}
                        >
                            การทำงาน
                            <Icon icon="mdi:chevron-down" width="20" />
                        </button>

                        {/* Dropdown menu */}
                        <div className="absolute left-0 top-9 mt-2 pb-2 w-56 h-auto bg-white text-secondary rounded-md shadow-lg opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 origin-top transition-all duration-600 z-50 border-b-6 border-primary">
                            <Link
                                href="/activities"
                                className={`block py-2 hover:text-primary border-b border-secondary ml-3 mr-3 ${pathname === '/activities' ? 'text-primary' : 'text-secondary'
                                    }`}
                            >
                                | โครงการ/กิจกรรม
                            </Link>
                            <Link
                                href="/issues"
                                className={`block py-2 hover:text-primary border-b border-secondary ml-3 mr-3 ${pathname === '/issues' ? 'text-primary' : 'text-secondary'
                                    }`}
                            >
                                | การผลักดันปัญหา
                            </Link>
                        </div>
                    </div>

                    <Link
                        className={`hover:text-secondary ${pathname === '/statue' ? 'text-secondary' : 'text-white'}`}
                        href="/statue"
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
                        หน้าหลัก
                    </Link>

                    <Link
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/members' ? 'text-secondary' : ''
                            }`}
                        href="/members"
                        onClick={() => setIsOpen(false)}
                    >
                        ทำเนียบสภา
                    </Link>

                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary flex justify-between ${isWorkingPage ? 'text-secondary' : ''
                            }`}
                    >
                        การทำงาน :
                        <Icon
                            icon="mdi:chevron-down"
                            className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            width="20"
                        />
                    </button>

                    {/* เมนูย่อย */}
                    <div
                        className={`flex flex-col gap-3 text-sm text-white w-full pl-6 overflow-hidden transition-all duration-600 ease-in-out transform 
                            ${isDropdownOpen ? 'max-h-40 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'}`}
                    >
                        <Link
                            href="/activities"
                            onClick={() => setIsOpen(false)}
                            className={`border-b border-secondary pb-2 w-full hover:text-secondary ${pathname === '/activities' ? 'text-secondary' : ''
                                }`}
                        >
                            กิจกรรม
                        </Link>

                        <Link
                            href="/issues"
                            onClick={() => setIsOpen(false)}
                            className={`border-b border-secondary mb-5 pb-2 w-full hover:text-secondary ${pathname === '/issues' ? 'text-secondary' : ''
                                }`}
                        >
                            การผลักดันปัญหา
                        </Link>
                    </div>

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
