import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from '/public/images/logo.png'

import React from 'react';

const Card = ({ topicName, createdDate }) => {
    return (

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
