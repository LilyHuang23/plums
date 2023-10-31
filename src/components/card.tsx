import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from '/public/images/logo.png'



const Card = () => {
    return (
        // <div className="justify-center border-4 rounded-full w-10
        // h-26">
        //     <Image src={logo} alt="Topic" className="rounded-t-md" />
        //         <div className="padding: 2px 16px;">
        //             <h4><b>Topic</b></h4>
        //             <p>Create: 10/21/2023</p>
        //         </div>
        // </div>
        <div className="ml-10 pt-0 pl-10 flex">
            <div className="scale-90 rounded-full text-center border-black border-2 bg-wisteria w-80 h-80">
                <div className="text-lg mt-10">
                    <h1 className="text-3xl py-3 text-menu-white" >Topic Name</h1>

                    <p className="py-3">
                        Created: 10/30/2023
                    </p>
                    <button className="pricing-button">Read More</button>
                </div>
            </div>



            <div className="scale-90 rounded-full text-center border-black border-2 bg-wisteria w-80 h-80">
                <h1 className="text-9xl mt-20 text-menu-white">+</h1>
            </div>
        </div>
    )
}
export default Card
