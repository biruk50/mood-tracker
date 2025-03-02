'use client'
import React, {useEffect, useState} from "react";
import { Fugaz_One} from "next/font/google";
import Calendar from "./Calendar";
import { useAuth } from "@/Context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const fugaz = Fugaz_One({ subsets: ["latin"] , weight: ['400']})

export default function Dashboard(){
    const {globalUser, globalData , setGlobalData ,isLoading} = useAuth();
    const [data, setData] = useState({});

    const statuses={
        nums_day:4,
        time_remaining: '13:14:26',
        date: (new Date()).toDateString(),
    }

    const moods = {
        '&*@#$': '😭',
        'Sad': '🥲',
        'Existing': '😶',
        'Good': '😊',
        'Elated': '😍',
      }
    
    function countValues(){

    }
    async function handleSetMood(mood) {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() ;
        const day = now.getDate();


        const newData = {...globalData};
        if (!newData?.[year]) { 
          newData[year] = {}; };

        if (!newData[year]?.[month]) {
          newData[year][month] = {};
        }
        
        newData[year][month][day] = mood;

        setData(newData);
        setGlobalData(newData);
        //update firestore
        const docRef = doc(db, "users", globalUser.uid);
        const response = await setDoc(docRef, {
          [year]:{
            [month]:{
              [day]:mood
            }
          }

        }, {merge:true});//to not overwrite the entire document
          
      } catch (error) {
        console.error(error); 
      }
        
    }
    useEffect(() => {
      if(!globalUser || !globalData) {return};
      setData(globalData);

    }, [globalUser,globalData]);

    
    if(isLoading) {return <Loading/> } 
    
    if(!globalUser) { return <Login/> }

    return (
        <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
        <div className='grid grid-cols-3 bg-green-50 text-green-500 p-4 gap-4 rounded-lg'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className=' flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
              <p className={'text-base sm:text-lg truncate ' + fugaz.className}>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
            </div>
            )
                })}
            </div>
            <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
            How do you <span className='textGradient'>feel</span> today?
            </h4>
             <div className='flex items-stretch flex-wrap gap-4'>
                {Object.keys(moods).map((mood, moodIndex) => {
            return (
                <button onClick= {() => {
                  handleSetMood(moodIndex + 1);// rating starts from 1
                }} 
                className={'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-green-50 hover:bg-green-100 text-center flex flex-col items-center gap-2 flex-1 '} key={moodIndex}>
                <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
                <p className={'text-green-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood}</p>
                </button>
          )
        })}
            </div>
            <Calendar data={data} handleSetMood={handleSetMood}/>
        </div>
        
    )
}
