import { useState, useEffect, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import '../Styles/Layout.css'

import LayoutCard from "../Components/LayoutCard";
import horizontalOne from "../horizontal-one.png"
import horizontalTwo from "../horizontal-two.png"
import verticalOne from "../vertical-one.png"
import verticalTwo from "../vertical-two.png"


function Layout() {

    const [currUser] = useAuthState(auth);
    const [layout, setLayout] = useState('H1');


    const horizOne = useRef()
    const horizTwo = useRef()
    const vertOne = useRef()
    const vertTwo = useRef()

    const getUserOption = async () => {

        if (currUser == null) {
            console.log("null user")
            return;
        }

        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );

            const userDoc = await getDocs(q);
            const userOption = userDoc.docs[0].get("layout")

            if (userOption === "" || userOption === "H1") {
                horizOne.current.classList.remove("hoverable")
                horizOne.current.classList.add("selected")
            }

            else if (userOption === "H2") {
                horizTwo.current.classList.remove("hoverable")
                horizTwo.current.classList.add("selected")

            }

            else if (userOption === 'V1') {
                vertOne.current.classList.remove("hoverable")
                vertOne.current.classList.add("selected")
            }

            else {
                vertTwo.current.classList.remove("hoverable")
                vertTwo.current.classList.add("selected")
            }


        } catch (err) {
            console.log(err);
            return;
        }
    }

    const changeLayout = async (e, val) => {
        e.preventDefault();
        setLayout(val);

        if (val === "" || val === "H1") {
            horizOne.current.classList.remove("hoverable")
            horizOne.current.classList.add("selected")

            horizTwo.current.classList.add("hoverable")
            horizTwo.current.classList.remove("selected")

            vertOne.current.classList.add("hoverable")
            vertOne.current.classList.remove("selected")

            vertTwo.current.classList.add("hoverable")
            vertTwo.current.classList.remove("selected")
        }

        else if (val === "H2") {
            horizTwo.current.classList.remove("hoverable")
            horizTwo.current.classList.add("selected")

            horizOne.current.classList.add("hoverable")
            horizOne.current.classList.remove("selected")

            vertOne.current.classList.add("hoverable")
            vertOne.current.classList.remove("selected")

            vertTwo.current.classList.add("hoverable")
            vertTwo.current.classList.remove("selected")

        }

        else if (val === 'V1') {
            vertOne.current.classList.remove("hoverable")
            vertOne.current.classList.add("selected")

            horizOne.current.classList.add("hoverable")
            horizOne.current.classList.remove("selected")

            horizTwo.current.classList.add("hoverable")
            horizTwo.current.classList.remove("selected")

            vertTwo.current.classList.add("hoverable")
            vertTwo.current.classList.remove("selected")
        }

        else {
            vertTwo.current.classList.remove("hoverable")
            vertTwo.current.classList.add("selected")

            horizOne.current.classList.add("hoverable")
            horizOne.current.classList.remove("selected")

            horizTwo.current.classList.add("hoverable")
            horizTwo.current.classList.remove("selected")

            vertOne.current.classList.add("hoverable")
            vertOne.current.classList.remove("selected")
        }

        console.log(val)
        // await addToDB(val)

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

            await updateDoc(doc(db, "users", docID), { layout: layout })
            alert("Success! Make sure to reload the display to see your changes.")

        } catch (err) {
            console.error(err)
            alert("Unable to save layout.")
        }
    }

    useEffect(() => {
        getUserOption()
    }, [currUser])

    return (
        <div className='layout-page'>
            <div className="cards-holder">
                <LayoutCard imgSrc={horizontalOne} desc={"Horizontal One"} additionalClass={"hoverable"} layout="H1" onClickFN={changeLayout} ref={horizOne} />
                <LayoutCard imgSrc={horizontalTwo} desc={"Horizontal Two"} additionalClass={"hoverable"} layout="H2" onClickFN={changeLayout} ref={horizTwo} />
            </div>

            <div className="cards-holder">
                <LayoutCard imgSrc={verticalOne} desc={"Vertical One"} additionalClass={"hoverable vertical"} layout="V1" onClickFN={changeLayout} ref={vertOne} />
                <LayoutCard imgSrc={verticalTwo} desc={"Vertical Two"} additionalClass={"hoverable vertical"} layout="V2" onClickFN={changeLayout} ref={vertTwo} />
            </div>
            <button onClick={(e) => { e.preventDefault(); addToDB("H1") }}>Submit</button>
        </div>
    );
}

export default Layout;
