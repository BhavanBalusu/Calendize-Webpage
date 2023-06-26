import React from "react";
import Weather from './Weather';
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

function WeatherPage(){

    return(
        <>
            <div className='dashPage-holders'>
                <Sidebar page="weather" />
                <div className='DasH'>
                    <Navbar/>
                    <div >
                        <Weather/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeatherPage;