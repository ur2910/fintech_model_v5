import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: "Investing Basics Chatbot for Kids",
  description: "An AI-powered chatbot for answering basic investing questions in a kid-friendly manner. This interface bot was built with the Vercel AI SDK and fine-tuned on Usha's questions.",
  openGraph: {
    title: "Investing Basics Chatbot for Kids",
    description: "An AI-powered chatbot for answering basic investing questions in a kid-friendly manner.",
    url: "https://fintech-model-v2-35rg7a3f7-usha-rajendirans-projects.vercel.app/",
    author: "Usha Rajendiran",
    publishedTime: '2025-03-12T00:00:00.000Z',
    siteName: "Investing Basics Chatbot for Kids",
    images: [
      {
        url: "https://github.com/ur2910/fintech_model_v2/blob/main/app/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "Investing Basics Chatbot for Kids",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
