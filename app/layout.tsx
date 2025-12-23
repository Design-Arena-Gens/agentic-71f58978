import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Light Collector - A Pixar-Style Short',
  description: 'A heartwarming, non-verbal story about a lonely robot finding connection by sharing its light.',
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
