import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="bg-[#D98E04] h-16">
            <div className="hidden lg:flex justify-between items-center h-full max-w-7xl mx-auto px-8">
                <div className="flex items-center gap-5">
                    <img src="/assets/spa_logo.png" alt="Logo" className="h-16 w-auto" />
                    <div className="flex flex-col text-white text-sm">
                        <span>สภาผู้แทนนิสิต องค์การนิสิต</span>
                        <span>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</span>
                    </div>
                </div>
                <div className="flex gap-10 text-white">
                    <Link className="hover:text-[#153A57]" href="">หน้าหลัก</Link>
                    <Link className="hover:text-[#153A57]" href="">ทำเนียบสภา</Link>
                    <div className="relative group">
                        <button className="hover:text-[#153A57] flex items-center">การทำงาน
                            <Icon
                                icon="mdi:chevron-down"
                                width="20"
                            />
                        </button>

                        {/* Dropdown menu */}
                        <div
                            className="absolute left-0 top-9 mt-2 pb-2 w-56 h-auto bg-white text-[#153A57] rounded-md shadow-lg opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 origin-top transition-all duration-600 z-50"
                        >
                            <Link
                                href="/activities"
                                className="block  py-2 hover:text-[#D98E04] border-b border-[#153A57]  ml-3 mr-3"
                            >
                                | กิจกรรม
                            </Link>
                            <Link
                                href="/issues"
                                className="block  py-2 hover:text-[#D98E04] border-b border-[#153A57]  ml-3 mr-3"
                            >
                                | การผลักดันปัญหา
                            </Link>
                        </div>
                    </div>
                    <Link className="hover:text-[#153A57]" href="">ระเบียบ</Link>
                    <Link className="hover:text-[#153A57]" href="">ติดต่อและร้องเรียน</Link>
                </div>
            </div>

            <div className="flex lg:hidden justify-between items-center h-full px-4">
                <div className="flex items-center gap-3">
                    <img src="/assets/spa_logo.png" alt="Logo" className="h-12 w-auto" />
                    <div className="flex flex-col text-white text-sm leading-tight">
                        <span>สภาผู้แทนนิสิต องค์การนิสิต</span>
                        <span>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</span>
                    </div>
                </div>
                <button onClick={() => setIsOpen(true)} className="text-[#153A57]">
                    <Icon icon="ei:navicon" width="32" height="32" />
                </button>
            </div>

            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-full bg-[#db9717] z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <Icon className="text-[#153A57]" icon="mdi:close" width="32" height="32" />
                    </button>
                </div>
                <div className="flex flex-col items-center mt-10 ml-5 mr-5 text-white text-sm font-semibold">
                    <Link className="border-b border-[#153A57] mb-5 pb-2 w-full hover:text-[#153A57]" href="" onClick={() => setIsOpen(false)}>หน้าหลัก</Link>
                    <Link className="border-b border-[#153A57] mb-5 pb-2 w-full hover:text-[#153A57]" href="" onClick={() => setIsOpen(false)}>ทำเนียบสภา</Link>
                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="border-b border-[#153A57] mb-5 pb-2 w-full hover:text-[#153A57] flex justify-between"
                    >
                        การทำงาน :
                        <Icon
                            icon="mdi:chevron-down"
                            className={`transition-transform duration-500 ${isDropdownOpen ? "rotate-180" : ""}`}
                            width="20"
                        />
                    </button>

                    {/* เมนูย่อย  */}
                    <div
                        className={`flex flex-col gap-3 text-sm text-white w-full pl-6 overflow-hidden transition-all duration-600 ease-in-out transform 
                            ${isDropdownOpen ? "max-h-40 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
                            }`}
                    >
                        <Link href="/" onClick={() => setIsOpen(false)} className="border-b border-[#153A57] pb-2 w-full hover:text-[#153A57]">
                            กิจกรรม
                        </Link>
                        <Link href="/" onClick={() => setIsOpen(false)} className="border-b border-[#153A57] mb-5 pb-2 w-full hover:text-[#153A57]">
                            การผลักดันปัญหา
                        </Link>
                    </div>
                    <Link className="border-b border-[#153A57] mb-5 pb-2 w-full hover:text-[#153A57]" href="" onClick={() => setIsOpen(false)}>ระเบียบ</Link>
                    <Link className="border-b border-[#153A57] mb-5 pb-2 w-full hover:text-[#153A57]" href="" onClick={() => setIsOpen(false)}>ติดต่อและร้องเรียน</Link>
                </div>
            </div>
        </div>
    );
}
