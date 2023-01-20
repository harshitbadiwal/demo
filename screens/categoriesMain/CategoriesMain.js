import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
const CategoriesMain = ({ id }) => {
    const [cateItem, setcateItem] = useState([]);
    const [loading, setloading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        CategoriesItems();
    }, [id]);
    // console.log('idint',id)
    const CategoriesItems = async () => {
        const Api_url = `https://api.themoviedb.org/3/discover/movie?api_key=b6961d8a574415410005902a2f3e4d23&language=en-US&name=Music&with_genres=${id}`;
        let res = await fetch(Api_url);
        let data = await res.json();
        setcateItem(data.results);
        setloading(false);
        // console.log("data",cateItem);
    };
    if (loading) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }
    const RendercateItem = ({ data }) => {
        return (
            <>
                <TouchableOpacity onPress={() => infopart(data.id)}>
                    <View style={styles.maincate}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
                            }}
                        />
                        <Text style={styles.name}>{data.title}</Text>
                    </View>
                </TouchableOpacity>
            </>
        );
    };
    const infopart = (id) => {
        navigation.navigate("Info", { UUid: id });
    };

    return (
        <View>
            <SafeAreaView>
                <FlatList
                    data={cateItem}
                    renderItem={({ item }) => <RendercateItem data={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
};
const styles = StyleSheet.create({
    maincate: {
        width: 200,
        height: 220,
        padding: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    name: {
        color: "white",
        marginTop: -30,
        paddingLeft: 5,
        fontWeight: "600",
    },
});
export default CategoriesMain;
