const copy = {
  zh: {
    title: 'CV',
    body: '这里展示个人简历内容。',
  },
  en: {
    title: 'CV',
    body: 'Personal CV content goes here.',
  },
}

export default async function CvPage({ params }) {
  const { locale } = await params
  const text = copy[locale]

  return (
    <section className="stack">
      <h1 className="page-title">{text.title}</h1>
      <p className="muted">{text.body}</p>
    </section>
  )
}
