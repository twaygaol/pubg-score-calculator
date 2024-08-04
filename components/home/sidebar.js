'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Sidebar = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Tidak menampilkan Sidebar jika tidak ada sesi
  }

  return (
    <div className="w-64 bg-blue-600 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard/team" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Teams
            </Link>
          </li>
          <li>
            <Link href="/dashboard/match" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Match
            </Link>
          </li>
          <li>
            <Link href="/dashboard/bracket" className="block py-2 px-4 hover:bg-blue-700 rounded">
              Brackets
            </Link>
          </li>
        </ul>
      </nav>
      <button 
        onClick={() => signOut()} 
        className="mt-4 py-2 px-4 bg-red-500 rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
