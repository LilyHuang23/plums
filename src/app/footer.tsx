import Link from 'next/link';
import Image from 'next/image'

import mypic from '/Users/huanglily/Desktop/Plums/plums/public/images/fb.png'



const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className={"dark:bg-violet-500 dark:text-white bg-slate-100 text-black"}>
            <Link href={"#"}>Page</Link>
            <Link href={"#"}>Page</Link>
            <Link  href={"Home"} >PLUMS</Link>
            <Link href={"#"}>Page</Link>
            <Link href={"#"}>Page</Link>

            <hr></hr>
            <ul>
                <li><Link href="/"><Image src={mypic} alt='Facebook icon' width={150} height={150} /></Link></li>
                <li><Link href="/"><Image src="/public/images/ig.png" alt='Instagram icon' width={150} height={150} /></Link></li>
                <li><Link href="/"><Image src="/public/images/linkedin.png" alt='Linkedin icon' width={150} height={150} /></Link></li>
                <li><Link href="/"><Image src="#" alt='Logo' width={200} height={200} /></Link></li>
                <li><Link href="/"><Image src="/public/images/pinterest.png" alt='Pinterest icon' width={150} height={150} /></Link></li>
                <li><Link href="/"><Image src="/public/images/x.png" alt='X(Twitter) icon' width={150} height={150} /></Link></li>
                <li><Link href="/"><Image src="/public/images/youtube.png" alt='Youtube icon' width={150} height={150} /></Link></li>
                
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