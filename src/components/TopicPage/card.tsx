import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from '/public/images/logo.png'



const Card = () => {
    return (
        <div className="shadow-slate-50 rounded-md">
            <Image src="logo.png" alt="Topic" className="rounded-t-md" />
                <div className="padding: 2px 16px;">
                    <h4><b>Topic</b></h4>
                    <p>Create: 10/21/2023</p>
                </div>
        </div>
    )
}
export default Card
