import logo from "../calendize-home.png"
import '../Styles/Home.css'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { collection, query, onSnapshot, where, getDocs, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef } from 'react';
import { deleteUser, reload, updateEmail, updatePassword } from "firebase/auth";
import '../Styles/Settings.css'


export default function Settings() {

    const [currUser] = useAuthState(auth)
    const [user, setUser] = useState('')
    const [userDoc, setUserDoc] = useState()
    const [name, setName] = useState('');

    const nameInput = useRef()
    const emailInput = useRef();
    const pwInput = useRef();
    const pwConfirmInput = useRef();

    const disp = useRef()
    const edit = useRef()
    const btns = useRef()

    const currentUser = auth.currentUser;

    let c = 0;

    const nav = useNavigate();

    const changeName = async () => {
        const docRef = doc(db, "users", user)
        try {
            if (nameInput.current.value !== '') {
                console.log("not empty!")
                await updateDoc(docRef, { name: nameInput.current.value + "" })
            }
            return true
        } catch (e) {
            alert("Error: Could not change name")
            console.log(e)

        }
        nameInput.current.value = ''
        return false
    }

    const deleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                await deleteUser(currentUser)
                return true

            } catch (e) {
                alert("Error: Could not delete account")
                console.log(e)
            }
            nav("/")

        }
    }

    const changeEmail = async () => {
        if (true) {
            try {
                if (emailInput.current.value !== '')
                    await updateEmail(currentUser, emailInput.current.value);
                return true;
            } catch (e) {
                alert("Error: Could not update email")
                console.log(e)

            }
        }

        return false
    }

    const changePassword = async () => {

        const passVal = pwInput.current.value;
        const confirmPassVal = pwConfirmInput.current.value;

        if (passVal === confirmPassVal) {

            try {
                if (passVal !== '')
                    await updatePassword(currentUser, passVal)
                return true;
            }

            catch (e) {
                alert("Error: Could not update password")
                console.log(e)
            }
        }


        return false

    }

    const toggleEdit = () => {
        edit.current.classList.toggle("hidden")
        disp.current.classList.toggle("hidden")
        btns.current.classList.toggle("hidden")
    }

    const submitData = async () => {
        let bool = await changeName() && await changeEmail() && await changePassword()
        if (bool)
            alert("Success! Fields updated.")
        window.location.reload()

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
            <div className="settings-holder">
                <div className="title-holder">
                    <h1>Edit Profile</h1>
                    <div onClick={() => toggleEdit()}>
                        <i className="bi bi-pencil-square edit-icon"></i>
                    </div>
                </div>
                <hr />


                <div className="content-holder" ref={disp}>
                    <div className="label-field-component">
                        <h3 className="label text">Current Name </h3>
                        <h3 className="label text current">{userDoc === undefined ? "" : name}</h3>
                    </div>

                    <div className="label-field-component">
                        <h3 className="label text">Current Email </h3>
                        <h3 className="label text current">{currUser === null ? "" : currUser.email}</h3>
                    </div>

                    <div className="label-field-component">
                        <h3 className="label text">Current Password </h3>
                        <input id="input-display" className="label text borderless current" type="password" disabled value={currUser === null ? "" : "123456789101112"} />
                    </div>

                </div>

                <div className="content-holder inputs hidden" ref={edit}>

                    <div className="label-field-component">
                        <h3 className="label text">New Name </h3>
                        <input id="input-display" className="label text" ref={nameInput} placeholder={userDoc === undefined ? "" : name} />
                    </div>

                    <div className="label-field-component">
                        <h3 className="label text">New Email </h3>
                        <input id="input-display" className="label text" ref={emailInput} placeholder={currUser === null ? "" : currUser.email} />
                    </div>

                    <div className="label-field-component">
                        <h3 className="label text">New Password </h3>
                        <input id="input-display" className="label text" type="password" ref={pwInput} placeholder="Enter password here" />
                    </div>

                    <div className="label-field-component">
                        <h3 className="label text">Confirm Password</h3>
                        <input id="input-display" className="label text" type="password" ref={pwConfirmInput} placeholder="Confirm password here" />
                    </div>

                </div>

                <div className="buttons-holder hidden" ref={btns}>
                    <button className="form-control cancel" onClick={() => toggleEdit()}>Cancel</button>
                    <button className="form-control save" onClick={() => submitData()}>Save</button>
                </div>



            </div>
        </div >
    )
}