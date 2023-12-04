import Footer from '../components/footer'
import Header from '../components/header'
import Hero from '../components/landingPage/hero'


import './globals.css'

import Pricing from '../components/landingPage/pricing'
import Feature from '../components/landingPage/feature'
export default function Home() {
  return (
  
    <main>
      <Header />
      <Hero />
      <Feature />
      <Pricing />
      <Footer />
    </main>
  )
}
