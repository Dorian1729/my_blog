import CommentForm from './CommentForm'

const copy = {
  zh: '评论区',
  en: 'Comments',
}

export default async function CommentsPage({ params }) {
  const { locale } = await params

  return (
    <section className="stack">
      <h1 className="page-title">{copy[locale]}</h1>
      <CommentForm locale={locale} />
    </section>
  )
}
