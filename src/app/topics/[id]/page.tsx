'use client'
import Image from 'next/image'

import SideBar from '../../../components/sidebar';
import Header from '../../../components/header';
import RenderTopic from '../../../components/topicPage/RenderTopic';
import UpdateForm from "../../../components/topicPage/updateForm";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <main>
      <Header />
      <RenderTopic />
      <ToastContainer />
      {/* <SideBar /> */}
    </main>
  )
}

