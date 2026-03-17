'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/categories';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[var(--color-primary-dark)] text-white text-xs py-1">
        <div className="max-w-[1280px] mx-auto px-4 flex justify-between items-center">
          <span>🌤️ אמסטרדם 12°C</span>
          <span>{new Date().toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-3xl font-black text-[var(--color-primary)]">israelis</span>
          <span className="text-3xl font-black text-[var(--color-accent)]">.nl</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            aria-label="חיפוש"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="תפריט"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Category navigation - desktop */}
      <nav className="hidden md:block bg-[var(--color-primary)] text-white" aria-label="ניווט ראשי">
        <div className="max-w-[1280px] mx-auto px-4">
          <ul className="flex gap-1 overflow-x-auto py-0">
            {categories.slice(0, 10).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.id}`}
                  className="block px-3 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {cat.icon} {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Category navigation - mobile scrollable */}
      <nav className="md:hidden bg-[var(--color-primary)] text-white overflow-x-auto" aria-label="ניווט ראשי">
        <ul className="flex gap-0 min-w-max px-2 py-0">
          {categories.slice(0, 8).map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/category/${cat.id}`}
                className="block px-3 py-2 text-xs font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                {cat.icon} {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="max-w-[1280px] mx-auto px-4 py-3">
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.icon} {cat.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  href="/about"
                  className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  אודות
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
