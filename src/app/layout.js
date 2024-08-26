import localFont from "next/font/local"
import { Inter } from "next/font/google"
import "./globals.css"

const myFont = localFont({
  src: "./fonts/Switzer-Regular.otf",
  display: "swap",
  variable: "--font-switzer",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${myFont.variable} ${inter.className} w-9/12 m-auto min-h-screen `}
      >
        {children}
      </body>
    </html>
  )
}