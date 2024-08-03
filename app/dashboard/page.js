'use client'; // Ini memastikan bahwa komponen ini adalah Client Component

import { useSession, signOut } from 'next-auth/react';
import SignInForm from '../login/page';
import Link from 'next/link';

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
       <SignInForm />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/dashboard/team" className="hover:text-blue-300">
                Teams
              </Link>
            </li>
            <li>
              <Link href="/dashboard/bracket" className="hover:text-blue-300">
                Brackets
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={() => signOut()}
          className="mt-6 w-full bg-red-500 p-2 rounded text-white hover:bg-red-600"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Welcome, {session.user.name}!</h1>
        </header>
        <section className="bg-white p-6 rounded shadow">
          {/* Konten halaman */}
          <p>Your content goes here.</p>
        </section>
      </main>
    </div>
  );

};

export default Dashboard;
