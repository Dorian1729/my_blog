import './globals.css'

export const metadata = {
  title: 'My Blog',
  description: 'Personal blog',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
