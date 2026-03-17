import { Category } from '@/types';

export const categories: Category[] = [
  { id: 'politics', label: 'פוליטיקה', icon: '🏠', color: '#1e40af' },
  { id: 'housing', label: 'דיור ונדל"ן', icon: '🏡', color: '#059669' },
  { id: 'finance', label: 'כלכלה ומיסים', icon: '💰', color: '#d97706' },
  { id: 'netherlands-israel', label: 'הולנד-ישראל', icon: '🌐', color: '#7c3aed' },
  { id: 'community', label: 'קהילה', icon: '👥', color: '#db2777' },
  { id: 'municipal', label: 'מוניציפלי', icon: '🏛️', color: '#0891b2' },
  { id: 'business', label: 'עסקים וכלכלה', icon: '💼', color: '#4f46e5' },
  { id: 'education', label: 'חינוך', icon: '🎓', color: '#0d9488' },
  { id: 'healthcare', label: 'בריאות', icon: '🏥', color: '#e11d48' },
  { id: 'transport', label: 'תחבורה ותשתיות', icon: '🚆', color: '#ea580c' },
  { id: 'culture', label: 'תרבות ופנאי', icon: '🎨', color: '#8b5cf6' },
  { id: 'sport', label: 'ספורט', icon: '⚽', color: '#16a34a' },
  { id: 'weather', label: 'מזג אוויר וטבע', icon: '🌦️', color: '#0284c7' },
  { id: 'guide', label: 'מדריך מעשי', icon: '📘', color: '#6366f1' },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
