import { useRouter } from "next/router";

const Sidebar = () => {
    const { pathname } = useRouter();

    return (
      <aside className="bg-gray-700 w-64 min-h-screen p-4">
        <div className="text-white text-xl font-bold mb-4">Sidebar</div>
        <ul>
            <li className={pathname === '/dashboard' ? 'bg-gray-700': ''}>
                <a href="/dashboard" className="text-gray-300 hover:text-white block py-2">Dashboard</a>
            </li>
          <li><a href="/profile" className="text-gray-300 hover:text-white block py-2">Profile</a></li>
          <li><a href="/settings" className="text-gray-300 hover:text-white block py-2">Settings</a></li>
        </ul>
      </aside>
    );
  };
  
  export default Sidebar;
  