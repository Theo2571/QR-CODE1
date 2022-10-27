import React from 'react';
import {useSelector} from "react-redux";

const Auth = (props) => {
    const token = useSelector( store => store.userReducer.token);
    if (token) {
        return (
            <>
                {props.children}
            </>
        );
    }

    return (
        <div>
            Loading...
        </div>
    );
};

export default Auth;