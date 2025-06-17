'use client'
import React, { useState } from "react"
import { useUserAuth } from "@/context/UserAuthContext";
import { useRouter } from 'next/navigation'
import { Icon } from "@iconify/react";

export default function AdminHome() {
    const router = useRouter();
    const { Logout, user } = useUserAuth();

    const handleLogout = async () => {
        try {
            await Logout();
            router.push('/admin/login');
        } catch (err) {
            console.error(err.message);
        }
    };

    const managementCards = [
        { title: 'ประกาศ', description: 'เพิ่ม ลบ และแก้ไขประกาศทั้งหมด', icon: 'mdi:bullhorn-variant-outline', color: 'text-blue-500', buttonColor: 'bg-blue-500 hover:bg-blue-600', action: () => router.push('/admin/announcements') },
        { title: 'ทำเนียบสภา', description: 'จัดการข้อมูลสมาชิกสภาฯ', icon: 'mdi:account-group-outline', color: 'text-green-500', buttonColor: 'bg-green-500 hover:bg-green-600', action: () => router.push('/admin/member') },
        { title: 'เรื่องร้องเรียน', description: 'ดูและจัดการเรื่องร้องเรียน', icon: 'mdi:file-document-edit-outline', color: 'text-yellow-500', buttonColor: 'bg-yellow-500 hover:bg-yellow-600', action: () => router.push('/admin/complaint') },
        { title: 'โครงการ/กิจกรรม', description: 'จัดการข้อมูลกิจกรรม', icon: 'mdi:calendar-star-outline', color: 'text-purple-500', buttonColor: 'bg-purple-500 hover:bg-purple-600', action: () => router.push('/admin/activities') },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center md:text-left md:flex md:items-center md:justify-between pb-8 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-1">ยินดีต้อนรับ, {user?.email}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-4 md:mt-0">
                        <button onClick={() => router.push('/admin/reset-password')} className="px-4 py-2 text-sm bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                            เปลี่ยนรหัสผ่าน
                        </button>
                        <button onClick={handleLogout} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-colors">
                            ออกจากระบบ
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {managementCards.map((card, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full border-2 ${card.color.replace('text-', 'border-')}`}>
                                    <Icon icon={card.icon} className={`w-8 h-8 ${card.color}`} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">{card.title}</h2>
                            </div>
                            <p className="text-slate-500 my-4 flex-grow">{card.description}</p>
                            <button onClick={card.action} className={`w-full mt-auto px-4 py-2 font-semibold text-white rounded-lg transition-colors cursor-pointer ${card.buttonColor}`}>
                                จัดการ
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}