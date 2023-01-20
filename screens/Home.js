import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import PopularM from "./popular/PopularM";
import Categories from "./categories/Categories";
import Horrer from "./Horrer/Horrer";
import UpComming from "./upComming/UpComming";
import TvMovies from "./tvMovies/TvMovies";
import Science from "./science/Science";
import { getAuth, signOut } from "firebase/auth";
import ContinueW from "./continue/ContinueW";

const Home = () => {
  useEffect(() => {}, []);

  const Auth = getAuth();
  const logOut = () => {
    signOut(Auth);
  };
  const currId = Auth.currentUser.uid;
  // console.log("auth ",Auth.currentUser.uid)
  return (
    <View style={styles.main}>
      <ScrollView>
        <View>
          <PopularM Uid={currId} />
          <ContinueW Uid={currId} />
          <Categories />
          <Horrer />
          <UpComming />
          <TvMovies />
          <Science />
        </View>
        <TouchableOpacity onPress={() => logOut()}>
          <View style={styles.buttons}>
            <Text style={styles.button}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "black",
    backgroundColor: "white",
    width: 150,
    height: 35,
    borderRadius: 15,
    marginBottom: 20,
    textAlign: "center",
    padding: 5,
    fontWeight: "600",
    fontSize: 18,
  },
});
export default Home;
