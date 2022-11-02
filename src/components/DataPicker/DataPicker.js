import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import s from "../../Pages/MainPage/MainComponents/mainComponents.module.css"

const DateFilter = ({date,setDate}) => {
    return (
        <div style={{display:"flex", alignItems:"flex-start"}}>
            <div className='filter_start'>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                <p className={s.print} style={{textAlign:"center", width:60}}>Дата с</p>
                <DatePicker
                    className={s.print}
                    selected={date.from}
                    onChange={(newDate) => setDate({...date,from: newDate})}
                />
                </div>
            </div>
            <div  className='filter_end'>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                <p className={s.print} style={{textAlign:"center"}}>по</p>
                <DatePicker
                    className={s.print}
                    selected={date.to}
                    onChange={(newDate) => setDate({...date, to: newDate})}
                />
                </div>
            </div>
        </div>
    );
};

export default DateFilter;