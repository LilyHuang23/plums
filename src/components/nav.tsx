'use client'
import Hamburger from "./hamburger";
import { useState } from "react"

export default function Nav() {


    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }
    return (
        <div>
            <div className="navigation">
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>

                <ul>
                    <li>Home</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </div>

            <style jsx> {`

                .navigation {
                    width: 100%;
                    position: absolute;
                    top: 5px;
                    left: 95%;
                    transition: all 0.4s linear;
                    transform: ${ hamburgerOpen ? 'translateX(-10%)' : 'translateX(0%)'};
                }

                .navigation ul {
                    display: ${hamburgerOpen ? 'inline' : 'none'}; 
                    flex-wrap: wrap;
                    margin: 20 0px;
                    padding: 0 25px;
                }

                .navigation ul li {
                    list-style-type: none;
                    padding-right: 10px;
                }
            
            `}
            </style>
        </div>


        

    )
}

