'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation'

export default function MemberPage() {
    const router = useRouter()

    const handleManageUsers = () => {
        router.push('/admin/member/add')
      };


    const members = [
      { id: 1, name: 'Somchai', position: 'President' },
      { id: 2, name: 'Suda', position: 'Vice President' },
      { id: 3, name: 'Anan', position: 'Secretary' },
    ];
  
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">สมาชิกสภาผู้แทนนิสิต</h1>
  
        <button onClick={handleManageUsers} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition mb-6">
          เพิ่มสมาชิกสภา
        </button>
  
        <ul className="space-y-2">
          {members.map(member => (
            <li
              key={member.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow transition"
            >
              <strong className="text-lg">{member.name}</strong>
              <span className="block text-gray-600">{member.position}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  