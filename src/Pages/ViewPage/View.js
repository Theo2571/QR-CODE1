import React, { useEffect, useState} from 'react';
import telega from "../../assets/ClientPhoto/telegram.png";
import whatsup from "../../assets/ClientPhoto/whatsapp.png";
import s from "../ClientPage/ClientComponents/ClientComponents.module.css";
import {useDispatch, useSelector} from "react-redux";
import { getUserss} from "../../store/slices/userSlice";
import {useNavigate, useParams} from "react-router-dom";
import Modall from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

const View = () => {
    const [open , setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currantUser, setCurrantUser] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {hash} = useParams()
    const [long, setLong] = useState(null);
    const [lat, setLat] = useState(null)
    const token = useSelector( store => store.userReducer.token);


    const Click = () => {
        navigate(`/refactor-client/${hash}`)
        if (token) {
            navigate(`/client/${hash}`)
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
                <div style={{cursor:"pointer", position:"absolute", top:50, marginRight:"185px"}} onClick={Click}><EditIcon fontSize={"large"}/></div>
                <p style={{position:"absolute", margin:"-20px 190px 0 0"}}>Редактировать</p>
                <div style={{ width: 300,display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", position:"absolute",top:42, marginLeft:"230px"}}>
                        <div style={{width: 200, cursor: "pointer", margin: "10px 0 0 0"}} onClick={() => {
                            if(navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                                navigator.geolocation.getCurrentPosition(position => {
                                    setLong(position.coords.longitude);
                                    setLat(position.coords.latitude);
                                })
                            }
                            setOpen(true)
                        }}
                        ><PersonPinCircleIcon fontSize={"large"}/></div>
                        <p style={{position:"absolute", margin:"40px 160px 0 0"}}>Поделиться геолокацией</p>
                        {open &&
                            <div style={{display: "flex", gap: 50, margin: "25px 0 0 0", flexDirection: "column"}}>
                                <a onClick={()=> handleOpen()} style={{opacity:0}} href={copyText()}>Скопировать
                                    Геолокацию</a>
                                <div style={{opacity: 0}}>
                                    <h1>Long: {long}</h1>
                                    <h1>Lat: {lat}</h1>
                                </div>

                            </div>
                        }
                    </div>
                    <h2 style={{margin:"25px 0 25px 0"}}>Ребёнок</h2>
                    {currantUser?.name ?
                    <div>
                    <input style={{padding: "12px 115px 12px 12px" , margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.name}
                    />
                    </div>
                        : <div></div>}
                    {currantUser?.lastName ?
                    <div>
                    <input style={{padding: "12px 115px 12px 12px", margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.lastName}
                    />
                    </div>
                        : <div></div>}
                    {currantUser?.birthday ?
                    <div>
                    <input style={{padding: "12px 115px 12px 12px", margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.birthday}
                    />
                    </div>
                        : <div></div>}
                    {currantUser?.phone ?
                    <div>
                    <input style={{padding: "12px 115px 12px 12px", margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.phone}
                    />
                </div>
                        : <div></div>}
                    {currantUser?.address ?
                    <div>
                    <input style={{padding: 12, width:272,margin: "0 0 20px 0"}} disabled type="text"
                           value={currantUser?.address}
                    />
                    </div>
                        : <div></div>}
                    {currantUser?.сommentary ?
                        <div>
                            <textarea style={{padding: 12, width:272, height:200,fontSize:16,  margin: "0 0 20px 0" , resize: "none"}} disabled type="text"
                                   value={currantUser?.сommentary}
                            />
                        </div>
                        : <div></div>}

                    {currantUser?.mom?.name ?
                        <div>
                            <h2>Мама:</h2>
                            <input style={{padding: 12,width:272, margin: "0 0 20px 0"}} disabled type="text"
                                   value={currantUser?.mom?.name}
                            />

                            <a href={"tel:" + currantUser?.mom?.phone}>

                                <input style={{padding: 12,width:272, margin: "0 0 5px 0", cursor: "pointer"}}
                                       disabled type="text"
                                       value={currantUser?.mom?.phone}
                                />
                            </a>

                            <div style={{display: "flex", justifyContent: "center", gap: 25}}>
                                {currantUser?.mom?.tg ?
                                <div>
                                <a href={currantUser?.mom?.tg} style={{cursor: "pointer"}} target="_blank"><img
                                    style={{width: 40}} className={s.img} src={telega} alt=""/></a>
                                </div>
                                    : <div></div>}
                                {currantUser?.mom?.ws ?
                                <div>
                                <a href={currantUser?.mom?.ws} style={{cursor: "pointer"}} target="_blank"><img
                                    style={{width: 40}} className={s.img} src={whatsup} alt=""/></a>
                                </div>
                                    :  <div></div>}
                            </div>
                        </div>
                        :
                        <div></div>
                    }
                    {currantUser?.dad?.name ?

                        <div>
                            <h2>Папа:</h2>
                            <input style={{padding: 12, width:272, margin: "0 0 20px 0"}} disabled type="text"
                                   value={currantUser?.dad?.name}/>
                            <a href={currantUser?.dad?.phone} target="_blank">
                                <input style={{padding: 12, width:272, margin: "0 0 5px 0", cursor: "pointer"}}
                                       disabled type="text"
                                       value={currantUser?.dad?.phone}
                                />
                            </a>
                            <div style={{display: "flex", justifyContent: "center", gap: 25}}>
                                {currantUser?.dad?.tg ?
                                <div>
                                <a href={currantUser?.dad?.tg} style={{cursor: "pointer"}} target="_blank"><img
                                    style={{width: 40}} className={s.img} src={telega} alt=""/></a>
                                </div>
                                    : <div></div>}
                                {currantUser?.dad?.ws ?
                                <div>
                                <a href={currantUser?.dad?.ws} style={{cursor: "pointer"}} target="_blank"><img
                                    style={{width: 40}} className={s.img} src={whatsup} alt=""/></a>
                                </div>
                                    : <div></div> }
                            </div>
                        </div>
                        :
                        <div></div>
                    }
            </div>
            </div>

            <div className={s.h2}>
                <Modall
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" style={{margin: "10px 85px",}} sx={{ mt: 2}}>
                            Успешно скопировано
                        </Typography>
                    </Box>
                </Modall>
            </div>
        </div>
    );
};
export default View;