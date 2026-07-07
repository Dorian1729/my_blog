'use client'

import { useEffect, useState } from 'react'

export default function CommentList({ emptyText, label, locale }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    let ignore = false

    async function loadComments() {
      try {
        const response = await fetch('http://localhost:8000/api/comments')
        if (!response.ok) {
          throw new Error('load failed')
        }
        const data = await response.json()
        if (!ignore) {
          setComments(data)
        }
      } catch {
        if (!ignore) {
          setComments([])
        }
      }
    }

    loadComments()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="comment-list" aria-label={label}>
      {comments.length ? (
        <div className="comment-items">
          {comments.map((comment) => (
            <article className="comment-item" key={comment.id}>
              <div className="comment-meta">
                <strong>{comment.author_name}</strong>
                <time dateTime={comment.created_at}>
                  {new Date(comment.created_at).toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US')}
                </time>
              </div>
              <p>{comment.content}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="muted">{emptyText}</p>
      )}
    </section>
  )
}
