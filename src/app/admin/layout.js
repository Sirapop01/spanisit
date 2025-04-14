'use client'

import { usePathname } from 'next/navigation'
import UserAuthContextProvider from "@/context/UserAuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isPublic = pathname === "/admin/login" || pathname === "/admin/reset-password";
  return (
    <UserAuthContextProvider>
      <div className="min-h-screen bg-gray-100">
        {/* เพิ่ม Navbar หรือ Sidebar ของ Admin */}
        {isPublic ? children : <ProtectedRoute>{children}</ProtectedRoute>}
      </div>
    </UserAuthContextProvider>
  );
}
