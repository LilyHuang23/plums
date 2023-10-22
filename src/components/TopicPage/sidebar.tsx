import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


const Sidebar = () => {
    return (
        <nav>
            <a href="#user"><i className="far fa-user"></i></a>
            <a href="#home"><i className="far fa-file"></i></a>
            <a href="#setting"><i className="fi fi-sr-settings"></i></a>
            <a href="#fourth"><i className="fi fi-bs-sign-out-alt"></i></a>
        </nav>
    )

}
export default Sidebar
