import '@/app/home.css'

import Image from 'next/image'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Form from '@/components/homePage/form'

export default function Home() {
  return (
    <main className='homePage w-full'>
        <Header />
        <Form />
        {/* <Footer /> */}
    </main>
  )
}
