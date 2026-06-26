function BackgroundContainer({ children }) {
  return <main className="page">{children}</main>
}

function CenteredForm() {
  return (
    <form className="form">
      <h1 className="form-title">登录</h1>

      <label className="field">
        邮箱
        <input className="input" type="email" name="email" />
      </label>

      <label className="field">
        密码
        <input className="input" type="password" name="password" />
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
