'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/favorites', label: 'Favoritos' },
  { href: '/cart', label: 'Carrito' },
  { href: '/profile', label: 'Perfil' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="w-full bg-zinc-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-500">FirePlay</Link>
        <ul className="flex gap-4 items-center">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-blue-400 transition ${
                  pathname === href ? 'text-blue-500 font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="ml-4 text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-4 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
