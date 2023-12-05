import './home.css'

import Image from 'next/image'
import Header from '../../components/header'
import Form from '../../components/homePage/form'

// Toast Notifications and Popups
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  return (
    <main className='homePage w-full'>
        <Header />
        <Form />

        <ToastContainer />

    </main>
  )
}
