'use client'
import Image from 'next/image'

import SideBar from '../../../components/sidebar';
import Header from '../../../components/header';
import RenderTopic from 'components/topicPage/RenderTopic';

export default function Home() {
  return (
    <main>
      <Header />
      <RenderTopic />
      {/* <SideBar /> */}
    </main>
  )
}

