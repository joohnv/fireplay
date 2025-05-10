'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PerfilPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <p>Correo: {user.email}</p>
      <p>ID: {user.uid}</p>
    </div>
  );
}
