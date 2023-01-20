import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import '../Styles/Layout.css'
import { async } from "@firebase/util";

function Layout(){
  const [currUser] = useAuthState(auth);
  const [layout, setLayout] = useState('');


  useEffect(() => {
    getUserOption()
  }, [currUser])


  const getUserOption = async () => {
    if (currUser == null) {
      return;
    }
    try {
        const q = query(
            collection(db, 'users'),
            where('uid', '==', currUser?.uid)
        );
        const userDoc = await getDocs(q);
        const userOption = userDoc.docs[0].get("layout")
        if(userOption===""){
          document.querySelector('input[value="H1"]').checked = true;
        } else{
          document.querySelector("input[value=" + userOption +"]").checked = true;
        }
    } catch (err) {
        console.log(err);
        alert('An error had occurred while fetching the users name');
        return;

    }
  }



  // async function changeLayout(e){
  //   var radioValue = document.querySelector('input[name="layout"]:checked').value
  //   setLayout(radioValue)

  // }

  const changeLayout = async (e) => {
    e.preventDefault();

    var radioValue = document.querySelector('input[name="layout"]:checked').value
    console.log(radioValue)
    await addToDB(radioValue)
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

        await updateDoc(doc(db, "users", docID), { layout: val })

    } catch (err) {
        console.error(err)
        alert("Unable to save layout.")
    }
}

  return(
    <div className='layout-holder'>
      <h1 className="titlew">Layout</h1>
      <div className="layout-option-holder">
        <form>
          <div className='radio-button'>
            <input type="radio" id="H1" name="layout" value="H1" />
            <label for="H1">Horizontal 1</label>
          </div>
        
          <div className='radio-button'>
            <input type="radio" id="H2" name="layout" value="H2" />
            <label for="H2">Horizontal 2</label>
          </div>

          <div className='radio-button'>
            <input type="radio" id="V1" name="layout" value="V1" />
            <label for="V1">Vertical 1</label>
          </div>

          <div className='radio-button'>
            <input type="radio" id="V2" name="layout" value="V2" />
            <label for="V2">Vertical 2</label>
          </div>

          <div>
            <button type="submit" onClick={(e)=>{changeLayout(e); e.preventDefault();}} className='change-button'>Change</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Layout;
