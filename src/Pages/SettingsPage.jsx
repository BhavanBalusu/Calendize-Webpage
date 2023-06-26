import React from "react";
import Settings from './Settings';
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

function SettingsPage(){

    return(
        <>
            <div className='dashPage-holders'>
                <Sidebar page="settings"/>
                <div className='DasH'>
                    <Navbar/>
                    <div className='dashPage'>
                        <Settings/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsPage;