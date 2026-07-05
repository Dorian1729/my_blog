'use client'

import { useEffect, useState } from 'react'

const pageSize = 3
const controls = {
  zh: {
    previous: '上一页',
    next: '下一页',
    page: '页',
  },
  en: {
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
  },
}

export default function CommentList({ emptyText, label, locale }) {
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [draftPage, setDraftPage] = useState('1')
  const text = controls[locale]

  function goToPage(nextPage) {
    const pageNumber = Math.min(Math.max(nextPage, 1), pageCount)
    setPage(pageNumber)
    setDraftPage(String(pageNumber))
  }

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
          setPage(1)
          setDraftPage('1')
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

  const pageCount = Math.ceil(comments.length / pageSize)
  const visibleComments = comments.slice((page - 1) * pageSize, page * pageSize)

  return (
    <section className="comment-list" aria-label={label}>
      {visibleComments.length ? (
        <div className="comment-items">
          {visibleComments.map((comment) => (
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

      {pageCount > 1 ? (
        <nav className="comment-pages" aria-label={label}>
          <button
            className="comment-page-button"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            type="button"
          >
            {text.previous}
          </button>
          <label className="comment-page-jump">
            <span>{text.page}</span>
            <input
              max={pageCount}
              min="1"
              onBlur={() => goToPage(Number(draftPage) || page)}
              onChange={(event) => setDraftPage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  goToPage(Number(draftPage) || page)
                }
              }}
              type="number"
              value={draftPage}
            />
            <span>/ {pageCount}</span>
          </label>
          <button
            className="comment-page-button"
            disabled={page === pageCount}
            onClick={() => goToPage(page + 1)}
            type="button"
          >
            {text.next}
          </button>
        </nav>
      ) : null}
    </section>
  )
}
