'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/categories';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-[#0a1929] text-gray-300 text-xs py-1">
        <div className="max-w-[1280px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>{new Date().toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">אמסטרדם 12°C</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/team" className="hover:text-white transition-colors">צוות הכתבים</Link>
            <span>|</span>
            <Link href="/about" className="hover:text-white transition-colors">אודות</Link>
            <span>|</span>
            <Link href="/about#contact" className="hover:text-white transition-colors">צור קשר</Link>
          </div>
        </div>
      </div>

      {/* Masthead - Times of Israel inspired */}
      <div className="bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-0" dir="ltr" style={{ fontFamily: 'var(--font-logo)' }}>
            <span className="text-4xl md:text-5xl font-bold tracking-tight">israelis</span>
            <span className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-dot)]">.</span>
            <span className="text-4xl md:text-5xl font-bold tracking-tight">nl</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#newsletter"
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-bold px-4 py-2 rounded transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              ניוזלטר
            </Link>
            <button aria-label="חיפוש" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button aria-label="חיפוש" className="p-2 hover:bg-white/10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              className="p-2 hover:bg-white/10 rounded-full"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="תפריט"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category navigation - desktop (ToI style white bar) */}
      <nav className="hidden md:block bg-white border-b border-[var(--color-border)] shadow-sm" aria-label="ניווט ראשי">
        <div className="max-w-[1280px] mx-auto px-4">
          <ul className="flex gap-0 overflow-x-auto">
            {categories.slice(0, 12).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.id}`}
                  className="block px-3 py-2.5 text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-[var(--color-primary)]"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Category navigation - mobile scrollable */}
      <nav className="md:hidden bg-white border-b border-[var(--color-border)] overflow-x-auto shadow-sm" aria-label="ניווט ראשי">
        <ul className="flex gap-0 min-w-max px-2">
          {categories.slice(0, 10).map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/category/${cat.id}`}
                className="block px-3 py-2 text-xs font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-border)] shadow-lg">
          <nav className="max-w-[1280px] mx-auto px-4 py-3">
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    className="block px-3 py-2 text-sm font-medium hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.icon} {cat.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-[var(--color-border)] pt-2 mt-2">
                <Link
                  href="/about"
                  className="block px-3 py-2 text-sm font-medium hover:bg-[var(--color-bg-tertiary)] rounded-lg"
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
