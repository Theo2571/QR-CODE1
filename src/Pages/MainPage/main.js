import React from 'react';
import MainComponents from "./MainComponents/mainComponents";
import ResponsiveAppBar from "../Header/header";

const Main = () => {
    return (
        <div>
            <ResponsiveAppBar/>
           <MainComponents/>
        </div>
    );
};

export default Main;