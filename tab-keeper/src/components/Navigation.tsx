'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  isAuthenticated?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isAuthenticated = false }) => {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-[var(--gray-200)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl text-[var(--gray-900)]">Tab-Keeper</span>
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex ml-10 space-x-8">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === '/dashboard'
                      ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                      : 'text-[var(--gray-600)] hover:text-[var(--gray-900)]'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/tab"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === '/tab'
                      ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                      : 'text-[var(--gray-600)] hover:text-[var(--gray-900)]'
                  }`}
                >
                  My Tabs
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-[var(--gray-600)] hover:text-[var(--gray-900)] rounded-lg hover:bg-[var(--gray-100)] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="w-8 h-8 bg-[var(--primary-light)] rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-[var(--primary)] font-semibold text-sm">U</span>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 text-sm font-medium text-[var(--gray-700)] hover:text-[var(--gray-900)] transition-colors">
                    Log in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 text-sm font-medium bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
