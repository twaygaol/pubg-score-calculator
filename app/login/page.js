import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <p className="text-center mb-6">Sign in to access your dashboard.</p>
        <button
          onClick={() => signIn('google')} // Ubah sesuai provider jika perlu
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
