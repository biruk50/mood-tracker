'use client'
import React , {useState} from "react"
import { gradients } from "@/Utils";
import { useAuth } from "@/Context/AuthContext";

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' };
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar(props){
    const { handleSetMood } = props;
    const {globalData} = useAuth();
    
    const currentMonth = now.getMonth();
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth]);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    
    const numericMonth = Object.keys(months).indexOf(selectedMonth);
    const data = globalData?.[selectedYear]?.[numericMonth] || {};

    function handleIncrementMonth(val){
        //value is +1 or -1
        if( numericMonth + val < 0 ){
            setSelectedMonth(monthsArr[11]);
            setSelectedYear(selectedYear - 1);
        }
        else if(numericMonth + val > 11){
            setSelectedMonth(monthsArr[0]);
            setSelectedYear(selectedYear + 1);
        }
        else{
            setSelectedMonth(monthsArr[numericMonth + val]);
        }

    }

    const monthNow = new Date(selectedYear, monthsArr.indexOf(monthsArr[selectedMonth]), 1);
    const firstDayOfMonth = monthNow.getDay();
    const daysInMonth = new Date(selectedYear, monthsArr.indexOf(monthsArr[selectedMonth]) + 1, 0).getDate();
    const daysToDisplay = firstDayOfMonth + daysInMonth;
    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

    return (
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-5 gap-4'>
                <button onClick={() => {
                    handleIncrementMonth(-1)
                }} className='mr-auto text-black-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-left"></i>
                </button>

                <p className={'text-center text-black-400 col-span-3 capitalized whitespace-nowrap'}>{selectedMonth}, {selectedYear}</p>
                <button onClick={() => {
                    handleIncrementMonth(+1)
                }} className='ml-auto text-black-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-right"></i>
                </button>
            </div>
        <div className="flex flex-col overflow-hidden gap-1">
            {...Array(numRows).keys().map((row,rowIndex) => {
                return (
                    <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                            let dayDisplay = dayIndex > daysInMonth ? false : (row ===0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                            let isToday = dayIndex === now.getDate();

                            if (!dayDisplay){
                                return (
                                    <div className='bg-white' key={dayOfWeekIndex} />
                                )
                            }
                            let color= !data  ? 'white' :
                                dayIndex in data ? gradients.green[data[dayIndex]] : 'white';
                                       
                            return (
                                <div style={{ background: color }} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' + (isToday ? ' border-green-400' : ' border-green-100') + (color === 'white' ? ' text-green-500' : ' text-white')} key={dayOfWeekIndex}>
                                        <p>{dayIndex}</p>
                                </div>
                            )
                        })}

                    </div>
                )
            }) }

        </div>
    </div>
    )
}