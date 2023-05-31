import React from "react";
import Weather from './Weather';
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

function WeatherPage(){

    return(
        <>
            <div className='dashPage-holders'>
                <Sidebar/>
                <div className='DasH'>
                    <Navbar/>
                    <div className='dashPage'>
                        <Weather/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeatherPage;