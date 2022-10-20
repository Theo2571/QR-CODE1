
import React, { useEffect, useState} from 'react';
import telega from "../../assets/ClientPhoto/telegram.png";
import whatsup from "../../assets/ClientPhoto/whatsapp.png";
import s from "../ClientPage/ClientComponents/ClientComponents.module.css";
import {useDispatch} from "react-redux";
import {getUserss} from "../../store/slices/userSlice";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Modall from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Geolocation from "../../MapPage/Geolocation/Geolocation";
// import Home from "../../MapPage/map";



const View = () => {
    const [open , setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currantUser, setCurrantUser] = useState(null)
    const dispatch = useDispatch()
    const {hash} = useParams()
    const [long, setLong] = useState(null);
    const [lat, setLat] = useState(null)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    function copyText() {
        navigator.clipboard.writeText
        (`https://2gis.ru/geo/${long},${lat}`);
    }
    useEffect(() => {
        dispatch(getUserss(hash)).then((res)=> {
            setCurrantUser(res.payload)
            console.log(res.payload)
        })

        console.log(hash)
    }, []);

    return (
        <div>
            <div style={{ display: "flex", justifyContent:"center", margin: 100}}>
                <div style={{ width: 300,display: "flex", flexDirection: "column"}}>
                    <h1>Ребёнок</h1>
                    <input style={{padding: 20 , margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.name}
                    />
                    <input style={{padding: 20, margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.lastName}
                    />
                    <input style={{padding: 20, margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.birthday}
                    />
                    <input style={{padding: 20, margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.phone}
                    />
                    <input style={{padding: 20, margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.address}
                    />
                    <h1>Мама:</h1>
                    <input style={{padding: 20, margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.mom?.name}
                    />
                    <a href={"tel:" + currantUser?.mom?.phone}>

                        <input style={{padding: "20px 107px 20px 20px", margin: "0 0 5px 0", cursor: "pointer"}} disabled type="text"
                               value={currantUser?.mom?.phone}
                        />
                    </a>

                    <div style={{display: "flex", justifyContent:"center", gap: 25}}>
                        <a href={currantUser?.mom?.tg} style={{ cursor: "pointer"}} target="_blank"><img className={s.img} src={telega} alt=""/></a>
                        <a href={currantUser?.mom?.ws} style={{ cursor: "pointer"}} target="_blank"><img className={s.img} src={whatsup} alt=""/></a>
                    </div>
                    <h1>Папа:</h1>
                    <input style={{padding: 20, margin: "0 0 20px 0"}} disabled type="text" value={currantUser?.dad?.name}/>
                    <a href={currantUser?.dad?.phone} target="_blank">
                        <input style={{padding: "20px 107px 20px 20px", margin: "0 0 5px 0", cursor: "pointer"}} disabled type="text"
                               value={currantUser?.dad?.phone}
                        />
                    </a>
                    <div style={{display: "flex", justifyContent:"center", gap: 25}}>
                        <a href={currantUser?.dad?.tg} style={{ cursor: "pointer"}} target="_blank"><img className={s.img} src={telega} alt=""/></a>
                        <a href={currantUser?.dad?.ws} style={{ cursor: "pointer"}} target="_blank"><img className={s.img} src={whatsup} alt=""/></a>
                    </div>
                    {/*<Geolocation/>*/}

                </div>
            </div>
            {/*<div style={{margin: "0 500px 0 "}}><Home/></div>*/}


            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <button style={{padding: 25, cursor: "pointer", margin: "10px 0 0 0"}} onClick={() => {
                    if(navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                        navigator.geolocation.getCurrentPosition(position => {
                            setLong(position.coords.longitude);
                            setLat(position.coords.latitude);
                        })
                    }
            setOpen(true)
                }}

                >Скопировать
                    Геолокацию</button>
                {open &&
                    <div style={{display: "flex", gap: 50, margin: "25px 0 0 0", flexDirection: "column"}}>
                        <a onClick={()=> handleOpen()} style={{textDecoration: "none", fontSize: 23, cursor: "pointer"}} href={copyText()}>Скопировать
                            Геолокацию</a>
                        <div style={{opacity: 0}}>
                            <h1>Long: {long}</h1>
                            <h1>Lat: {lat}</h1>
                        </div>

                    </div>
                }
            </div>
            <div className={s.h2}>
                <Modall
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" style={{margin: "10px 85px"}} sx={{ mt: 2 }}>
                            Успешно скопировано
                        </Typography>
                    </Box>
                </Modall>
            </div>
        </div>
    );
};
export default View;