import './globals.css'

export const metadata = {
  title: 'Dorian\'s Blog',
  description: 'Dorian\'s personal blog',
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
