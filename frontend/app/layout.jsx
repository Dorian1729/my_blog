import './globals.css'

export const metadata = {
  title: 'My Blog',
  description: 'Personal blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
