import React from "react"
import { Fugaz_One } from "next/font/google";
import Calendar from "./Calendar";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({ subsets: ["latin"] , weight: ['400']})

export default function Hero(){
    return (
        <div className="py-4  md:py-10 flex flex-col gap-4 sm:gap-10">
            <h1 className={'text-5xl sm:text-6xl md:text-7xl '+ fugaz.className}><span className="textGradient">Mood Tracker </span>
            helps you track your <span className="textGradient">daily </span>mood!</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-center w-full max-w-[600px] mx-auto">Create your mood record and see how you felt on 
            <span className="font-semibold"> each day of every year.</span></p>

           <CallToAction/>
           <Calendar demo/> 
        </div>
    )
}
