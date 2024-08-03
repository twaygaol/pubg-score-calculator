import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">MyApp</div>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
          </ul>

        </div>
      </nav>
    );
    const logout = () => {
          signOut({ callbackUrl: '/auth/signin' });
      };
  };
  
  export default Navbar;
  