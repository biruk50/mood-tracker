import React from "react"
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"] , weight: ['400']})

export default function Button(props){
    const {text ,dark, clickHandler } = props;
    return (
        <button onClick={clickHandler} className={'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-green-600 ' + (dark? 'text-white bg-green-600' : 'text-green-600 ')}>
            <p className={'px-6 sm:px-10 whitespace-nowrap py-2 ' + fugaz.className}>{text}</p>
        </button>
    )
}