import Link from 'next/link'
import { notFound } from 'next/navigation'

const labels = {
  zh: {
    cv: 'CV',
    fitness: '健身小记',
    photos: '照片墙',
    comments: '评论区',
    switchLocale: 'English',
  },
  en: {
    cv: 'CV',
    fitness: 'Fitness',
    photos: 'Photos',
    comments: 'Comments',
    switchLocale: '中文',
  },
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  if (!labels[locale]) {
    notFound()
  }

  const copy = labels[locale]
  const otherLocale = locale === 'zh' ? 'en' : 'zh'

  return (
    <main className="shell">
      <nav className="nav" aria-label="Main">
        <Link href={`/${locale}/cv`}>{copy.cv}</Link>
        <Link href={`/${locale}/fitness`}>{copy.fitness}</Link>
        <Link href={`/${locale}/photos`}>{copy.photos}</Link>
        <Link href={`/${locale}/comments`}>{copy.comments}</Link>
        <Link href={`/${otherLocale}/cv`}>{copy.switchLocale}</Link>
      </nav>
      {children}
    </main>
  )
}
