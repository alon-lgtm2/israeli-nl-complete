import Image from 'next/image';
import type { Metadata } from 'next';
import { personas } from '@/lib/data';

export const metadata: Metadata = {
  title: 'צוות הכתבים',
  description: 'הכירו את צוות הכתבים של israelis.nl — פרסונות עיתונאיות מבוססות AI, כל אחת עם התמחות וקול ייחודי',
};

export default function TeamPage() {
  const phase1 = personas.filter((p) => p.phase === 1);
  const phase2 = personas.filter((p) => p.phase === 2);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white rounded-xl p-8 md:p-12 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-4">צוות הכתבים של israelis.nl</h1>
        <p className="text-lg md:text-xl text-white/80 max-w-[700px] mx-auto leading-relaxed">
          כל הכתבים באתר הם פרסונות עיתונאיות מבוססות בינה מלאכותית (AI). הם לא מתחזים לבני אדם — הם קולות עריכה דיגיטליים, כל אחד עם התמחות, סגנון וזווית ייחודיים.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 text-sm">
          <svg className="w-5 h-5 text-[var(--color-dot)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>שקיפות מלאה — כי אמון נבנה מגילוי, לא מהסתרה</span>
        </div>
      </div>

      {/* AI Transparency notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <div className="flex gap-3 items-start">
          <div className="bg-amber-100 rounded-full p-2 shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-amber-900 text-lg mb-2">למה AI ולא עיתונאים אנושיים?</h2>
            <p className="text-amber-800 leading-relaxed">
              israelis.nl משרת קהילה של כ-12,000 ישראלים בהולנד — קהל שקטן מדי לכלכל מערכת עיתונאית מסורתית, אבל גדול מספיק כדי שיהיה חייב מקור חדשות בשפתו. טכנולוגיית AI מאפשרת לנו לספק סיקור מקיף, מדויק ועדכני בעלויות שמאפשרות את קיום הפרויקט.
            </p>
            <p className="text-amber-800 leading-relaxed mt-2">
              <strong>כל כתבה עוברת פיקוח עורכים אנושיים</strong> ומקושרת למקורות המקוריים בתקשורת ההולנדית.
            </p>
          </div>
        </div>
      </div>

      {/* Phase 1 reporters */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b-3 border-[var(--color-primary)]">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary-dark)]">מערכת החדשות הפעילה</h2>
          <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full">פעיל</span>
        </div>
        <div className="grid gap-6">
          {phase1.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>
      </section>

      {/* Phase 2 reporters */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b-3 border-[var(--color-text-muted)]">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary-dark)]">מדורים בפיתוח</h2>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">בקרוב</span>
        </div>
        <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
          הפרסונות הבאות נמצאות בשלבי פיתוח ויצטרפו למערכת בהמשך. כל אחת תביא קול ייחודי וכיסוי מתמחה בתחומה.
        </p>
        <div className="grid gap-6">
          {phase2.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} comingSoon />
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white rounded-xl border border-[var(--color-border-light)] p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-[var(--color-primary-dark)] mb-6 pb-3 border-b-3 border-[var(--color-primary)]">
          עקרונות המערכת
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Principle
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="גילוי AI בכל כתבה"
            text="כל כתבה נושאת תווית ברורה: ״נוצר באמצעות AI | בפיקוח עורך״"
          />
          <Principle
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
            title="מקורות בכל כתבה"
            text="כל כתבה כוללת קישורים למקורות המקוריים בתקשורת ההולנדית"
          />
          <Principle
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
            title="שקיפות מלאה"
            text="הפרסונות הן קולות עריכה — לא אנשים מזויפים. השמות הם כותרות עריכה בעברית"
          />
          <Principle
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            title="פיקוח אנושי"
            text="נושאים רגישים — אנטישמיות, מתחים פוליטיים, סכסוכים קהילתיים — תמיד דורשים ביקורת אנושית"
          />
        </div>
      </section>
    </div>
  );
}

function PersonaCard({ persona, comingSoon = false }: { persona: typeof personas[number]; comingSoon?: boolean }) {
  return (
    <div className={`bg-white rounded-xl border border-[var(--color-border-light)] overflow-hidden card-hover ${comingSoon ? 'opacity-85' : ''}`}>
      <div className="flex flex-col md:flex-row">
        {/* Avatar + name section */}
        <div className="bg-gradient-to-b from-[var(--color-bg-tertiary)] to-white p-6 md:w-[220px] flex flex-col items-center justify-center text-center shrink-0">
          <div className="relative mb-3">
            <Image
              src={persona.avatar}
              alt={persona.hebrewName}
              width={100}
              height={100}
              className="rounded-full border-3 border-white shadow-md"
            />
            {comingSoon && (
              <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                בקרוב
              </div>
            )}
          </div>
          <h3 className="text-xl font-extrabold text-[var(--color-primary-dark)]">{persona.hebrewName}</h3>
          {persona.role && (
            <p className="text-sm text-[var(--color-primary-light)] font-medium mt-1">{persona.role}</p>
          )}
          <div className="mt-2 inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            פרסונת AI
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 flex-1">
          <p className="text-[var(--color-text)] leading-relaxed mb-4">{persona.bio}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-3">
              <span className="font-bold text-[var(--color-primary-dark)] block mb-1">תחום כיסוי</span>
              <span className="text-[var(--color-text-secondary)]">{persona.focus}</span>
            </div>
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-3">
              <span className="font-bold text-[var(--color-primary-dark)] block mb-1">סגנון כתיבה</span>
              <span className="text-[var(--color-text-secondary)]">{persona.voice}</span>
            </div>
          </div>

          {persona.signatureHabit && (
            <div className="mt-3 flex items-start gap-2 text-sm bg-amber-50 rounded-lg p-3 border border-amber-100">
              <span className="text-amber-600 font-bold shrink-0">סימן היכר:</span>
              <span className="text-amber-800">{persona.signatureHabit}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Principle({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 items-start p-4 bg-[var(--color-bg-secondary)] rounded-lg">
      <div className="text-[var(--color-primary)] shrink-0 mt-0.5">{icon}</div>
      <div>
        <h3 className="font-bold text-[var(--color-primary-dark)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
