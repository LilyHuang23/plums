import Image from 'next/image'
import Card from '@/components/allTopicsPage/card'
import SideBar from '@/components/sidebar'
import Header from '@/components/header'
export default function Home() {
  return (
    <main>
      <Header />
      <SideBar />
      {/* <Card /> */}
    </main>
  )
}

