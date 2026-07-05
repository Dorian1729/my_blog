const copy = {
  zh: {
    title: '照片墙',
    body: '这里展示照片墙。',
  },
  en: {
    title: 'Photos',
    body: 'Photos will be shown here.',
  },
}

export default async function PhotosPage({ params }) {
  const { locale } = await params
  const text = copy[locale]

  return (
    <section className="stack">
      <h1 className="page-title">{text.title}</h1>
      <p className="muted">{text.body}</p>
    </section>
  )
}
