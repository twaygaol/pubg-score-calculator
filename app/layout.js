'use client'; // Ini memastikan bahwa komponen ini adalah Client Component

import { SessionProvider } from 'next-auth/react';
import './globals.css'; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
