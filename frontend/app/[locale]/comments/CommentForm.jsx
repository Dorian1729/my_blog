'use client'

import { useState } from 'react'

const copy = {
  zh: {
    name: '用户名',
    content: '内容',
    submit: '提交',
    submitting: '提交中',
    success: '已提交，等待审核',
    error: '提交失败，请稍后再试',
  },
  en: {
    name: 'Name',
    content: 'Comment',
    submit: 'Submit',
    submitting: 'Submitting',
    success: 'Submitted for review',
    error: 'Could not submit. Try again later.',
  },
}

export default function CommentForm({ locale }) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const text = copy[locale]

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: formData.get('author_name'),
          content: formData.get('content'),
        }),
      })

      if (!response.ok) {
        throw new Error('submit failed')
      }

      form.reset()
      setMessage(text.success)
    } catch {
      setMessage(text.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="field">
        {text.name}
        <input className="input" type="text" name="author_name" required maxLength="80" />
      </label>

      <label className="field">
        {text.content}
        <textarea className="input input-content" name="content" required maxLength="5000" />
      </label>

      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? text.submitting : text.submit}
      </button>

      {message ? <p className="muted">{message}</p> : null}
    </form>
  )
}
