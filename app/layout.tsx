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
    icon: [
      { url: '/images/favicon.png' },
      { url: '/favicon.ico' }
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className={`${notoSans.className} antialiased`}>
        <main className="min-h-screen bg-white text-gray-900">
          {children}
        </main>
      </body>
    </html>
  )
} 