import { View, Text,StyleSheet,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import React, { useState } from 'react'
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// import firestore from 'firebase/compat/firestore'
import firebase from '../firebase'
import 'firebase/compat/firestore';
// import auth from "../firebase"

const firestore = firebase.firestore()
const Register = () => {
  const [email,setemail] = useState('')
  const [name , setname] = useState('')
  const [password,setpassword] = useState('')
    const Auth = getAuth()

const register = async()=>{
   try{
     const results = await createUserWithEmailAndPassword(Auth,email,password)
     const users = await firestore.collection('users').doc(results.user.uid).set({
     email:results.user.email,
     name:name,
     uid:results.user.uid
   })
    //  console.log("////////////////", user);

    // const users = await firestore.collection('users').doc(result.user.uid).set({
    //     uid: result.user.uid,
    //     name:name,
    //     email: result.user.email,
    // })
   }catch(err){
      console.log(err);
   }

}
  return <>
  <View>
    <ScrollView>
       <View style={styles.loginMain}>
        <Text style={styles.mainheading}>Register </Text>
      
       <View style={styles.loginName}>
       <Text style={styles.namedisc}>Enter your email:</Text>
       <TextInput
        style={styles.textArea}
       placeholder='email@gmail.com'
       autoCapitalize= {false}
       autoCorrect={false}
        onChangeText={e => setemail(e)}
       />
       
       </View>
       
       <View style={styles.loginName}>
       <Text style={styles.namedisc}>Enter your name:</Text>
       <TextInput
        style={styles.textArea}
       placeholder=' name'
       autoCapitalize= {false}
       autoCorrect={false}
       onChangeText={e =>setname(e)}
       />
       
       </View>
       <View style={styles.loginName}>
       <Text style={styles.namedisc}>Enter your password:</Text>
       <TextInput
        style={styles.textArea}
       placeholder='*************'
       secureTextEntry={true}
       autoCapitalize='false'
       autoCorrect={false}
       onChangeText ={e => setpassword(e)}
       />
       </View>
       <TouchableOpacity style={styles.btn} onPress={()=>register()}>
        <Text style ={styles.btnname} >Register</Text>
       </TouchableOpacity>
  

       </View>
       </ScrollView>
    </View>
    </>
}
const styles = StyleSheet.create({
    loginMain:{
        display:"flex",
      
        // justifyContent:'center',
        width:"100%",
        marginTop:"15%"
    },
    mainheading:{
        fontSize:35,
        marginBottom:'5%',
        fontWeight:'600',
        textAlign:'center'
    },
    loginName:{
        padding:15,
        // paddingLeft:15
    },
    namedisc:{
            fontSize:18,
            marginBottom: 5,
            paddingLeft:5
    },
    textArea:{
        borderWidth:1,
        padding:10,
        borderRadius:20,
        fontSize:18,
        fontWeight : '600'
    },
    btn:{
        marginTop:10,
        
        width:"100%",
        display:'flex',
        alignItems:'center',
        marginBottom:15
    },
    btnname:{
        width:"30%",
        textAlign:'center',
        padding:10,
        backgroundColor: '#7d7d7d',
        borderRadius:15,
        fontSize:18
    },
  

})

export default Register