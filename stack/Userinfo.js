import firebase from "../firebase"
const userAuth = firebase.firestore()
export  const UserInfo= async(id)=>{
    const users = await userAuth.collection('users').doc(id).get()
    console.log("first",users)
} 