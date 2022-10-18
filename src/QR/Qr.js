import s from './Qr.module.css'
import QRCode from "react-qr-code";
// import {useSelector} from "react-redux";
function Qr({hash}) {
const print = () => {
    // window.onafterprint = window.history.back();
    window.print();
}
    return (
        <div>
            <div>
                <div style={{margin: "0 100px"}}>
                    <QRCode className={s.qr}  value={`http://http://localhost:3000/login-client/${hash}`} size={150} />
                </div>
            </div>
            <div style={{textAlign: "center", fontSize: 25 , cursor: "pointer"}}>
                <button style={{padding: "5px 30px", cursor: "pointer"}} className={s.bth} onClick={print}>Печать</button>
            </div>
        </div>
    )
}
// http://109.201.185.48/view/${currentUser?.id}
export default Qr
