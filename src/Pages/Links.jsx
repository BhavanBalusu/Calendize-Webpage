import React from "react";
import News from "./News"
import Calendar from './Calendar';
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

function Links(){

    return(
        <>
            <div className='dashPage-holders'>
                <Sidebar page ="links"/>
                <div className='DasH'>
                    <Navbar/>
                    <div className='dashPage'>
                        <News/>
                        <Calendar/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Links;