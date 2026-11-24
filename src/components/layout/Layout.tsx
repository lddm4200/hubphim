import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0e] text-zinc-100">
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};
