// parla-frontend/pages/page.tsx
"use client"

import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold mb-6">Welcome to Parla</h1>
      <p className="text-xl mb-8">An AI-powered chat application with real-time messaging and intelligent assistant.</p>

      <div className="flex space-x-4">
        <Link href="/login" className='bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600'>
          Login
        </Link>
        <Link href="/signup" className='bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600'>
          Sign Up
        </Link>
        <Link href="/chat" className='bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-800'>
          Go to Chat
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
