import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function AdminLayout({ children,props }) {
    return (
        <body className={inter.className} data-sidebar="dark">
            <div {...props}>{children}</div>
        </body>
    )
}