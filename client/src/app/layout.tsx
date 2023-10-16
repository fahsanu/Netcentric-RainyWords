import './globals.css'
import { Dela_Gothic_One, Poppins } from 'next/font/google'


const delaGothicOne = Dela_Gothic_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-delagothic',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${delaGothicOne.variable} ${poppins.variable}`}>{children}</body>
    </html>
  )
}