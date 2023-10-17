import Image from 'next/image'
import Footer from '../components/footer'
import Header from '@/components/header'
import Hero from '@/components/landingPage/hero'

import Pricing from '@/components/landingPage/pricing'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Pricing />
      {/* <Footer /> */}
    </main>
  )
}
