import React from 'react';
import s from "./Modal.module.css"
import ClearIcon from "@mui/icons-material/Clear";
const Modal = ({active, setActive, children, style}) => {
    return (
        <div className={active ? `${s.modal} ${s.active} ` : `${s.modal}` } onClick={() => setActive(false)}>

            <div className={active ? `${s.modal__content} ${s.active} ` : `${s.modal__content}` } onClick={e => e.stopPropagation()}>

                <ClearIcon  style={{ cursor: "pointer" ,
                    position:"absolute" ,
                    top: 25,
                    margin: "0 0 0 350px" ,
                    pointerEvents:"all",
                    zIndex: 9999 }}   {...style} onClick={() => setActive(false)}  />

                {children}
            </div>
        </div>
    );
};

export default Modal;