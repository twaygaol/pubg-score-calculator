'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function BracketPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>You are not signed in. Please <Link href="/">sign in</Link>.</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold">Bracket</h1>
        <Link href="/dashboard">
          <h1 className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-700">Back to Dashboard</
          h1>
        </Link>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-full p-8">
        <h2 className="text-2xl font-bold mb-4">Bracket Page</h2>
        {/* Konten bracket */}
      </main>
    </div>
  );
}
