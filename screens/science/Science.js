import { View, Text,StyleSheet, SafeAreaView, FlatList,ActivityIndicator,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
const Science = () => {
    const [Movie,setMovies] = useState([])
    const [loading,setloading] = useState(true)
    const navigation = useNavigation()
    useEffect(()=>{
       ScienceMovies()
    },[])
        const ScienceMovies= async()=>{
            const Api_url = "https://api.themoviedb.org/3/discover/movie?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&with_genres=878";
            let res = await fetch(Api_url)
            let data = await res.json()
            setMovies(data.results)
            setloading(false)
        }
        if (loading) {
            return <ActivityIndicator size="small" color="#0000ff" />;
        }
        const RenderScience =({data})=>{
                return<>
                <View style={styles.maincate}>
                <TouchableOpacity onPress={()=>infosection(data.id)}>
                    <Image style={styles.image} source={{uri:'https://image.tmdb.org/t/p/w500'+data.backdrop_path}}/>
                    <Text style={styles.name}>{data.title}</Text>
                    </TouchableOpacity>
                </View>
                </>
        }
        const infosection =(id)=>{
            navigation.navigate('Info', {UUid:id})
        }
  return (
    <View>
        <View><Text style={styles.sectionName}>Science Friction </Text></View>
        <SafeAreaView>
            <FlatList
            data={Movie}
            renderItem={({item})=><RenderScience data={item}/>}
            keyExtractor={(item)=>item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    </View>
  )
}
const styles= StyleSheet.create({
    sectionName:{
        color:'white',
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
})

export default Science