import  React, {useState} from "react";
import Modal from "../../../Modal/Modal";
import Qr from "../../../QR/Qr";
import {useDispatch} from "react-redux";
import {archiveUser, getUsers} from "../../../store/slices/userSlice";
import s from "./mainComponents.module.css"
import dayjs from "dayjs";

const ReadOnlyRow = ({ contact }) => {
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const delUser =  async () => {
        await dispatch(archiveUser(contact?.hash))
        dispatch(getUsers({archived: false}))
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
            <td style={{ fontSize: 15 }} >{dayjs(contact?.createDate).format('YYYY-MM-DD')}</td>
            <td style={{ fontSize: 15 }}>
                <button style={{ fontSize: 15 }} type="button" onClick={delUser}>
                    Архивировать
                </button>
            </td>
        </tr>
            <Modal active={modalActive} setActive={setModalActive}>
                <div style={{display:"flex", justifyContent:"center"}}>
                <Qr hash={contact.hash}/>
                </div>
            </Modal>
        </>
    );
};

export default ReadOnlyRow;