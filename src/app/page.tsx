import Image from 'next/image'
import Footer from '../components/footer'
import Header from '@/components/header'


import Pricing from '@/components/landingPage/pricing'

export default function Home() {
  return (
    <main>
      <Header />
      <Pricing />
      {/* <Footer /> */}
    </main>
  )
}
