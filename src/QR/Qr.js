import s from './Qr.module.css'
import QRCode from "react-qr-code";
import {useState} from "react";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
function Qr({hash, onClick}) {
    const [isActive, setIsActive] = useState(false);
const print = () => {

    window.print();
}


    return (
        <div onClick={() => onClick(isActive, setIsActive)} >
            {isActive ?
            <div>
                <div  style={{ display:"flex",padding:10, }}>
                    <QRCode className={s.qr}  value={`https://qr.discoverystudio.xyz/qr/${hash}`} size={150} />
                    <div className={s.bth} style={{position:"absolute", margin:"-15px 152px 0 ", color:"#43DC0EFF"}} >
                      <TaskAltIcon />
                    </div>
                </div>
            </div>
                :
                <div style={{background: isActive ? '#cccccc' : 'transparent'}}>
                    <div  style={{ display:"flex",padding:10, }}>
                        <QRCode className={s.qr}  value={`https://qr.discoverystudio.xyz/qr/${hash}`} size={150} />
                    </div>
                </div>
            }
            <div style={{textAlign: "center", fontSize: 25 , cursor: "pointer"}}>
                {/*<button style={{padding: "5px 30px", cursor: "pointer"}} className={s.bth} onClick={print}>Печать</button>*/}
            </div>
        </div>
    )
}
export default Qr

