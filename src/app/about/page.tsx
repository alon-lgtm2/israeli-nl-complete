import Image from 'next/image';
import type { Metadata } from 'next';
import { personas } from '@/lib/data';

export const metadata: Metadata = {
  title: 'אודות israelis.nl',
  description: 'אודות פורטל החדשות בעברית לקהילה הישראלית בהולנד',
};

export default function AboutPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      <div className="bg-white rounded-lg p-6 md:p-8 border border-[var(--color-border-light)]">
      <h1 className="text-3xl font-black mb-6 text-[var(--color-primary-dark)]">אודות ISRAELIS.NL</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)] pb-2 border-b-3 border-[var(--color-primary)]">מה זה israelis.nl?</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            <strong>israelis.nl</strong> הוא פורטל החדשות בעברית לקהילה הישראלית בהולנד. אנחנו מביאים את החדשות ההולנדיות — פוליטיקה, דיור, קהילה, עירייה ועוד — בעברית, בשפה שלכם ובפרספקטיבה שלכם.
          </p>
          <p>
            הולנד היא בית לכ-12,000 ישראלים. רובם מתמודדים עם אתגר משותף: הגישה לחדשות מקומיות מוגבלת לשפה ההולנדית. israelis.nl נוצר כדי לגשר על הפער הזה — לא תרגום של חדשות ישראליות, אלא חדשות הולנדיות מקוריות בעברית.
          </p>
          <p>
            מאמסטרדם ועד איינדהובן, מהחלטות ממשלתיות ועד אירועים קהילתיים — אנחנו מכסים את מה שמשנה לחיים שלכם בהולנד.
          </p>
        </div>
      </section>

      <section className="mb-10" id="editorial">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)]">איך התוכן נוצר?</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            israelis.nl משתמש בטכנולוגיית בינה מלאכותית (AI) מתקדמת ליצירת תוכן עיתונאי. כל כתבה נכתבת על ידי אחד מהפרסונות העיתונאיות שלנו — דמויות AI ייחודיות, כל אחת עם התמחות ונקודת מבט משלה.
          </p>
          <p>
            <strong>חשוב לנו שתדעו:</strong> כל התוכן באתר עובר פיקוח ועריכה על ידי עורכים אנושיים. אנחנו מחויבים לדיוק, אמינות ושקיפות מלאה.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)]">הצוות העיתונאי שלנו</h2>
        <div className="space-y-6">
          {personas.map((persona) => (
            <div key={persona.id} className="flex gap-4 bg-[var(--color-bg-secondary)] rounded-xl p-5 border border-[var(--color-border-light)]">
              <Image
                src={persona.avatar}
                alt={persona.hebrewName}
                width={80}
                height={80}
                className="rounded-full shrink-0"
              />
              <div>
                <h3 className="text-lg font-bold">{persona.hebrewName}</h3>
                <p className="text-sm text-[var(--color-primary-light)] font-medium mb-2">
                  {persona.focus}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {persona.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10" id="transparency">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)]">שקיפות AI</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            אנחנו מאמינים בשקיפות מלאה לגבי השימוש שלנו בבינה מלאכותית:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>כל כתבה מסומנת בבירור כתוכן שנוצר באמצעות AI</li>
            <li>כל כתבה מציינת את הפרסונה העיתונאית שכתבה אותה</li>
            <li>כל כתבה כוללת קישורים למקורות המקוריים בתקשורת ההולנדית</li>
            <li>עורכים אנושיים מפקחים על כל התוכן לפני פרסום</li>
            <li>אנו מתקנים שגיאות ברגע שהן מתגלות</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)]">האקוסיסטם של israelis.nl</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            israelis.nl הוא חלק ממערכת רחבה יותר של שירותים לקהילה הישראלית בהולנד. הפורטל הוא המרכז החדשותי, ובהמשך נרחיב את השירותים לכלול לוח אירועים, מדריכים מעשיים ועוד.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)]">מדורים</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            האתר מכסה מגוון רחב של נושאים הרלוונטיים לחיים בהולנד:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>פוליטיקה:</strong> חדשות פוליטיות מהפרלמנט ההולנדי והממשלה</li>
            <li><strong>דיור ונדל&quot;ן:</strong> מחירי דירות, פרויקטים חדשים ומדיניות דיור</li>
            <li><strong>הולנד-ישראל:</strong> יחסים דיפלומטיים, אירועים משותפים ושיתופי פעולה</li>
            <li><strong>קהילה:</strong> אירועים קהילתיים, חגים ופעילויות</li>
            <li><strong>ספורט:</strong> ליגת הכדורגל ההולנדית, ספורטאים ישראלים באירופה ואירועי ספורט קהילתיים</li>
            <li><strong>תרבות ופנאי:</strong> תערוכות, פסטיבלים, מוזיקה ואירועים תרבותיים</li>
            <li><strong>מוניציפלי:</strong> חדשות עירוניות מאמסטרדם, אמסטלפין, האג ועוד</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)]">ניוזלטר</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            הירשמו לניוזלטר השבועי שלנו וקבלו סיכום של החדשות החשובות ביותר ישירות לתיבת המייל. הניוזלטר נשלח פעם בשבוע ומכיל את הכתבות המרכזיות, אירועים קרובים ומידע שימושי לחיים בהולנד.
          </p>
        </div>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-extrabold mb-4 text-[var(--color-primary)]">צור קשר</h2>
        <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 border border-[var(--color-border-light)]">
          <p className="text-lg mb-4">
            יש לכם שאלה, הערה או טיפ לכתבה? נשמח לשמוע!
          </p>
          <p className="text-[var(--color-text-secondary)]">
            info@israelis.nl
          </p>
        </div>
      </section>
      </div>{/* end white card */}
    </div>
  );
}
