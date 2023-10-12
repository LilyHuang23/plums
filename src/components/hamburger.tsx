'use client'
import { Turn as Hamburger } from 'hamburger-react'
export default function HamburgerMenu() {

    return (
        <div>
            <Hamburger onToggle={toggled => {
                if (toggled) {
                    document.getElementById("menu").style.transform = "translate(-100px, 0px)";
                    document.getElementById("menu").style.display = "inline-block";
                } else {
                    document.getElementById("menu").style.transform = "translate(0px, 0px)";
                    document.getElementById("menu").style.display = "none";
                    
                }
                }} />

            <ul id="menu">
                <li>Topics</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>

            <style jsx>
                {`
                    #menu {
                        display: none;
                        position: absolute;
                        top: 4rem;
                    }
                `}
            </style>
        </div>




    )
}