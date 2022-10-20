import {ADMIN_ROUTE, CLIENT_ROUTE, LOGIN_ROUTE, LOGINCLIENT_ROUTE, PASSWORD_ROUTE, VIEW_ROUTE} from "./utils/consts";
import Main from "./Pages/MainPage/main";
import ClientPage from "./Pages/ClientPage/ClientPage";
import View from "./Pages/ViewPage/View";
import Password from "./Pages/PasswordPage/Password";
import Login from "./Pages/LoginPage/login";
import LoginClient from "./Pages/LoginPage/LoginClient";
import Auth from "./components/auth/auth";

export const authRoutes = [  {
    path: ADMIN_ROUTE,
    Component: (
        <Auth>
            <Main/>
        </Auth>
    )
},
]


export const publicRoutes = [

    {
        path: CLIENT_ROUTE,
        Component: <ClientPage/>
    },
    {
        path: VIEW_ROUTE,
        Component: <View/>
    },
    {
        path: PASSWORD_ROUTE,
        Component: <Password/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: LOGINCLIENT_ROUTE,
        Component: <LoginClient/>
    },
]


