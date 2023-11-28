'use client'
import Image from 'next/image'
import Link from 'next/link';

import logo from '/public/images/logo.png'
import HamburgerMenu from './hamburger';

export default function Header() {
    return (
        <header className="header w-full h-16">
            <Link rel="stylesheet" href="topics"><Image className="logo" src={logo} alt='Logo' width={120} height={120} /></Link>
            <h1 id='header_title'>PLUMS</h1>
            <HamburgerMenu />
        
        </header>

    )


}