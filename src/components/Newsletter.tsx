'use client';

import { useState, FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    alert('תודה על ההרשמה!');
    setEmail('');
  };

  return (
    <section
      className="rounded-2xl px-6 py-10 md:px-12 md:py-14"
      style={{ background: 'linear-gradient(135deg, #1a3a6c 0%, #2a5298 100%)' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Text content */}
        <div className="flex-1 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-[#e8882f]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-white/90 text-sm font-medium">ניוזלטר שבועי</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            הישארו מעודכנים
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md md:max-w-none mx-auto">
            הרשמו לניוזלטר השבועי שלנו וקבלו את החדשות החשובות ביותר ישירות למייל
          </p>
        </div>

        {/* Form */}
        <div className="w-full md:w-auto md:min-w-[340px]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="כתובת אימייל"
                dir="rtl"
                className="flex-1 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-400
                           bg-white border-2 border-transparent focus:border-[#e8882f]
                           focus:outline-none transition-colors text-base"
              />
              <button
                type="submit"
                className="rounded-xl px-8 py-3.5 font-bold text-white text-base
                           bg-[#e8882f] hover:bg-[#d47826] active:scale-[0.97]
                           transition-all duration-150 whitespace-nowrap
                           shadow-lg shadow-orange-900/30"
              >
                הרשמה
              </button>
            </div>
          </form>

          <p className="text-white/50 text-xs mt-3 text-center md:text-right">
            לא נשלח ספאם. ניתן לבטל בכל עת.
          </p>
        </div>
      </div>
    </section>
  );
}
