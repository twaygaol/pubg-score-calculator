'use client'; // Pastikan ini ada di bagian atas file

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false, // Set to false if you want to handle redirects manually
      username,
      password,
    });

    if (result?.ok) {
      router.push('/dashboard'); // Redirect after successful login
    } else {
      console.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Sign In
      </button>
    </form>
  );
}
