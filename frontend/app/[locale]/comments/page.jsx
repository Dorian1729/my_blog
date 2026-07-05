import CommentForm from './CommentForm'
import CommentList from './CommentList'

const copy = {
  zh: {
    title: '评论区',
    empty: '暂无评论',
  },
  en: {
    title: 'Comments',
    empty: 'No comments yet',
  },
}

export default async function CommentsPage({ params }) {
  const { locale } = await params
  const text = copy[locale]

  return (
    <section className="stack">
      <h1 className="page-title">{text.title}</h1>
      <CommentForm locale={locale} />
      <CommentList emptyText={text.empty} label={text.title} locale={locale} />
    </section>
  )
}
