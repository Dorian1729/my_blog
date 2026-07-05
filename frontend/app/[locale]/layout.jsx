import { notFound } from 'next/navigation'

import Background from '../../components/Background'
import Header from '../../components/Header'
import PageShell from '../../components/PageShell'

const labels = {
  zh: {
    cv: 'CV',
    fitness: '健身训练表',
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
  return (
    <Background>
      <Header locale={locale} labels={copy} />
      <PageShell>{children}</PageShell>
    </Background>
  )
}
