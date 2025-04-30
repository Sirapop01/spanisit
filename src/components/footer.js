import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/images/spa_logo.png";
import { Icon } from "@iconify/react";


export default function Footer() {
    return (
        <div>
            <div className="hidden md:flex md:flex-col items-center justify-center bg-secondary h-72  text-white items-center">
                <div>
                    <div className="flex gap-5 border-b border-white text-white text-md py-2">
                        <Link href="https://ms.src.ku.ac.th" className="hover:text-primary" target="_blank" rel="noopener noreferrer">คณะวิทยาการจัดการ</Link>
                        <Link href="https://ims.src.ku.ac.th/2020/th/" className="hover:text-primary" target="_blank" rel="noopener noreferrer">คณะพาณิชยนาวีนานาชาติ</Link>
                        <Link href="https://www.eng.src.ku.ac.th/th/" className="hover:text-primary" target="_blank" rel="noopener noreferrer">คณะวิศกรรมศาสตร์ ศรีราชา</Link>
                        <Link href="https://sci.src.ku.ac.th" className="hover:text-primary" target="_blank" rel="noopener noreferrer">คณะวิทยาศาสตร์ ศรีราชา</Link>
                        <Link href="https://econ.src.ku.ac.th/" className="hover:text-primary" target="_blank" rel="noopener noreferrer">คณะเศรษฐศาสตร์ ศรีราชา</Link>
                    </div>
                    <div className="grid grid-cols-12 mt-4 items-center">
                        <div className="col-span-6 flex gap-2 text-sm items-center">
                            <Image src={Logo} alt="Logo" className="h-16 w-auto" />
                            <div className="flex flex-col text-white text-sm">
                                <span>สภาผู้แทนนิสิต องค์การนิสิต</span>
                                <span>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</span>
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col text-sm">
                            <span>ชั้น 2 อาคารศูนย์กิจกรรม (อาคาร 9)</span>
                            <span>199 หมู่ที่ 6 ถนนสุขุมวิท ตำบลทุ่งสุขลา อำเภอศรีราชา ชลบุรี 20230</span>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-4 text-md items-center justify-center">
                        <Link href="https://www.facebook.com/spanisit.ku.src" target="_blank" rel="noopener noreferrer">
                            <Icon icon="mdi:facebook" className="text-white hover:text-primary hover:scale-125 " width="36" />
                        </Link>
                        <Link href="https://www.instagram.com/spanisit.ku.src/" target="_blank" rel="noopener noreferrer">
                            <Icon icon="mdi:instagram" className="text-white hover:text-primary hover:scale-125" width="36" />
                        </Link>
                        <Link href="https://x.com/spanisit_kusrc" target="_blank" rel="noopener noreferrer">
                            <Icon icon="ri:twitter-x-line" className="text-white hover:text-primary hover:scale-125" width="36" />
                        </Link>
                        <Link href="https://line.me/R/ti/p/@459wzngs?ref=website_button" target="_blank" rel="noopener noreferrer">
                            <Icon icon="simple-icons:line" className="text-white hover:text-primary hover:scale-125" width="36" />
                        </Link>
                        <Link href="https://www.tiktok.com/@spanisit.ku.src" target="_blank" rel="noopener noreferrer">
                            <Icon icon="simple-icons:tiktok" className="text-white hover:text-primary hover:scale-125" width="36" />

                        </Link>
                    </div>
                </div>


            </div>
            <div className="flex md:hidden flex-col items-center justify-center bg-secondary text-white py-6 px-4">
                <div className="flex flex-col items-center px-4">
                    <div className="flex flex-col justify-center gap-3 mb-4 text-sm w-full max-w-md text-md">
                        <Link href="https://ms.src.ku.ac.th" className="hover:text-primary border-b border-white pb-1 text-center">คณะวิทยาการจัดการ</Link>
                        <Link href="https://ims.src.ku.ac.th/2020/th/" className="hover:text-primary border-b border-white pb-1 text-center">คณะพาณิชยนาวีนานาชาติ</Link>
                        <Link href="https://www.eng.src.ku.ac.th/th/" className="hover:text-primary border-b border-white pb-1 text-center">คณะวิศกรรมศาสตร์ ศรีราชา</Link>
                        <Link href="https://sci.src.ku.ac.th" className="hover:text-primary border-b border-white pb-1 text-center">คณะวิทยาศาสตร์ ศรีราชา</Link>
                        <Link href="https://econ.src.ku.ac.th/" className="hover:text-primary border-b border-white pb-1 text-center">คณะเศรษฐศาสตร์ ศรีราชา</Link>
                    </div>

                    <div className="text-sm text-center mb-4 w-full max-w-md">
                        <p className="mt-2 pt-2">
                            ชั้น 2 อาคารศูนย์กิจกรรม (อาคาร 9) 199 หมู่ที่ 6 ถนนสุขุมวิท ตำบลทุ่งสุขลา อำเภอศรีราชา ชลบุรี 20230
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link href="https://www.facebook.com/spanisit.ku.src"><Icon icon="mdi:facebook" className="text-white hover:text-primary hover:scale-125" width="28" /></Link>
                    <Link href="https://www.instagram.com/spanisit.ku.src/"><Icon icon="mdi:instagram" className="text-white hover:text-primary hover:scale-125" width="28" /></Link>
                    <Link href="https://x.com/spanisit_kusrc"><Icon icon="ri:twitter-x-line" className="text-white hover:text-primary hover:scale-125" width="28" /></Link>
                    <Link href="https://line.me/R/ti/p/@459wzngs?ref=website_button"><Icon icon="simple-icons:line" className="text-white hover:text-primary hover:scale-125" width="28" /></Link>
                    <Link href="https://www.tiktok.com/@spanisit.ku.src"><Icon icon="simple-icons:tiktok" className="text-white hover:text-primary hover:scale-125" width="28" /></Link>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-secondary text-white py-2 z-50">
                <div className="text-center text-sm">© 2025 StudentCouncil KU SRC</div>
            </div>
        </div>
    )
}