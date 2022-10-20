import AppRouter from "./AppRouter";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getProfile} from "./store/slices/userSlice";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(getProfile())
    }, []);
    return (
        <div>
            <AppRouter/>
        </div>
    );
}

export default App;