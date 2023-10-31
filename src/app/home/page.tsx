
// 'use client'
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
// =======
// import Image from 'next/image'
// import Footer from '@/components/footer'
// import Header from '@/components/header'
// import Hero from '@/components/landingPage/hero'

// import Pricing from '@/components/landingPage/pricing'

// export default function Home() {
//     return (
//       <main>
//         <Header />
//       </main>
//     )
//   }
  
// >>>>>>> main
