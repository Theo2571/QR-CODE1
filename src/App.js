import AppRouter from "./AppRouter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { getProfile } from "./store/actions/userActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
