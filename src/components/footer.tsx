import Link from 'next/link';
import Image from 'next/image'

import fb from '/public/images/fb.png'
import ig from '/public/images/ig.png'
import linkedIn from '/public/images/linkedin.png'
import logo from '/public/images/logo.png'
import pinterest from '/public/images/pinterest.png'
import x from '/public/images/x.png'
import youtube from '/public/images/youtube.png'



const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4 justify-center">
            <div className="justify-center">
            <Link href={"#"}>Page</Link>
            <Link href={"#"}>Page</Link>
            <Link href={"Home"} >PLUMS</Link>
            <Link href={"#"}>Page</Link>
            <Link href={"#"}>Page</Link>
            </div>
            <hr></hr>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 justify-center">
                <li><Link href="/"><Image src={fb} alt='Facebook icon' width={50} height={50} /></Link></li>
                <li><Link href="/"><Image src={ig} alt='Instagram icon' width='50' height='50' /></Link></li>
                <li><Link href="/"><Image src={linkedIn} alt='Linkedin icon' width={50} height={50} /></Link></li>
                <li><Link href="/"><Image src={logo} alt='Logo' width={200} height={200} /></Link></li>
                <li><Link href="/"><Image src={pinterest} alt='Pinterest icon' width={50} height={50} /></Link></li>
                <li><Link href="/"><Image src={x} alt='X(Twitter) icon' width={50} height={50} /></Link></li>
                <li><Link href="/"><Image src={youtube} alt='Youtube icon' width={50} height={50} /></Link></li>
                
            </ul>
            
            <Link href="/"><image href="#Logo"></image></Link>
            <div className="md:container flex items-center md:justify-center justify-around flex-wrap md:text-[14px] text-[12px] py-5">
                <p className="my-0 mr-[10px] md:mr-3">Copyright © {year} PLUMS</p>
                <p>
                    Privacy Policy
                </p>
                <p>
                    Terms and Conditions
                </p>
            </div>
        </footer>
    )
}

export default Footer