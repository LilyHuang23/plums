import Image from 'next/image'

import Card from '../../components/allTopicsPage/card';
import SideBar from '../../components/sidebar';
import Header from '../../components/header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagForm from 'components/tagsPage/TagForm';

export default function TagsPage() {
  return (
    <main>
      <Header />
      <TagForm />
      <h1>Add Tags:</h1>
    </main>
  )
}

