'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation'
import { CiLogin, CiLogout } from 'react-icons/ci';



export default function LogoutButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  

  if (status === 'loading') return <p>Loading...</p>;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    if(pathname === '/dashboard') router.push('/api/auth/signin');
  };

  return session ? (
    <button
      type="button"
      onClick={handleSignOut}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
    <CiLogin/>
      <span className="group-hover:text-gray-700">Login</span>
    </button>
  );
}
