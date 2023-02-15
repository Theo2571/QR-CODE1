import {
  ADMIN_ROUTE,
  ARHIVE_ROUTE,
  CLIENT_ROUTE,
  LOGIN_ROUTE,
  LOGINCLIENT_ROUTE,
  PRINT_ROUTE,
  REFACTOR_ROUTE,
  // VIEW_ROUTE
} from "./utils/consts";
import Main from "./Pages/MainPage/main";
import ClientPage from "./Pages/ClientPage/ClientPage";
// import View from "./Pages/ViewPage/View";
import Login from "./Pages/LoginPage/login";
import LoginClient from "./Pages/LoginPage/LoginClient";
import Auth from "./components/auth/auth";
import MainArchive from "./Pages/ArhivePage/MainArchive";
import RefactorLogin from "./Pages/LoginPage/refactorLogin";
import MainPrint from "./Pages/PrintPage/MainPrint";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: (
      <Auth>
        <Main />
      </Auth>
    ),
  },
];

export const publicRoutes = [
  {
    path: CLIENT_ROUTE,
    Component: <ClientPage />,
  },
  // {
  //     path: VIEW_ROUTE,
  //     Component: <View/>
  // },
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
  {
    path: LOGINCLIENT_ROUTE,
    Component: <LoginClient />,
  },
  {
    path: ARHIVE_ROUTE,
    Component: <MainArchive />,
  },
  {
    path: REFACTOR_ROUTE,
    Component: <RefactorLogin />,
  },
  {
    path: PRINT_ROUTE,
    Component: <MainPrint />,
  },
];
