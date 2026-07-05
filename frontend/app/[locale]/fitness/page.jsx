const copy = {
  zh: {
    title: '健身训练表',
    body: '健身训练表稍后补充。',
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
