export interface ArticleSource {
  name: string;
  url: string;
}

export interface Article {
  title: string;
  slug: string;
  summary: string;
  body: string;
  category: CategoryId;
  persona: string;
  personaAvatar: string;
  date: string;
  updatedAt?: string;
  municipality?: string;
  region?: string;
  tags?: string[];
  imageUrl: string;
  imageAlt: string;
  imageCredit?: string;
  sources: ArticleSource[];
  isBreaking: boolean;
  isFeatured: boolean;
  aiDisclosure: string;
}

export type CategoryId =
  | 'politics'
  | 'housing'
  | 'finance'
  | 'netherlands-israel'
  | 'community'
  | 'municipal'
  | 'business'
  | 'education'
  | 'healthcare'
  | 'transport'
  | 'culture'
  | 'sport'
  | 'weather'
  | 'guide';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
}

export interface Persona {
  id: string;
  name: string;
  hebrewName: string;
  humanName?: string;
  editorialTitle?: string;
  age?: number;
  role?: string;
  focus: string;
  voice: string;
  bio: string;
  avatar: string;
  phase?: number;
  type?: 'news' | 'opinion';
  categories?: string[];
  signatureHabit?: string;
  avatarColors?: string;
  editorNote?: string;
}

export interface Municipality {
  id: string;
  nameHe: string;
  nameNl: string;
  region: string;
}
