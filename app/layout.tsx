import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Awaken - Climate Action for Everyone',
  description: 'Culturally-adapted climate action platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
