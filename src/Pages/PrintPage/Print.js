import React, {useEffect, useState} from 'react';
import s from "../MainPage/MainComponents/mainComponents.module.css";
import DateFilter from "../../components/DataPicker/DataPicker";
import {getUsers, hash, PrintQr} from "../../store/slices/userSlice";
import Qr from "../../QR/Qr";
import {useDispatch, useSelector} from "react-redux";

const Print = () => {
    const [arr, setArr] = useState([])
    const [open , setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const d = new Date()
    const items = useSelector( store => store.userReducer.users);
    const dispatch = useDispatch()
    const [date ,setDate] = useState({from: d.setMonth(d.getMonth() - 1), to: new Date()})


    const print = () => {
        window.print();
        if (!arr.length) {
            dispatch(PrintQr(items.map((item) => item.hash)))
        } else dispatch(PrintQr(arr))

        dispatch(getUsers({limit: 9999999, archived: false}))
    }
    const rep = () => {
        dispatch(getUsers({limit:9999999,  archived: false}))
    }

    const norepet = (event) => {
        dispatch(getUsers({print:event.target.value,limit:9999999,  archived: false}))
    }

    const handleHuiClick = ({ hash }) => {
        const index = arr.indexOf(hash);
        console.log(arr, "dawddawd")
        if (index >= 0) {
            setArr((prev) => {
                prev.splice(index, 1);
                return prev;
            });
            return;
        }
        setArr((prev) => {
            return [...prev, hash]
        });

    };

    useEffect(() => {
        dispatch(getUsers({limit:9999999,  archived: false}))
    }, []);
    return (
        <div>
            <div className={s.data}>
                <DateFilter  date={date} setDate={({ from, to }) => {
                    setDate({ from, to });
                    dispatch( ( getUsers({limit:9999999,  createDateStart: from, createDateEnd: to }) ) );
                }}/>

                    <div style={{display:"flex", position:"relative", right:88, top:1}}>
                    <form className={s.pagination} onChange={norepet} >
                        <select style={{padding:"0 25px",fontSize:16,}}   name="city" id="city-select">
                            <option style={{fontSize:16,}} value="">-- Фильтр --</option>
                            <option style={{fontSize:16,}} value="true">Распечатанные</option>
                            <option style={{fontSize:16,}} value="false">Не распечатанные</option>
                        </select>
                    </form>
                    <button style={{ fontSize:16, padding:5, }} className={s.pagination}  onClick={rep}>Сброс</button>
                    </div>
                <div style={{display:"flex", flexDirection:"column", gap:12, position:"relative",top:15,}}>
                <button style={{ fontSize:16, padding:12, }} className={s.bth} onClick={print}>Печать</button>
                </div>
            </div>


                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

                    <div   className={s.active__print} >
                    {items.map((item) => (
                        <>
                            <div className={ arr.includes(item.hash) || !arr.length ? `${s.printt} ${s.print__active}` : `${s.printt} `}>
                                <div onClick={() => handleHuiClick(item)} style={{margin:"30px 20px 0 0"}}>
                                    <div >
                                    <Qr hash={item.hash} onClick={(isActive, setIsActive) => {
                                        setIsActive(!isActive)
                                    }}/>
                                    <p style={{textAlign:"center", padding:0, margin:0}}>{item.hash}</p>
                                    <p className={s.checkbox} style={{textAlign:"center", padding:0, margin:0}}>
                                   {item.print ?  <p>Распечатан</p> : <p> Не распечатан</p>}
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                </div>
        </div>
    );
};

export default Print;