import  React, {useState} from "react";
import Modal from "../../Modal/Modal";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {deleteUser, getUsers, restoreUser} from "../../store/slices/userSlice";
import s from "../MainPage/MainComponents/mainComponents.module.css"
import Qr from "../../QR/Qr";

const Archive = ({ contact }) => {
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const delUser =  async () => {
        await dispatch(deleteUser(contact?.hash))
        dispatch(getUsers({ archived:true}))
    }
    const restore = async  () => {
        await dispatch(restoreUser(contact?.hash))
        dispatch(getUsers({ archived:true}))
    }
    return (
        <>
            <tr className={s.tr}>
                <td style={{ fontSize: 15 }}>{contact?.hash}</td>
                <td onClick={() => setModalActive(true)} style={{fontSize: 15 ,cursor:"pointer"}}
                >Посмотреть QR-code</td>
                <td style={{ fontSize: 15 }} >{contact?.name}</td>
                <td style={{ fontSize: 15 }} >{contact?.lastName}</td>
                <td style={{ fontSize: 15 }} >{contact?.birthday}</td>
                <td style={{ fontSize: 15 }} >{contact?.phone}</td>
                <td style={{ fontSize: 15 }} >{contact?.address}</td>
                <td style={{ fontSize: 15 }} >{contact?.mom?.name}</td>
                <td style={{ fontSize: 15 }} >{contact?.mom?.phone}</td>
                <td style={{ fontSize: 15 }} >{contact?.dad?.name}</td>
                <td style={{ fontSize: 15 }} >{contact?.dad?.phone}</td>
                <td style={{ fontSize: 15 }} >{dayjs(contact?.createDate).format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')}</td>
                <td style={{ fontSize: 15 }}>
                    <button style={{ fontSize: 15 }} type="button" onClick={restore}>
                        Восстановить
                    </button>
                    <button style={{ fontSize: 15 }} type="button" onClick={delUser}>
                        Удалить
                    </button>
                </td>
            </tr>
            <Modal style={{ cursor: "pointer" ,
                position:"absolute" ,
                bottom: 130,
                margin: "0 0 0 360px" ,
                pointerEvents:"all",
                zIndex: 9999 }}
                   active={modalActive} setActive={setModalActive}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Qr hash={contact.hash}/>
                </div>
            </Modal>
        </>
    );
};

export default Archive;