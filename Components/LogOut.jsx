'use client'
import React from 'react'
import Button from './Button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/Context/AuthContext'

export default function Logout() {
    const { logout, globalUser } = useAuth();
    const pathname = usePathname()

    if (!globalUser) {
        return null
    }

    if (pathname === '/') {
        return (
            <Link href={'/dashboard'}>
                <Button text="Go to dashboard" />
            </Link>
        )
    }

    return (
        <Button text='Logout' clickHandler={logout} />
    )
}