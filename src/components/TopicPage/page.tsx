import Image from 'next/image'
import Card from '@/components/TopicPage/card'
import SideBar from '@/components/TopicPage/sideBar'


export default function Topic() {
  return (
    <main>
      {/* <Header /> */}
      <SideBar />
      <Card />
      {/* <Footer /> */}
    </main>
  )
}