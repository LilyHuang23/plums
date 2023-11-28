import '@/app/home.css'

import Image from 'next/image'
import Header from '../../components/header'

// import Form from '@/components/homePage/form'

export default function Home() {
  return (
    <main className='homePage w-full'>
        <Header />
        {/* <Form /> */}
    </main>
  )
}
