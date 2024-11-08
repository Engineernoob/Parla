// parla-frontend/pages/layout.tsx

"use client"

import React from 'react';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">
            <Link href="/" className="hover:text-gray-300">Parla</Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/login" className="hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-300">Sign Up</Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-gray-300">Chat</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Parla. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
