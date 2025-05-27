import type { Metadata } from 'next'
import { Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif'
})

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans'
})

export const metadata: Metadata = {
  title: '채명 & 서현',
  description: '소중한 분들을 초대합니다',
  icons: {
    icon: '/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${notoSans.className} antialiased`}>
        <main className="min-h-screen bg-white text-gray-900">
          {children}
        </main>
      </body>
    </html>
  )
} 