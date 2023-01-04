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

        if (link.current.value === '')
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

    return (
        <div>
            <div className="rssPage-holder">
                <div className="link-submit-holder">
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

                <div className="outside">
                    <div className="temp-div">
                        RSS Links
                    </div>

                    <div className="rss-housing">
                        {Object.keys(links).map((value, index) =>
                            <div className="link-holder" key={index}>
                                <h3>{value}</h3>
                                <i class="bi bi-trash3" onClick={async () => {
                                    let newArr = { ...links }
                                    delete newArr[value]
                                    await updateDoc(doc(db, 'users', user), { rssLinks: newArr })
                                }}></i>
                            </div>)}
                    </div>
                </div>

            </div>
        </div>


    )
}










