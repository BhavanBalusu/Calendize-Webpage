import React from 'react'
import '../Styles/SideBar.css'
import logo from "../logo.png"
import { auth, db, logout} from '../firebase'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from 'react-router-dom';

const img = require("../logo.png")

export default function Sidebar() {
    const nav = useNavigate()

    return (
        <div className="sidebar">
            <div className='logoText'>
                <img src={logo} width={40} height={25}/>
                <h3>Calendize</h3>
            </div>
            <div className='nav-buttons'>
                <button onClick={()=>{nav("/dash")}}> <i class="bi bi-house-door-fill"/>Dashboard</button>
                <button onClick={()=>{nav("/links")}} ><i class="bi bi-link-45deg"/>Links</button>
                <button onClick={()=>{nav("/layout")}}><i class="bi bi-grid-1x2"/>Layouts</button>
                <button onClick={()=>{nav("/events")}}><i class="bi bi-calendar-event"/>Events</button>
                <button onClick={()=>{nav("/weather")}}><i class="bi bi-cloud-sun-fill"/>Weather</button>
                <button onClick={()=>{nav("/settings")}}><i class="bi bi-gear-fill"/>Settings</button>
            </div>

            <button className='logout-button' onClick={()=>{logout()}}><i class="bi bi-box-arrow-left"/>Logout</button>
        </div>
    )
}