import type { SupportArticle } from '../types';

export const supportArticles: SupportArticle[] = [
  {
    id: 'art-01',
    title: 'How to Take a Screenshot on Windows',
    slug: 'how-to-take-screenshot-windows',
    summary: 'A complete walkthrough of how to take a screenshot in Microsoft\'s Windows OS.',
    category: 'Windows',
    tags: ['Microsoft', 'Windows', 'Screenshot'],
    publishedAt: '2024-11-15',
    readingTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=800&q=80',
    content: [
      { type: 'text', body: 'Module resolution errors are among the most frustrating issues in Node.js development. This guide covers the five most common root causes.' },
      { type: 'heading', level: 2, text: '1. Check your package is actually installed' },
      { type: 'code', language: 'bash', code: 'npm install\nnpm ls <package-name>' },
      { type: 'tip', body: 'Always commit your package-lock.json. This prevents version mismatches across environments.' },
    ],
  },
  {
    id: 'art-02',
    title: 'How to Change iPhone Wallpaper',
    slug: 'how-to-change-iphone-wallpaper',
    summary: 'Step-by-step guide to change the wallpaper on an Apple iPhone.',
    category: 'iPhone',
    tags: ['Apple', 'iPhone', 'Smnartphone'],
    publishedAt: '2025-10-02',
    readingTime: 12,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    content: [
      { type: 'text', body: 'A consistent code style prevents entire categories of arguments and bugs. Here\'s how to set it up from scratch.' },
    ],
  },
  {
    id: 'art-03',
    title: 'How to Do a Factory Reset on Android',
    slug: 'how-to-factory-reset-android',
    summary: 'Step-by-step guide to perform a factory reset on an Android device.',
    category: 'Android',
    tags: ['Android', 'Factory Reset', 'Smartphone'],
    publishedAt: '2023-08-20',
    readingTime: 10,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    content: [
      { type: 'text', body: 'useEffect is one of the most powerful — and most misused — hooks in React. Let\'s fix that.' },
    ],
  },
]

export const supportCategories = ['Windows', 'Mac', 'Android', 'iPhone', 'iPad', 'Linux', 'AI', 'Javascript', 'HTML', 'CSS']
