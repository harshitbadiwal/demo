import { View, Text,FlatList, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoriesMain from '../categoriesMain/CategoriesMain'
import { ActivityIndicator } from "react-native";


const Categories = () => {
    const [categories,setcategories] = useState([])
    const [categoriesId,setcategoriesId] = useState('')
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        Categoriesmovies()
    },[])

  const  Categoriesmovies = async()=>{
    const Api_url ="https://api.themoviedb.org/3/genre/movie/list?api_key=b6961d8a574415410005902a2f3e4d23";
    let res = await fetch(Api_url)
    let data = await res.json()
    setcategories(data.genres)
    setcategoriesId(data.genres[0].id)
    // console.log('categories ',categories)
      setloading(false);
  }
  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }
  const RenderCate =({data})=>{
    return(
        <TouchableOpacity onPress={()=>genresId(data.id)}>
        <View style ={styles.catelist}>
            <Text style={styles.cateName}>{data.name}</Text>
        </View>
        </TouchableOpacity>
    )
  }
  
  const genresId =(id)=>{
    console.log('id',id);
    // categoriesId(id)
    setcategoriesId(id)
  }
  return (
    <View>
     <View><Text style={styles.sectionName}>Categories</Text></View>
        <SafeAreaView>
        <FlatList
        data={categories}
        renderItem={({item})=><RenderCate data={item}/>}
        keyExtractor={(item)=> item.id}
        horizontal
        />
        </SafeAreaView>
        <CategoriesMain id={categoriesId} />
    </View>
  )
}
const styles= StyleSheet.create({
  sectionName:{
    fontSize:20,
    color:'white',
    fontWeight:'600',
    padding:10
  },
    catelist:{
        padding:7,
        
    },
cateName:{
    color:'black',
    backgroundColor:'white',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:10,
    fontSize:15
}
})

export default Categories