'use client'

import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
        <p className="mb-8">Your one-stop solution for team management and brackets.</p>
        <button 
          onClick={() => signIn()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
