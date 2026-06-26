function BackgroundContainer({ children }) {
  return <main className="page">{children}</main>
}

function CenteredForm() {
  return (
    <form className="form">
      <h1 className="form-title">评论</h1>

      <label className="field">
        用户名
        <input className="input" type="email" name="email" />
      </label>

      <label className="field">
        内容
        <textarea className="input input-content" name="content" />
      </label>

      <button className="button" type="submit">
        提交
      </button>
    </form>
  )
}

function App() {
  return (
    <BackgroundContainer>
      <CenteredForm />
    </BackgroundContainer>
  )
}

export default App
