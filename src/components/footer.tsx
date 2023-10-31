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
        <footer className="bg-amethyst p-5 justify-center">
            <div className="flex justify-center p-5 mx-2.5">
                
            <Link href={"Topic"} className='mx-2.5'>Page</Link>
            <Link href={"Home"} className='mx-2.5'>PLUMS</Link>
            <Link href={"Setting"} className='mx-2.5'>Page</Link>
            
            </div>
            <hr></hr>
            <ul className="flex flex-wrap items-center p-5 text-sm font-medium text-gray-300 sm:mb-0 justify-center">
                <li><Link href="/"><Image src={fb} alt='Facebook icon' width={30} height={30} className='mx-2.5'/></Link></li>
                <li><Link href="/"><Image src={ig} alt='Instagram icon' width='30' height='30' className='mx-2.5'/></Link></li>
                <li><Link href="/"><Image src={linkedIn} alt='Linkedin icon' width={30} height={30} className='mx-2.5'/></Link></li>
                <li><Link href="/"><Image src={logo} alt='Logo' width={100} height={100} /></Link></li>
                <li><Link href="/"><Image src={pinterest} alt='Pinterest icon' width={30} height={30} className='mx-2.5'/></Link></li>
                <li><Link href="/"><Image src={x} alt='X(Twitter) icon' width={30} height={30} className='mx-2.5'/></Link></li>
                <li><Link href="/"><Image src={youtube} alt='Youtube icon' width={30} height={30} className='mx-2.5'/></Link></li>
                
            </ul>
            
            <Link href="/"><image href="#Logo"></image></Link>
            <div className="md:container flex items-center md:justify-center justify-around flex-wrap md:text-[14px] text-[12px] p-5">
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