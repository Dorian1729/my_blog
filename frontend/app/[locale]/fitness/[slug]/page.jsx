export default async function FitnessPostPage({ params }) {
  const { slug } = await params

  return (
    <article className="stack">
      <h1 className="page-title">{slug}</h1>
      <p className="muted">Post content will load from the FastAPI backend.</p>
    </article>
  )
}
