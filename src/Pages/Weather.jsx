import Navbar from "../Components/Navbar"
import '../Styles/Weather.css'
import { useState, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import List from '../Components/WeatherSearchList'

import Widget from '../Components/WeatherWidget';

export default function Location() {
    const [currUser] = useAuthState(auth);
    const [inputText, setInputText] = useState("");
    const [loc, setLoc] = useState("None");
    const locRef = useRef("")

    const getUserLoc = async () => {
        if (currUser == null) {
            return;
        }
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const userDoc = await getDocs(q);
            const userLoc = userDoc.docs[0].get("location")

            if (userLoc.indexOf(",") === -1)
                setLoc(userLoc)

            else {
                const cityName = fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${userLoc.substring(0, userLoc.indexOf(",")).trim()}&lon=${userLoc.substring(userLoc.indexOf(",") + 1).trim()}&appid=91ed74c2909e6d1d05ef3dd5569b5de2`)
                    .catch(err => {
                        alert("an error occured")
                        console.log(err)
                        return;
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data[0].name)
                        setLoc(data[0].name)
                    })

            }


        } catch (err) {
            console.log(err);
            alert('An error had occurred while fetching the users name');
            return;

        }
    }

    useEffect(() => {
        getUserLoc()
    }, [currUser])



    function getLocation(e) {
        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLoc)
        } else {
            setLoc("None");
            console.log("sfs")
        }
    }

    function getLoc(position) {

        const cityName = fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=91ed74c2909e6d1d05ef3dd5569b5de2`)
            .catch(err => {
                alert("an error occured")
                console.log(err)
                return;
            })
            .then(res => res.json())
            .then(data => {
                console.log(data[0].name)
                setLoc(data[0].name)
            })

        addToDB(position.coords.latitude + ", " + position.coords.longitude)
    }

    function nonAlpha(val) {
        for (let i = 0; i < val.length; i++) {
            let str = val.substring(i, i + 1);
            if (!str.match(/[a-z]/i)) {
                if (str !== " ")
                    return true;

            }
        }
        return false;
    }

    const submitData = async e => {
        e.preventDefault();
        let widg = document.querySelector(".widget");

        if (!nonAlpha(locRef.current.value.trim()) && locRef.current.value.trim() !== '') {
            setLoc(locRef.current.value.trim())
            await addToDB(locRef.current.value.trim())
            closePopUp();
        }
        else {
            const inp = document.querySelector(".locationInput")
            inp.style.border = "1px solid red";
        }
        locRef.current.value = ""
    }

    const addToDB = async (val) => {
        if (!currUser) return;
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const userDoc = await getDocs(q);
            const docID = userDoc.docs[0].id;

            await updateDoc(doc(db, "users", docID), { location: val })

        } catch (err) {
            console.error(err)
            alert("Unable to save location.")
        }
    }
    const openPopUp = () => {
        
        var popup = document.getElementsByClassName("subholder")[0];
        popup.style.visibility = 'visible'
        popup.style.display = 'block'
    }

    const closePopUp = () => {
        var popup = document.getElementsByClassName("subHolder")[0];
        popup.style.visibility = 'hidden'
        popup.style.display = 'none'
    }

    let inputHandler = (e) => {
        //convert input text to lower case

        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <>
            <div className="housing-weather">
            <Widget />
            <div className="weather-search-bar">
                <div>
                    <input type="text" placeholder="Enter city name" className="locationInput search" onChange={inputHandler} />
                    <i class="bi bi-search"></i>
                </div>
                <List input={inputText}/>
            </div>
           
                {/* <div className="subHolder">
                    <div className="GetUserLocation">
                        <i onClick={()=>{closePopUp()}} class="bi bi-x"></i>
                        <h1 className="weather-label">Location for Weather: {loc}</h1>
                        <button className="Dummy" onClick={(e) => getLocation(e)}>Request Location</button>
                        <p className="or"> OR</p>
                        <h2>Want to type your city in instead?</h2>
                        <form className="location-form" onSubmit={e => submitData(e)}>
                            <input type="text" placeholder="Enter city name" ref={locRef} className="locationInput" onChange={e => {e.target.style.border = "2px solid rgba(0, 0, 0, 0.2)"}} />
                            <button className="locationSubmit">Submit</button>
                        </form>
                        <p className="disclaimer">*Note: All cities may not be avaliable</p>
                    </div>
                </div> */}
            </div>
           
        </>
    )
}