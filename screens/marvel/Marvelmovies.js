import { View, Text,Image,StyleSheet,ActivityIndicator,SafeAreaView,FlatList,TouchableOpacity, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'


const Marvelmovies = () => {
    const [movie,setmovie] = useState([])
    const [loading,setloading] = useState(true)
    const [collectionMarvel,setcollectionMarvel] = useState([])
    const [starMovies,setstarMovies] = useState([])
    const navigation = useNavigation()

    const marvelMovie= async() =>{
        const Api_Url ='https://api.themoviedb.org/3/search/movie?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&query=Avengers&page&include_adult=false'
        let res = await fetch((Api_Url))
        let data = await res.json()
        setmovie(data.results)
        setloading(false)
    }

    const StarWarMovies = async()=>{
        const Api_URL = 'https://api.themoviedb.org/3/search/movie?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&query=star wars&page&include_adult=false'
        let res2 = await fetch(Api_URL) 
        let data2 = await res2.json()
        setstarMovies(data2.results)
        // console.log("marvel collection", starMovies)
        
    }
    const MarvelCollection =async()=>{
        const Api_Url3 ='https://api.themoviedb.org/3/search/movie?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&query=marvel&page&include_adult=false'
        let res3 = await fetch(Api_Url3)
        let data3 = await res3.json()
        setcollectionMarvel(data3.results)
        console.log("marvel collection",collectionMarvel)
    }

    useEffect(()=>{
        marvelMovie()
        StarWarMovies()
        MarvelCollection()
    },[])
    if (loading) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }


    const RenderAvenger =({data})=>{
        return<>
        <View style={styles.maincate}>
        <TouchableOpacity onPress={()=>movieData(data.id)} >
            <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w500'+data.backdrop_path}}/>
            <Text style={styles.name}>{data.title}</Text>
            </TouchableOpacity>
        </View>
        </>
}
const RendermarvelCollection =({data})=>{
    return(
    <View style={styles.maincate}>
        <TouchableOpacity onPress={()=>movieData(data.id)} >
            <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w500'+data.backdrop_path}}/>
            <Text style={styles.name}>{data.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const RenderStarWar =({data})=>{
    return<>
    <View style={styles.maincate}>
    <TouchableOpacity onPress={()=> movieData(data.id)} >
        <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w500'+data.backdrop_path}}/>
        <Text style={styles.name}>{data.title}</Text>
        </TouchableOpacity>
    </View>
    </>
}

const movieData =(id)=>{
    navigation.navigate('Info',{UUid:id})
}

  return (
    <ScrollView>
    <View style={styles.background}>
     
      <SafeAreaView>
        <View><Text style={styles.mainhead}>Avengers</Text></View>
            <FlatList
            data={movie}
            renderItem={({item})=><RenderAvenger data={item}/>}
            keyExtractor={(item)=>item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
               <View><Text style={styles.mainhead}>Marvel</Text></View>
            <FlatList
            data={collectionMarvel}
            renderItem={({item})=><RendermarvelCollection data={item}/>}
            keyExtractor={(item)=>item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
            <View><Text style={styles.mainhead}>Star War</Text></View>
            <FlatList
            data={starMovies}
            renderItem={({item})=><RenderStarWar data={item}/>}
            keyExtractor={(item)=>item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
           
        </SafeAreaView>
        
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
movieTitle:{
    color:'white',
    fontSize:15,
    width :20
},
cart:{
    width:240,
    height:200
},
background:{
    backgroundColor:'black'
}
,movieImage:{
    width:'100%',
    height:'90%'
},
sectionName:{
        padding:10,
    fontSize:20,
    fontWeight:'600'
},
image:{
    width:"100%",
        height:'100%',
        borderRadius:20
},
name:{
    color:"white",
    marginTop:-30,
    paddingLeft:5,
    fontWeight:'600'
},maincate:{
    width:200,
    height:220,
    padding:10
},
mainhead: {
    marginTop:5,
    marginBottom:5,
    
    borderStyle:"solid",
    borderColor:'white',
    color: "white",
    padding: 10,
    fontSize: 19,
    fontWeight: "600",
  },
})

export default Marvelmovies