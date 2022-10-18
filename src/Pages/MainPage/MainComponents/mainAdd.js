import  React, {useState} from "react";
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import Modal from "../../../Modal/Modal";
import Qr from "../../../QR/Qr";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsers} from "../../../store/slices/userSlice";
import s from "./mainComponents.module.css"

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const delUser =  async () => {
        await dispatch(deleteUser(contact?.hash))
        dispatch(getUsers())
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
            <td style={{ fontSize: 15 }}>

                {/*<button style={{ fontSize: 15 }}*/}
                {/*    type="button"*/}
                {/*    onClick={(event) => handleEditClick(event, contact)}*/}
                {/*>*/}
                {/*    Edit*/}
                {/*</button>*/}
                <button style={{ fontSize: 15 }} type="button" onClick={delUser}>
                    Delete
                </button>
            </td>


        </tr>
            <Modal  active={modalActive} setActive={setModalActive}>
                <Qr hash={contact.hash}/>

            </Modal>

        </>
    );
};

export default ReadOnlyRow;