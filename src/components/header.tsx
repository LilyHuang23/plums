import Link from "next/link";
import Script from "next/script";

import Nav from "./nav";

function Header() {
    return (
        <section className="header min-w-full space-x-40 min-width-full absolute">
            <div className="text-russian-violet text-lg bg-magnolia flex ">
                <h1 className="text-center m-auto h-10 pt-4 text-xl">PLUM</h1>
                <div>
                    <Nav />
                </div>
            </div>
        </section>


        
    )
}

export default Header;