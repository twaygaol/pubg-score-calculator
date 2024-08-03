import SignInForm from '@/components/SignInForm';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}
