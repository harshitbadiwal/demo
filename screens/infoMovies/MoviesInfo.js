import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ViewBase,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState,useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../../firebase";
import {useNavigation} from '@react-navigation/native'
// import Video from "react-native-video";
import { Video } from "expo-av";
// import YoutubeIframe from "react-native-youtube-iframe";
import YoutubePlayer from "react-native-youtube-iframe";
 
const firestore = firebase.firestore();

const MoviesInfo = ({ route }) => {

  const { UUid } = route.params;
  const [moviesinfo, setmoviesinfo] = useState([]);
  const [starCast, setstarCast] = useState([]);
  const [loading, setloading] = useState(true);
  const [buttonShow, setbuttonShow] = useState(null);
  const [video , setvideo] = useState('')
  const [ContiID, setContiID] = useState("");
  const Auth = getAuth();
  const playvideo = React.useRef(null);
  const currId = Auth.currentUser.uid;
  const navigation = useNavigation()
  const [status, setStatus] = React.useState({});
  const controlRef = useRef();
  const [playing, setPlaying] = useState(false);

  // console.log("authss",currId)

  const checkingMovie = async () => {
    const IDS = await firestore
      .collection("users")
      .doc(currId)
      .collection("continue")
      .get()
      .then((ID) => {
        ID.docs.map((d) => UserContiIDS(d.data().id));
        ID.docs.map((e) => setContiID(e));
      });
    // console.log("contiIDS", ContiID);
  };

  const UserContiIDS = (id) => {
    // console.log("idsajhsgcj ", id)
    if (UUid === id) {
      setbuttonShow(id);
      // console.log("currIdcurrIdcurrId ", buttonShow);
    }
  };

  const movieInfo = async () => {
    const Api_url = `https://api.themoviedb.org/3/movie/${UUid}?api_key=b6961d8a574415410005902a2f3e4d23`;
    let res = await fetch(Api_url);
    let data = await res.json();
    setmoviesinfo(data);
    console.log("/////////////setmoviesinfo///////", moviesinfo)
  };
const getVideos = async()=>{
  const VideoApi_Url = `http://api.themoviedb.org/3/movie/${UUid}/videos?api_key=b6961d8a574415410005902a2f3e4d23`
  let res = await fetch(VideoApi_Url)
  let data = await res.json()
  setvideo(data.results)
  console.log("/////////////info//////",video)
}

  const StarCastInfo = async () => {
    const Api_Url = `https://api.themoviedb.org/3/movie/${UUid}/credits?api_key=b6961d8a574415410005902a2f3e4d23`;
    let res = await fetch(Api_Url);
    let data = await res.json();
    setstarCast(data.cast);
    setloading(false);
  };
  useEffect(() => {
    movieInfo();
    StarCastInfo();
    checkingMovie();
    getVideos()
    // UserContiIDS()
    // console.log('data ',moviesinfo)
  }, [loading]);
  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  const RenderStarcast = ({ data }) => {
    return (
      <>
        {data.profile_path ? (
          <View style={styles.starinfo}>
            <Image
              style={styles.starImage}
              source={{
                uri: "https://image.tmdb.org/t/p/w500" + data.profile_path,
              }}
            />
            <Text style={styles.starname}>{data.original_name}</Text>
          </View>
        ) : (
          ""
        )}
      </>
    );
  };

  const removeContiWatch = (id) => {
    console.log("remove Clicked", id);
    firestore
      .collection("users")
      .doc(currId)
      .collection("continue")
      .doc(id)
      .delete();
      navigation.navigate('Movies')
  };
  const addtoWatch = (id) =>{
    firestore.collection('users').doc(currId).collection('continue').add(
      {id:id}
    )
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <View>
          <View style={styles.imageinfo}>
         
            {/* <Video
            ref={playvideo}  style={styles.image}  source={{
                // uri:'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
                uri:'https://www.youtube.com/watch?v=6379a73fc9dbf900c0e82bea'
              }}
              useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
              /> */}
  <YoutubePlayer
  // style={styles.image}
  height={500}
  // videoId={moviesinfo.id} 
  videoId={'TcMBFSGVi1c'}  
  />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{moviesinfo.title}</Text>
            <Text style={styles.time}>
              {moviesinfo.runtime} min : {moviesinfo.release_date}
            </Text>
            <Text style={styles.rating}>
              Rating : {moviesinfo.vote_average}
            </Text>
            <Text style={styles.tagline}>{moviesinfo.tagline}</Text>
            <Text style={styles.tagline}>Overview: {moviesinfo.overview}</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={starCast}
            renderItem={({ item }) => <RenderStarcast data={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          {buttonShow !== null ? (
            <TouchableOpacity onPress={() => removeContiWatch(ContiID.id)}>
              <View style={styles.btn}>
                <Text style={styles.removeBtn}>Remove</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={()=>addtoWatch(UUid)} >
            <View style={styles.btn}>
                <Text style={styles.removeBtn}>Add to Watch</Text>
              </View>
              </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    padding: 10,
  },
  imageinfo: {
    height: 700,
    width: 372,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  info: {
    padding: 10,
    marginTop: 8,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  rating: {
    marginTop: 3,
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  time: {
    marginTop: 3,
    fontSize: 15,
    color: "white",
    fontWeight: "500",
  },
  tagline: {
    marginTop: 3,
    color: "white",
    fontWeight: "400",
  },
  starinfo: {
    width: 150,
    height: 240,
    padding: 2,
  },
  starImage: {
    width: "100%",
    height: "90%",
  },
  starname: {
    color: "white",
  },
  btn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 15,
  },
  removeBtn: {
    padding: 10,
    backgroundColor: "white",
    width: "50%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default MoviesInfo;
