import { Fade as Hamburger } from 'hamburger-react'
import Link from 'next/link';



// https://www.freecodecamp.org/news/dynamic-navigation-in-nextjs/

export default function HamburgerMenu() {

    return (
        <div>
            <Hamburger onToggle={toggled => {
                if (toggled) {
                    document.getElementById("menu")!.style.transform = "translate(-200px, 0px)";
                } else {
                    document.getElementById("menu")!.style.transform = "translate(400px, 0px)";   
                }
                }} />

            <ul id="menu">

                <li><Link href="/topics">Topics</Link></li>
                <li><Link href="/home">Home</Link></li>
                <li><Link href="/settings">Settings</Link></li>
                <li><Link href="/logout">Logout</Link></li>

            </ul>
        </div>




    )
}

