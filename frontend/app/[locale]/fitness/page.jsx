const copy = {
  zh: {
    title: '健身小记',
    body: '这里展示健身小记列表。',
  },
  en: {
    title: 'Fitness',
    body: 'Fitness posts will be listed here.',
  },
}

export default async function FitnessPage({ params }) {
  const { locale } = await params
  const text = copy[locale]

  return (
    <section className="stack">
      <h1 className="page-title">{text.title}</h1>
      <p className="muted">{text.body}</p>
    </section>
  )
}
