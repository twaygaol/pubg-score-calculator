'use client'; // Ini memastikan bahwa komponen ini adalah Client Component

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/AuthContext';
import Sidebar from '@/components/home/sidebar';
import './globals.css'; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        <SessionProvider>
          <AuthProvider>
            <Sidebar /> {/* Sidebar Component */}
            <main className="flex-1 p-4">{children}</main> {/* Content Area */}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
