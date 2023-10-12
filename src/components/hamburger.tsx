import { Turn as Hamburger } from 'hamburger-react'
export default function HamburgerMenu() {

    return (
        <div>
            <Hamburger onToggle={toggled => {
                if (toggled) {
                    document.getElementById("menu").style.transform = "translate(-200px, 0px)";
                } else {
                    document.getElementById("menu").style.transform = "translate(400px, 0px)";
                    
                }
                }} />

            <ul id="menu">
                <li>Topics</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>




    )
}