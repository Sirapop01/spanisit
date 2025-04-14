'use client'

import { useRouter } from 'next/navigation'
import { useUserAuth } from '@/context/UserAuthContext'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const { user } = useUserAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.replace('/admin/login')
    } else {
      setIsLoading(false)
    }
  }, [user, router])
  
  return children
}