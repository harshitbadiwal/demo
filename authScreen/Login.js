import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
const Login = () => {
const [email,setemail] = useState('')
const [password,setpassword] = useState('')
const navigation = useNavigation()
const Auth = getAuth()
    const loginuser = async() =>{
        const user= await signInWithEmailAndPassword(Auth,email,password)
        console.log('users',user)
    }

    const register =() =>{
       navigation.navigate('register')
    }
  return <>
    <View>
       <View style={styles.loginMain}>
        <Text style={styles.mainheading}>Login </Text>
      
       <View style={styles.loginName}>
       <Text style={styles.namedisc}>Enter your email:</Text>
       <TextInput
        style={styles.textArea}
       placeholder='email@gmail.com'
       autoCapitalize='false'
       autoCorrect={false}
       onChangeText={e =>setemail(e)}
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
       onChangeText ={e =>setpassword(e)}
       />
       </View>
       <TouchableOpacity style={styles.btn} onPress={()=>loginuser()}>
        <Text style ={styles.btnname} >Login</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.registerName} onPress={()=>register()}>
        <Text>Register! Account</Text>
       </TouchableOpacity>

       </View>
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
    registerName:{
        textAlign:'center',
        width:'100%',
        paddingLeft:10
    }

})
export default Login