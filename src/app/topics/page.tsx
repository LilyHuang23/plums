import Image from 'next/image'

import Card from '../../components/allTopicsPage/card';
import SideBar from '../../components/sidebar';
import Header from '../../components/header';

import AllTopics from '../../components/allTopicsPage/allTopics';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TopicsPage() {
  return (
    <main>
      <Header />
      <SideBar />
      <AllTopics />

      <ToastContainer />
      {/* <Card /> */}
    </main>
  )
}

