import { useRef } from "react";
import Navbar from "../Components/Navbar";
import '../Styles/News.css'
import { db, auth } from "../firebase";
import { query, collection, getDocs, where, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export default function News() {

    const link = useRef();
    const linkName = useRef();
    const [links, setLinks] = useState({})
    const [currUser, loading] = useAuthState(auth);
    const [user, setUser] = useState("")

    const submit = async () => {
        if (loading)
            return;

        if (link.current.value === '' || linkName.current.value.trim() === '' )
            return;

        if (loading)
            return;
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const theDoc = await getDocs(q);
            setUser(theDoc.docs[0].id)
            let name = linkName.current.value
            let newLinks = { ...links, [name]: link.current.value }
            if (Object.keys(newLinks).length <= 4) {
                await updateDoc(doc(db, 'users', theDoc.docs[0].id), { rssLinks: newLinks })
                setLinks(newLinks)
            } else {
                alert("Only 4 News links allowed.")
            }
            link.current.value = ''
            linkName.current.value = ''
            closePopUp();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                // return userDoc.docs[0].id;
                await setUser(userDoc.docs[0].id)


            } catch (err) {
                return;
            }
        }

        const func = async () => {
            await getUser();
            if (user !== '') {
                const q = query(collection(db, "users"), where('uid', '==', currUser?.uid));
                const userDoc = await getDocs(q)

                const unsub = onSnapshot(doc(db, "users", userDoc.docs[0].id), (doc) => {
                    setLinks(doc.data().rssLinks)
                })
            }
        }

        func();

    }, [currUser, user])

    const closePopUp = () => {
        var popup = document.getElementsByClassName("link-submit-holder rss")[0];
        popup.style.visibility = 'hidden'
        popup.style.display = 'none'
    }

    const openPopUp = () => {
        
        var popup = document.getElementsByClassName("link-submit-holder rss")[0];
        popup.style.visibility = 'visible'
        popup.style.display = 'block'
    }

    return (
        <div>
            <div className="rssPage-holder rss">

                <div className="outside">
                    <div className="temp-div rss">
                        <h1>RSS Links</h1>
                    </div>

                    <div className="rss-housing">
                        {Object.keys(links).map((value, index) =>
                            <div className="icon-holdings" key={index}>
                                <div className="link-holder" key={index}>
                                    <h3>{value}</h3>
                                </div>
                                <i class="bi bi-trash3" onClick={async () => {
                                    let newArr = { ...links }
                                    delete newArr[value]
                                    await updateDoc(doc(db, 'users', user), { rssLinks: newArr })
                                }}></i>
                            </div>)}
                    </div>
                    <i onClick={()=>{openPopUp()}} class="bi bi-plus-lg rss"></i>
                </div>

                <div className="link-submit-holder rss">
                    <i onClick={()=>{closePopUp()}} class="bi bi-x"></i>
                    <form onSubmit={(e) => { e.preventDefault(); submit() }}>
                        <h1 className="rssLinkTitle">Import RSS Links
                            <h3>Use RSS Link to display news
                            </h3>
                        </h1>

                        <input className="input-rss" type="url" ref={link} placeholder="RSS link" />
                        <input className="input-rss" type="text" ref={linkName} placeholder="Link name" />
                        <button className="rss-submit" type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>


    )
}










