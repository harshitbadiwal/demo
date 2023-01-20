import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const firestore = firebase.firestore();
const ContinueW = ({ Uid }) => {
  const [continueData, setcontinueData] = useState("");
  const [loading, setloading] = useState(true);
  const navigation = useNavigation();
  let Continue = [];
  const ContiID = async () => {
    await firestore
      .collection("users")
      .doc(Uid)
      .collection("continue")
      .get()
      .then((ID) => {
        ID.docs.map((d) => contiMovies(d.data().id));
      });
  };
  const contiMovies = async (id) => {
    try {
      // console.log('id is here',id)
      const Api_Url = `https://api.themoviedb.org/3/movie/${id}?api_key=b6961d8a574415410005902a2f3e4d23`;
      let data = await fetch(Api_Url);
      let ress = await data.json();
      Continue.push(ress);
      setcontinueData(Continue);
      setloading(false);
      // setcontinueData((prevState) => ({ ...prevState,ress}))
      // setcontinueData([...continueData],(ress))
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(" setcontinueData : ", continueData);

  useEffect(() => {
    ContiID();
    
    // RenderContidata()
  }, [loading]);

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  const RenderContidata = ({ data }) => {
    return (
      <TouchableOpacity onPress={() => infodata(data.id)}>
        <View style={styles.contain}>
          <Image
            style={styles.image}
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + data.poster_path,
            }}
          />
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const infodata = (id) => {
    navigation.navigate("Info", { UUid: id });
  };

  return (
    <View>
      <Text style={styles.mainhead}>Continue Watch</Text>
      {/* {console.log("ghsjvgjhvzsmnv ",Continue)} */}
      {/* <View style={styles.contain}>
          <Image style={styles.image} source={{uri:"https://image.tmdb.org/t/p/w500"+continueData.backdrop_path}}/>
          <Text style={styles.title}>{continueData.title}</Text>
        </View> */}

      {/* <Image style={styles.image} source={{uri:"https://image.tmdb.org/t/p/w500"+continueData.backdrop_path}}/> */}
      {/* <Text style={styles.title}>{continueData.title}</Text> */}
      <View>
        <FlatList
          data={continueData}
          renderItem={({ item }) => <RenderContidata data={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainhead: {
    color: "white",
    padding: 10,
    fontSize: 20,
    fontWeight: "600",
  },
  contain: {
    width: 200,
    height: 200,
    padding: 5,
  },
  image: {
    width: "100%",
    borderRadius: 10,
    // marginLeft:5,
    height: "90%",
  },
  title: {
    color: "white",
    padding: 5,
  },
});

export default ContinueW;
