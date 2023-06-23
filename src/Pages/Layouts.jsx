import React from "react";
import Layout from '../Components/Layout';
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

function Layouts() {

    return (
        <div className='dashPage-holders'>
            <Sidebar />
            <div className='DasH'>
                <Navbar />
                <div className='dashPage'>
                    <Layout />
                </div>
            </div>
        </div>
    );
}

export default Layouts;