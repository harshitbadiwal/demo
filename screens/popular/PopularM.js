import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  
} from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {useNavigation} from "@react-navigation/native"
import firebase from "../../firebase";
// import UserInfo from/ "../../stack/Userinfo";

const firestore = firebase.firestore()
const PopularM = ({Uid}) => {
  const navigation = useNavigation()
  // const { width, height } = Dimensions.get("window");
  const [loading, setloading] = useState(true);
  const [popular, setpopular] = useState([]);

  // console.log('popularMovie',Uid)
  useEffect(() => {
    popularMovies();
   
  },[] );
const Cuid = Uid


  const popularMovies = async () => {
    const Api_url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&page=1";
    let res = await fetch(Api_url);
    let data = await res.json();
    setpopular(data.results);
    setloading(false);
  };

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  const Rendermovies = ({data}) => {
    return (
      <TouchableOpacity onPress={()=>populardata(data.id)}>
      <View style={styles.maincontainer}>
        <Image
          style={styles.moviesimage}
          source={{uri: "https://image.tmdb.org/t/p/w500" + data.backdrop_path
        }}
          alt=""
        />
        {/* {console.log('cgsjhcjcjc', data)} */}
        <Text style={styles.movieName}>{data.title}</Text>
        <Text style={styles.rating}>Rating: {data.vote_average}</Text>
      </View>
      </TouchableOpacity>
    );

  };
const populardata = (id,) =>{
    console.log('poplar  ',Uid)
    navigation.navigate('Info',{UUid:id})
    console.log("popular image",popular.title)
  const continueId = firebase.firestore().collection('users').doc(Cuid).collection('continue').add({
    id:id
   })
  //  console.log('continueId ', continueId)
  }

  const search =() =>{
    navigation.navigate('search')
  }
  return (
    <View>
        <View style={styles.container}>
          <View>
          <Text style={styles.sectionName}>
                Top Movies 
            </Text>
          </View>
          {/* <View>
            <TouchableOpacity onPress={()=>search()}>
          <Text style={styles.search}>Search</Text>
          </TouchableOpacity>
          </View> */}
           
            
        </View>
      
      <SafeAreaView style={styles.container}>
      
        <FlatList
          data={popular}
          renderItem={({item})=><Rendermovies data={item}/>}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
     
      </SafeAreaView>
     
    </View>
  );
};
const styles = StyleSheet.create({
    sectionName:{
        color:'white',
        padding:10,
        fontSize:20,
        marginBottom:0,
        fontWeight:"700",
      
    },
    search:{
      color:"black",
      padding:10,
      backgroundColor:"white",
      borderRadius:10,
      marginTop:5,
      marginRight:10,
      fontSize:16
      
    },
    container:{
      display:'flex',
      alignContent:"center",
      justifyContent:'space-between',
      flexDirection:"row"
    },
  maincontainer: {
    width:392,
    elevation: 20,
    height: 240,
    padding:5,
    marginTop:0
    
    // display:'flex',
    // flexDirection:'column',
    // elevation: 20,
  },
  moviesimage: {
    height: "100%",
    width: "100%",
    borderRadius:15,
    padding:5

  },
  movieName:{
    color:'white',
    marginTop:-40,
    fontWeight:"600",
    paddingLeft:15,
    fontSize:16
  },
  rating:{
    paddingLeft:15,
    color:'white',
    marginTop : -5
  }
});

export default PopularM;
