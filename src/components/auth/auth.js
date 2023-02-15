import React from "react";
import { useSelector } from "react-redux";

const Auth = (props) => {
  const token = useSelector((store) => store.userReducer.token);
  return <div>{token ? <>{props.children}</> : <div> Loading...</div>}</div>;
};

export default Auth;
