import React, {useEffect, useState} from 'react';
import s from "../MainPage/MainComponents/mainComponents.module.css";
import DateFilter from "../../components/DataPicker/DataPicker";
import {getUsers, PrintQr} from "../../store/slices/userSlice";
import Qr from "../../QR/Qr";
import {useDispatch, useSelector} from "react-redux";

const Print = () => {

    const d = new Date()
    const items = useSelector( store => store.userReducer.users);

    const dispatch = useDispatch()
    const [date ,setDate] = useState({from: d.setMonth(d.getMonth() - 1), to: new Date()})

    const print = () => {
        window.print();
        dispatch(PrintQr(items.map((hui) => hui.hash)))
        dispatch(getUsers({limit:9999999,  archived: false}))

    }
    useEffect(() => {
        dispatch(getUsers({limit:9999999,  archived: false}))
    }, []);
    return (
        <div>
            <div>
                <div className={s.print}>
                    <DateFilter  date={date} setDate={({ from, to }) => {
                        setDate({ from, to });
                        dispatch( ( getUsers({limit:9999999,  createDateStart: from, createDateEnd: to }) ) );
                    }}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <button className={s.bth} onClick={print}>Печатать QR-Code</button>
                <div className={s.active__print} >
                    {items.map((item) => (
                        <>
                            <div>
                                <div style={{margin:10}}>
                                    <Qr hash={item.hash}/>

                                    <p style={{textAlign:"center", padding:0, margin:0}}>{item.hash}</p>
                                    <p style={{textAlign:"center", padding:0, margin:0}}>
                                   {item.print ?  <p>Распечатан</p> : <p> Не распечатан</p>}
                                    </p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Print;