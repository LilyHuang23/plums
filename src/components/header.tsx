'use client'

// import { useTheme } from 'next-themes';
import Image from 'next/image'
import Link from 'next/link';
// import SunIcon from '/public/images/sun.svg'
// import MoonIcon from '/public/images/moon.svg'
import logo from '/public/images/logo.png'
import HamburgerMenu from './hamburger';
import { useEffect, useState } from 'react';

export default function Header() {
    // const { systemTheme, theme, setTheme } = useTheme();
    // const [mounted, setMounted] = useState(false);
    // useEffect(() => {
    //     setMounted(true);
    // }, []);
    
    // const renderThemeChanger = () => {
    //     const currentTheme = theme === 'system' ? systemTheme : theme;
    //     if (currentTheme === 'dark') {
    //         return (
                
    //             <SunIcon className="w-7 h-7"
    //                 role="button"
    //                 onClick={() => setTheme('light')}
    //             />
    //         );
    //     } else {
    //         return (
    //             <MoonIcon className="w-7 h-7"
    //                 role="button"
    //                 onClick={() => setTheme('dark')}
    //             />
    //         );
    //     }
    // };
    
    return (
        <header className="header w-full h-16">
            <Link rel="stylesheet" href="topics"><Image className="logo" src={logo} alt='Logo' width={120} height={120} /></Link>
            <h1 id='header_title'>PLUMS</h1>
            <HamburgerMenu />
        {/* {renderThemeChanger()} */}
        </header>

    )


}