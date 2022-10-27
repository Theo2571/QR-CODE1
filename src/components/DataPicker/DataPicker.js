import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const DateFilter = ({date,setDate}) => {
    return (
        <div style={{display:"flex", gap:50}}>
            <div className='filter_start'>
                <p style={{textAlign:"center"}}>Дата c</p>
                <DatePicker
                    selected={date.from}
                    onChange={(newDate) => setDate({...date,from: newDate})}
                />
            </div>
            <div className='filter_end'>
                <p style={{textAlign:"center"}}>Дата по</p>
                <DatePicker
                    selected={date.to}
                    onChange={(newDate) => setDate({...date, to: newDate})}
                />
            </div>
        </div>
    );
};

export default DateFilter;