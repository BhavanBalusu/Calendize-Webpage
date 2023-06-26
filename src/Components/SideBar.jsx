import {React, useState, useEffect} from 'react'
import '../Styles/SideBar.css'
import logo from "../logo.png"
import { auth, db, logout} from '../firebase'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from 'react-router-dom';

const img = require("../logo.png")

export default function Sidebar(props) {

    useEffect(() => {
        if(window.location.href.indexOf("dash")>0 && document.getElementsByClassName("dash-buttonz")[0]!== undefined){
            document.getElementsByClassName("dash-buttonz")[0].style.backgroundColor = '#502890';
            document.getElementsByClassName("dash-buttonz")[0].style.color = '#cfc8f7'

            // document.getElementsByClassName("dash-buttonz")[0].style.width = '220px'
            document.getElementsByClassName("dash-buttonz")[0].style.minHeight = '50px'
            document.getElementsByClassName("dash-buttonz")[0].style.paddingLeft = '15px'
            document.getElementsByClassName("dash-buttonz")[0].style.marginTop = '5px'
            document.getElementsByClassName("dash-buttonz")[0].style.marginBottom = '5px'
            document.getElementsByClassName("dash-buttonz")[0].style.alignSelf = 'center'
            document.getElementsByClassName("dash-buttonz")[0].style.borderRadius = '10px'
        }
        else if(window.location.href.indexOf("links")>0 && document.getElementsByClassName("links-buttonz")[0]!== undefined){
            document.getElementsByClassName("links-buttonz")[0].style.backgroundColor = '#502890';
            document.getElementsByClassName("links-buttonz")[0].style.color = '#cfc8f7'
            // document.getElementsByClassName("links-buttonz")[0].style.width = '220px'
            document.getElementsByClassName("links-buttonz")[0].style.minHeight = '50px'
            document.getElementsByClassName("links-buttonz")[0].style.paddingLeft = '15px'
            document.getElementsByClassName("links-buttonz")[0].style.marginTop = '5px'
            document.getElementsByClassName("links-buttonz")[0].style.marginBottom = '5px'
            document.getElementsByClassName("links-buttonz")[0].style.alignSelf = 'center'
            document.getElementsByClassName("links-buttonz")[0].style.borderRadius = '10px'
        }
        else if(window.location.href.indexOf("layout")>0 && document.getElementsByClassName("layouts-buttonz")[0]!== undefined){
            document.getElementsByClassName("layouts-buttonz")[0].style.backgroundColor = '#502890';
            document.getElementsByClassName("layouts-buttonz")[0].style.color = '#cfc8f7'
            // document.getElementsByClassName("layouts-buttonz")[0].style.width = '220px'
            document.getElementsByClassName("layouts-buttonz")[0].style.minHeight = '50px'
            document.getElementsByClassName("layouts-buttonz")[0].style.paddingLeft = '15px'
            document.getElementsByClassName("layouts-buttonz")[0].style.marginTop = '5px'
            document.getElementsByClassName("layouts-buttonz")[0].style.marginBottom = '5px'
            document.getElementsByClassName("layouts-buttonz")[0].style.alignSelf = 'center'
            document.getElementsByClassName("layouts-buttonz")[0].style.borderRadius = '10px'
        }
        else if(window.location.href.indexOf("events")>0 && document.getElementsByClassName("events-buttonz")[0]!== undefined){
            document.getElementsByClassName("events-buttonz")[0].style.backgroundColor = '#502890';
            document.getElementsByClassName("events-buttonz")[0].style.color = '#cfc8f7'

            // document.getElementsByClassName("events-buttonz")[0].style.width = '220px'
            document.getElementsByClassName("events-buttonz")[0].style.minHeight = '50px'
            document.getElementsByClassName("events-buttonz")[0].style.paddingLeft = '15px'
            document.getElementsByClassName("events-buttonz")[0].style.marginTop = '5px'
            document.getElementsByClassName("events-buttonz")[0].style.marginBottom = '5px'
            document.getElementsByClassName("events-buttonz")[0].style.alignSelf = 'center'
            document.getElementsByClassName("events-buttonz")[0].style.borderRadius = '10px'
        }
        else if(window.location.href.indexOf("weather")>0 && document.getElementsByClassName("weather-buttonz")[0]!== undefined){
            document.getElementsByClassName("weather-buttonz")[0].style.backgroundColor = '#502890';
            document.getElementsByClassName("weather-buttonz")[0].style.color = '#cfc8f7'

            // document.getElementsByClassName("weather-buttonz")[0].style.width = '220px'
            document.getElementsByClassName("weather-buttonz")[0].style.minHeight = '50px'
            document.getElementsByClassName("weather-buttonz")[0].style.paddingLeft = '15px'
            document.getElementsByClassName("weather-buttonz")[0].style.marginTop = '5px'
            document.getElementsByClassName("weather-buttonz")[0].style.marginBottom = '5px'
            document.getElementsByClassName("weather-buttonz")[0].style.alignSelf = 'center'
            document.getElementsByClassName("weather-buttonz")[0].style.borderRadius = '10px'
        }
        else if(window.location.href.indexOf("settings")>0 && document.getElementsByClassName("settings-buttonz")[0]!== undefined){
            document.getElementsByClassName("settings-buttonz")[0].style.backgroundColor = '#502890';
            document.getElementsByClassName("settings-buttonz")[0].style.color = '#cfc8f7'

            // document.getElementsByClassName("settings-buttonz")[0].style.width = '220px'
            document.getElementsByClassName("settings-buttonz")[0].style.minHeight = '50px'
            document.getElementsByClassName("settings-buttonz")[0].style.paddingLeft = '15px'
            document.getElementsByClassName("settings-buttonz")[0].style.marginTop = '5px'
            document.getElementsByClassName("settings-buttonz")[0].style.marginBottom = '5px'
            document.getElementsByClassName("settings-buttonz")[0].style.alignSelf = 'center'
            document.getElementsByClassName("settings-buttonz")[0].style.borderRadius = '10px'
        }
    }, [ document.getElementsByClassName("dash-buttonz")[0]])

    // const [isLoadedPage, setIsLoadedPage] = useState();
    const nav = useNavigate()

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [naved, setNav] = useState(false);

    const closeMenuBar = () => {
        let width = document.body.offsetWidth;
        console.log(width)
        if (width <= 750) {
            setNavbarOpen(true);
        }
        else{
            setNavbarOpen(false);
        }

    };

    window.addEventListener('resize', closeMenuBar)

    if (!navbarOpen && document.body.offsetWidth > 750 ){
        return(
            <div className="sidebar">
                <div className='logoText'>
                    <img src={logo} width={40} height={25}/>
                    <h3>Calendize</h3>
                </div>
                <div className='nav-buttons'>
                    <button className = "dash-buttonz" onClick={()=>{nav("/dash"); }}> <i class="bi bi-house-door-fill"/>Dashboard</button>
                    <button className ="links-buttonz" onClick={()=>{nav("/links");}} ><i class="bi bi-link-45deg"/>Links</button>
                    <button className ="layouts-buttonz" onClick={()=>{nav("/layout");}}><i class="bi bi-grid-1x2"/>Layouts</button>
                    <button className ="events-buttonz" onClick={()=>{nav("/events");}}><i class="bi bi-calendar-event"/>Events</button>
                    <button className ="weather-buttonz" onClick={()=>{nav("/weather");}}><i class="bi bi-cloud-sun-fill"/>Weather</button>
                    <button className = "settings-buttonz" onClick={()=>{nav("/settings");}}><i class="bi bi-gear-fill"/>Settings</button>
                </div>

                <button className='logout-button' onClick={()=>{logout()}}><i class="bi bi-box-arrow-left"/>Logout</button>
            </div>
        )
    } else{
        return(
            <div className="sidebar">
                <div className='logoText'>
                    <img src={logo} width={40} height={25}/>
                </div>
                <div className='nav-buttons'>
                    <button className = "dash-buttonz" onClick={()=>{nav("/dash"); }}> <i class="bi bi-house-door-fill"/></button>
                    <button className ="links-buttonz" onClick={()=>{nav("/links");}} ><i class="bi bi-link-45deg"/></button>
                    <button className ="layouts-buttonz" onClick={()=>{nav("/layout");}}><i class="bi bi-grid-1x2"/></button>
                    <button className ="events-buttonz" onClick={()=>{nav("/events");}}><i class="bi bi-calendar-event"/></button>
                    <button className ="weather-buttonz" onClick={()=>{nav("/weather");}}><i class="bi bi-cloud-sun-fill"/></button>
                    <button className = "settings-buttonz" onClick={()=>{nav("/settings");}}><i class="bi bi-gear-fill"/></button>
                </div>

                <button className='logout-button' onClick={()=>{logout()}}><i class="bi bi-box-arrow-left"/></button>
            </div>
        )

    }
}