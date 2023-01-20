import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from "../../firebase";
import { getAuth, signOut } from 'firebase/auth';


const firestore = firebase.firestore()
const Setting = () => {
const [userData , setuserData] = useState('')
const [currUserInfo,setcurrUserInfo] = useState('')
const Auth = getAuth()
const currentUser = Auth.currentUser.uid
  const UserInfo = async()=>{
  // let data = await firestore.collection("users").get().then();

let data = await firestore.collection('users').get().then((ID)=>{ ID.docs.map((d) => UserContiIDS(d.data()))})

    // setuserData(data.docs.map(docSnap => docSnap.data().uid)
  } 
  const UserContiIDS =(id)=>{
    // console.log("first ",id)
// console.log("currentUser ",currentUser)
  if(currentUser === id.uid){
    console.log("userdata id avalable")
    setcurrUserInfo(id)
    console.log("currUserInfo",currUserInfo)
    // console.log("user data", currUserInfo)
  }
  else{
    console.log("user data id not avalabile")
  }
  }
  const SignOut =()=>{
    signOut(Auth)
  }

  useEffect (()=>{
    UserInfo()
  },[])

  return (
    <View>
    <View style={styles.infoSection}>
      <Text style={styles.userName}>{currUserInfo.name}</Text>
      <Text style={styles.email}>Email : {currUserInfo.email}</Text>
      </View>
      <TouchableOpacity onPress={()=>SignOut()}><View style={styles.buttons}>
            <Text style={styles.button}>Sign Out</Text>
          </View></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  userName:{
    fontSize:22,
    fontWeight:'600',
    marginBottom:10
  },
  email:{
    fontSize:20,
    fontWeight:'500'
  },
  infoSection:{
    height:300,
    width:"100%",
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "black",
    backgroundColor: "white",
    width: 150,
    height: 45,
    borderRadius: 15,
    marginBottom: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: "600",
    fontSize: 18,
  },
})
export default Setting