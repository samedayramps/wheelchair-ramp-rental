import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wheelchair Ramp Rental',
  description: 'Manage your wheelchair ramp rentals efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              Wheelchair Ramp Rental
            </Link>
            <div className="space-x-4">
              <NavLink href="/customers">Customers</NavLink>
              <NavLink href="/jobs">Jobs</NavLink>
              <NavLink href="/inventory">Inventory</NavLink>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white hover:text-blue-200">
      {children}
    </Link>
  )
}