import { StatusBar } from 'expo-status-bar';
import { Settings, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from './authScreen/Login';
import Register from './authScreen/Register';
import app from './firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Home from './screens/Home';
import MoviesInfo from './screens/infoMovies/MoviesInfo';
import Search from './screens/search/Search';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sports from './screens/sports/Sports';
import Marvelmovies from './screens/marvel/Marvelmovies';
import Setting from './screens/setti/Setting';
// import { Firebase } from 'firebase';

const stack= createNativeStackNavigator()
 const Tabs = createBottomTabNavigator ()
 const Drawer = createDrawerNavigator();

 function App() {
const [existinguser, setexistinguser] = useState(null)
const Auth = getAuth()
useEffect(()=>{
const users= onAuthStateChanged(Auth,(user)=>{
 setexistinguser(user)
})
},[existinguser])

const MyDrawer =()=>{
  return(
    <Drawer.Navigator >
      {/* <Drawer.Screen name='Movies' component={Home}/>
      <Drawer.Screen name='searches' component={Search} />  */}
    </Drawer.Navigator>
    
  )
}

const Tab =()=>{
return(
  <Tabs.Navigator>
    <Tabs.Screen style={styles.headname} name='Movies' component={MainStack}/>
    <Tabs.Screen name='Search' component={Search}/>
    <Tabs.Screen name='Setting' component={Setting} /> 
  </Tabs.Navigator>
)
}

const AuthStack =()=>{
  return(
    <>
    <stack.Navigator>
      <stack.Screen  name='login' component={Login} />
      <stack.Screen name='register' component={Register} />
     
    </stack.Navigator>
    </>
  )
}
const MainStack =()=>{
  return(
    <>
    <stack.Navigator initialRouteName='Movies' >
      <stack.Screen name='Info' component={MoviesInfo}/>
      <stack.Screen name='search' component ={Search} />
      <stack.Screen name='Movies' component={Home} />
      <stack.Screen name='Marvel' component={Marvelmovies} />
    </stack.Navigator>
    </>
  )
}
  return (
   <NavigationContainer>
   {existinguser !==null ? <Tab/>:<AuthStack/>}
   </NavigationContainer>
  );



 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headname:{
    display:'none',
    height:1
  }
});
 export default App