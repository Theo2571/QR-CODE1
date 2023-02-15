import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import {LOGIN_ROUTE} from "./utils/consts";

const beforeEnterAdmin = (component, role, path ) => {
    if (path === '/admin'  ) {
        return component
    }
    if (role === 'superadmin') {
        return <Navigate to="/admin" /> ;
    } else {
        return <Navigate to="/" /> ;
    }
};

const beforeEnterClient = (component, role, path) => {
    if (role === 'superadmin'  ) {
        return component ;
    }

    if (role === 'user' || path === '/qr/:hash' || path === "/"  || path === '/view/:hash' || path === '/refactor-client/:hash') {
        return component;
    }
    return 'Has no access'
};

const AppRouter = () => {
    const role = useSelector( store => store.userReducer.role);

    return (
        <Routes>
            {role && authRoutes.map(({path, Component}) =>
                <Route path={path} element={beforeEnterAdmin(Component, role, path)} key={path}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route path={path} element={beforeEnterClient(Component, role, path)} key={path}/>
            )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;