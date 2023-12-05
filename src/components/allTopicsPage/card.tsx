import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from '/public/images/logo.png'

import React from 'react';

const Card = ({ topicId, topicName }) => {
    return (
        <div className="ml-10 pt-0 pl-10 flex">
            <div className="scale-90 rounded-full text-center border-wisteria border-2 bg-wisteria w-80 h-80">
                <div className="text-lg mt-10">
                    <h1 className="text-3xl py-3 text-menu-white">{topicName}</h1>
                    <Link href={`/topics/${topicId}`} className="pricing-button">Read More </Link>
                </div>
            </div>
        </div>
    )
}
export default Card;
