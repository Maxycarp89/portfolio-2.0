import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

const courierPrime = Courier_Prime({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-courier-prime'
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Design & software Developer - Fullstack Developer Portfolio',
  generator: 'Maximiliano Costilla',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-light-40x40.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon-light-32x32.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${courierPrime.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
