import React from 'react'
import Events from './Events'
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

function EventsPage(){
    return(
        <>
            <div className='dashPage-holders'>
                <Sidebar/>
                <div className='DasH'>
                    <Navbar/>
                    <div className='dashPage'>
                        <Events/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventsPage;