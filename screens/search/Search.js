import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import UpComming from "../upComming/UpComming";
import { useNavigation } from "@react-navigation/native";
// import { async } from '@firebase/util'

const Search = () => {
  const [searches, setsearches] = useState([]);
  const [input, setinput] = useState("");
  const navigation = useNavigation();
  // const Searcesmovies = async () => {
  //   const Api_Url = `https://api.themoviedb.org/3/search/movie?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&query=12996&page=1&include_adult=false`;
  //   let res = await fetch(Api_Url);
  //   let data = await res.json();
  //   console.log("dataset ", data.results);
  //   setsearches(data.results);
  // };

  useEffect(() => {
    // Searcesmovies();
    searchmovie();
  }, [input]);

  const searchmovie = async () => {
    const Api_Url = `https://api.themoviedb.org/3/search/movie?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&query=${input}&page=1&include_adult=false`;
    let res = await fetch(Api_Url);
    let data = await res.json();
    console.log("new data", data.results);
    setsearches(data.results);
  };
 

  // if (searches !==null){
  //     return<>
  //     </>
  // }
  // else{

  //     return <View><Text>Type anyThing</Text></View>
  // }
  const RenderSearch = ({ data }) => {
    return (
      <TouchableOpacity onPress={() => Information(data.id)}>
        <View style={styles.allmatch}>
          <Image
            style={styles.matchimages}
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
            }}
          />
          <Text style={styles.matchtitle}>{data.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const Information = (id) => {
    navigation.navigate("Info", { id: id });
  };
  const marvelScreen =()=>{
    navigation.navigate('Marvel')
  }

  return (
    <View style={styles.searchmain}>
      <View style={styles.header}>
        <TextInput
          style={styles.textArea}
          placeholder="Search...."
          autoCapitalize="false"
          autoCorrect={false}
          onChangeText={(e) => setinput(e)}
        />
        <View>
          <TouchableOpacity onPress={() => searchmovie()}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainAll}>
        <FlatList
          data={searches}
          renderItem={({ item }) => <RenderSearch data={item} />}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
      <TouchableOpacity onPress={()=>marvelScreen()}>
      <View>
        <Text style={styles.mainhead}> Marvel Cinematic</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.mgentop }>
      <UpComming  />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchmain: {
    backgroundColor: "black",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textArea: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "white",
    width: "90%",
    margin: 10,
  },
  search: {
    color: "white",
    fontSize: 35,
    padding: 10,
    marginRight: 15,
  },
  matchimages: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  matchtitle: {
    color: "white",
  },
  allmatch: {
    padding: 5,
  },
  mainhead: {
    marginTop:5,
    marginBottom:5,
    borderBottomWidth:1,
    borderTopWidth :1,
    borderStyle:"solid",
    borderColor:'white',
    color: "white",
    padding: 10,
    fontSize: 19,
    fontWeight: "600",
  },
  mgentop:{
    marginTop:20
  }
});

export default Search;
