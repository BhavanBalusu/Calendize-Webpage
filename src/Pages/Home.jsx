import logo from "../calendize-home.png"
import '../Styles/Home.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import TypeAnimation from 'react-type-animation';
import React, {useState, useEffect} from 'react';


export default function Home() {
    const nav = useNavigate();
    const [currUser] = useAuthState(auth);

    useEffect( ()=>{
        if (currUser){
            nav('/dashboard')
        }
    },[currUser])

    return (
        <div className="home">
            <nav className="home-nav">
                <img src={logo} alt="calendize logo" />
                <div style={{ "width": "70%" }}></div>
                <button className="sign-button sign-in" onClick={e => { e.preventDefault(); logout(); window.open("http://localhost:3000/sign","_blank") }}>Log In</button>
                <a target="_blank">
                    <button className="sign-button sign-up" onClick={e => { e.preventDefault(); logout(); window.open("http://localhost:3000/register","_blank") }}>Sign Up</button>
                </a>
            </nav>


            <p className="motto">Event management, <TypeAnimation cursor={true} sequence={['', 1000, 'done right.', 1000]} repeat={1} wrapper="span" className="special" /></p>
        </div>
    )
}