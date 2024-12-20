import '@/styles/global.css'

export const metadata = {
  title: 'Animated Graph Node',
  description: 'Interactive examples of animated node graphs with different configurations.',
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
