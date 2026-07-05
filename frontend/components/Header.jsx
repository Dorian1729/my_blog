'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  ['cv', 'cv'],
  ['fitness', 'fitness'],
  ['photos', 'photos'],
  ['comments', 'comments'],
]

export default function Header({ locale, labels }) {
  const pathname = usePathname()
  const otherLocale = locale === 'zh' ? 'en' : 'zh'

  return (
    <header className="site-header">
      <Link className="brand" href={`/${locale}/cv`}>
        <Image src="/logo.svg" alt="" width={32} height={32} priority />
        <span>Dorian&apos;s Blog</span>
      </Link>

      <nav className="site-nav" aria-label="Main">
        {navItems.map(([key, route]) => {
          const href = `/${locale}/${route}`
          return (
            <Link
              aria-current={pathname === href ? 'page' : undefined}
              href={href}
              key={key}
            >
              {labels[key]}
            </Link>
          )
        })}
        <Link href={`/${otherLocale}/cv`}>{labels.switchLocale}</Link>
      </nav>
    </header>
  )
}
