// import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import CompanyHeader from './CompanyHeader'
import NewRegionalHeader  from './NewRegionalHeader'

// const inter = Inter({ subsets: ['latin'] })
export default function HomeLayout({ children,headerType }) {
    return (
        <>
            <Head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
             
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                {/* <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet"/> */}
               
            </Head>
            <body className="font-lato">
                {
                    headerType && headerType=='company' ? <CompanyHeader /> : headerType == 'newregional' ? <NewRegionalHeader /> : <Header />
                }
               
                
                {children}
                <Footer/>
            </body>
        </>
    )
}