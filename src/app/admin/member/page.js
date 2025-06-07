'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAvailableYears, getMemberByYrs, deleteMemberById } from '@/services/memberServices'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'

export default function AdminMemberPage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState(null)
  const [availableYears, setAvailableYears] = useState([])
  const [members, setMembers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchYears = async () => {
      Swal.fire({ title: 'กำลังโหลดข้อมูล...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

      const res = await getAvailableYears()
      if (res.success) {
        const sortedYears = res.data.sort((a, b) => b - a) // เรียงจากมากไปน้อย (ปีล่าสุดก่อน)
        setAvailableYears(sortedYears)
        setSelectedYear(sortedYears[0] ?? null)
      } else {
        setError('ไม่สามารถโหลดปีที่มีข้อมูลได้')
      }

      Swal.close()
    }
    fetchYears()
  }, [members])

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedYear) return
      Swal.fire({ title: 'กำลังโหลด...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

      const res = await getMemberByYrs(Number(selectedYear))
      if (res.success) {
        setMembers(res.data)
      } else {
        setError('โหลดข้อมูลสมาชิกไม่สำเร็จ')
      }

      Swal.close()
    }
    fetchMembers()
  }, [selectedYear])

  const handleAddMember = () => {
    router.push(`/admin/member/add`)
  }

  // ไม่มีการแก้ไขสำหรับ handleDeleteMember
  const handleDeleteMember = async (memberId) => {
    const confirmDelete = await Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: "คุณจะลบสมาชิกคนนี้ออกจากระบบ!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก'
    });

    if (confirmDelete.isConfirmed) {
      Swal.fire({ title: 'กำลังลบ...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      const res = await deleteMemberById(memberId);

      if (res.success) {
        setMembers(members.filter((m) => m.id !== memberId));
        Swal.fire('สำเร็จ!', 'สมาชิกถูกลบเรียบร้อยแล้ว', 'success');
      } else {
        Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถลบสมาชิกได้', 'error');
      }

      Swal.close();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-primary">
      <h1 className="text-2xl font-bold">จัดการข้อมูลสมาชิกสภาผู้แทนนิสิต</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <label className="mr-2 font-medium">เลือกปีการศึกษา:</label>
          <select
            value={selectedYear ?? ''}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border px-3 py-2 rounded"
          >
            <option value="" disabled>เลือกปี</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAddMember} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          + เพิ่มสมาชิกสภา
        </button>
      </div>

      {members.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.id} className="bg-white shadow p-4 rounded-lg flex flex-col items-center">
              {m.photoUrl ? (
                <Image
                  src={m.photoUrl}
                  alt={m.name}
                  width={160}
                  height={160}
                  className="object-cover [object-position:center_30%] rounded-full mb-2 shadow-lg border-4 border-white w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                />
              ) : (
                <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center text-white">ไม่มีรูป</div>
              )}
              <div className="mt-3 text-center">
                <p className="font-bold">{m.name}</p>
                <p className="text-sm text-gray-600 inline">{m.position}</p>
              </div>
              <div className='mt-4 flex gap-5 items-center'>
                <Link
                  href={`/admin/member/edit/${m.id}`}
                  className="mt-3 inline-block text-blue-600 hover:underline text-sm"
                >
                  แก้ไขข้อมูล
                </Link>
                <button
                  onClick={() => handleDeleteMember(m.id)}
                  className="mt-3 inline-block text-red-600 hover:underline text-sm cursor-pointer"
                >
                  ลบสมาชิก
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>ยังไม่มีข้อมูลสมาชิกในปีนี้</p>
      )}
    </div>
  )
}
