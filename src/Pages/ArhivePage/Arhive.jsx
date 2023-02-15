import React, { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import Qr from "../../QR/Qr";
import {
  deleteUser,
  getUsers,
  restoreUser,
} from "../../store/actions/userActions";
import Modal from "../../components/Modal/Modal";
import s from "../MainPage/MainComponents/mainComponents.module.css";

const Archive = ({ contact }) => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);

  const delUser = () => {
    dispatch(deleteUser(contact?.hash)).then(() => {
      dispatch(getUsers({ archived: true }));
    });
  };

  const restore = () => {
    dispatch(restoreUser(contact?.hash)).then(() => {
      dispatch(getUsers({ archived: true }));
    });
  };

  return (
    <>
      <tr className={s.tr}>
        <td style={{ fontSize: 15 }}>{contact?.hash}</td>
        <td
          onClick={() => setModalActive(true)}
          style={{ fontSize: 15, cursor: "pointer" }}
        >
          Посмотреть QR-code
        </td>
        <td style={{ fontSize: 15 }}>{contact?.name}</td>
        <td style={{ fontSize: 15 }}>{contact?.lastName}</td>
        <td style={{ fontSize: 15 }}>{contact?.birthday}</td>
        <td style={{ fontSize: 15 }}>{contact?.phone}</td>
        <td style={{ fontSize: 15 }}>{contact?.address}</td>
        <td style={{ fontSize: 15 }}>{contact?.mom?.name}</td>
        <td style={{ fontSize: 15 }}>{contact?.mom?.phone}</td>
        <td style={{ fontSize: 15 }}>{contact?.dad?.name}</td>
        <td style={{ fontSize: 15 }}>{contact?.dad?.phone}</td>
        <td style={{ fontSize: 15 }}>
          {dayjs(contact?.createDate).format("YYYY-MM-DD")}
        </td>
        <td style={{ fontSize: 15 }}>
          <button style={{ fontSize: 15 }} type="button" onClick={restore}>
            Восстановить
          </button>
          <button style={{ fontSize: 15 }} type="button" onClick={delUser}>
            Удалить
          </button>
        </td>
      </tr>
      <Modal
        style={{
          cursor: "pointer",
          position: "absolute",
          bottom: 130,
          margin: "0 0 0 360px",
          pointerEvents: "all",
          zIndex: 9999,
        }}
        active={modalActive}
        setActive={setModalActive}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Qr hash={contact.hash} />
        </div>
      </Modal>
    </>
  );
};

export default Archive;
