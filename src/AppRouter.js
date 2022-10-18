import {ADMIN_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import { Navigate, Route, Routes } from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";

const AppRouter = () => {
    // const role = useSelector( store => store.userReducer.role);

    return (
        <Routes>
            {authRoutes.map(({path, Component}) =>
                <Route path={path} element={(Component)} key={path}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route path={path} element={(Component)} key={path}/>
            )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;
