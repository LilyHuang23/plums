import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import logo from '/public/images/logo.png'

import home from '/public/images/home.png'
import edit from '/public/images/edit.png'
import logout from '/public/images/logout.png'
import setting from '/public/images/settings.png'


const Sidebar = () => {
  return (
    <nav className="h-full w-20 fixed z-[1] bg-[#9B72CF] overflow-x-hidden pt-5 left-0 top-0">
      <li className="list-none inline-block mt-1.5"><a href="#" className="no-underline text-25px text-[#2f184b] block pl-4 pr-2 py-1.5 hover:text-[#f1f1f1]"><Image src={home} alt="home icon" width={30}
      height={30} /></a></li>
      <li className="list-none mt-1.5"><a href="#" className="no-underline text-25px text-[#2f184b] block pl-4 pr-2 py-1.5 hover:text-[#f1f1f1]"><Image src={edit} alt="edit icon" width={30}
      height={30}/></a></li>
      <li className="list-none mt-1.5"><a href="#" className="no-underline text-25px text-[#2f184b] block pl-4 pr-2 py-1.5 hover:text-[#f1f1f1]"><Image src={setting} alt="setting icon" width={30}
      height={30}/></a></li>
      <li className="list-none mt-100 place-self-end"><a href="#" className="no-underline text-25px text-[#2f184b] block pt-32 pl-4 pr-2 py-1.5 hover:text-[#f1f1f1]"><Image src={logout} alt="logout icon" width={30}
      height={30}/></a></li>
 
</nav>
  )
};

export default Sidebar;