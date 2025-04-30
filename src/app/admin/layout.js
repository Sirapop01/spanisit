'use client'

import { usePathname } from 'next/navigation'
import UserAuthContextProvider from "@/context/UserAuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import ToastNotification from '@/components/ToastNotification';
import Navbar from '@/components/nav_admin';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isPublic = pathname === "/admin/login" || pathname === "/admin/reset-password";
  return (
    <UserAuthContextProvider>
      <div className="min-h-screen bg-gray-100">
        {/* เพิ่ม Navbar หรือ Sidebar ของ Admin */}
        <ToastNotification/>
        {isPublic ? children : <ProtectedRoute><Navbar/>{children}</ProtectedRoute>}
      </div>
    </UserAuthContextProvider>
  );
}

