import logo from "../calendize-home.png"
import '../Styles/Home.css'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { collection, query, onSnapshot, where, getDocs, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef } from 'react';
import { deleteUser, updateEmail } from "firebase/auth";
import '../Styles/Settings.css'


export default function Settings() {

    const [currUser] = useAuthState(auth)
    const [user, setUser] = useState('')
    const [userDoc, setUserDoc] = useState()
    const [name, setName] = useState('');

    const nameInput = useRef()
    const emailInput = useRef();

    const currentUser = auth.currentUser;

    const nav = useNavigate();

    const changeName = async () => {
        const docRef = doc(db, "users", user)
        try {
            await updateDoc(docRef, { name: nameInput.current.value + "" })
            setName(nameInput.current.value + "");
        } catch (e) {
            alert("Error: Could not change name")
            console.log(e)

        }
        nameInput.current.value = ''
    }

    const deleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                await deleteUser(currentUser)

            } catch (e) {
                alert("Error: Could not delete account")
                console.log(e)
            }
            nav("/")
        }
    }

    const changeEmail = async () => {
        if (window.confirm("Are you sure you want to change your email?")) {
            try {
                await updateEmail(currentUser, emailInput.current.value);
            } catch (e) {
                alert("Error: Could not update email")
                console.log(e)

            }
        }
    }

    useEffect(() => {

        const usr = async () => {
            if (currUser) {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                // return userDoc.docs[0].id;
                setUserDoc(userDoc.docs[0])
                setUser(userDoc.docs[0].id)
                setName(userDoc.docs[0].data().name)
            }
        }

        usr()
    }, [currUser])


    return (
        // delete account
        // change name
        // change password
        <div className="settings-page">
            <button className="back-button" onClick={() => nav("/dash")}>Back</button>
            <div className="settings-holder">
                <h1>Edit Profile <i className="bi bi-pencil-square edit-icon"></i> </h1>
                <hr />

                <div className="content-holder">
                    <div className="labels">
                        <h3 className="label text">Current Name <span></span></h3>
                        <h3 className="label text">Current Email <span></span></h3>
                    </div>

                    <div className="content">
                        <h3 className="label text">{userDoc === undefined ? "" : name}</h3>
                        <h3 className="label text">{currUser === null ? "" : currUser.email}</h3>
                    </div>
                </div>



            </div>

        </div >
    )
}