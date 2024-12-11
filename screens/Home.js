import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import albumData from "../data-json/album.json";
import PopularAlbum from "../components/PopularAlbum";

import albumChill from "../data-json/albumChill.json"
import AlbumChill from "../components/AlbumChill";

const Home = ({ navigation }) => {
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginTop: 10 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.messageDay}>{message}</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialCommunityIcons name="cast-connected" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Messages")}>
            <Ionicons name="mail-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="arrow-up-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.Avatar}>
            {/* Avatar component */}
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                style={styles.imgAvatar}
                source={{
                  uri: "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/332339988_911941676608916_4773911433797269542_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=429skGamyOUAX__Xy2H&_nc_ht=scontent.fhan14-4.fna&oh=00_AfDm4FXf6H3R6Jbh85RNn_qJtaDxfiY8lWC65eGwTyZ2ag&oe=656753E3",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.Title}>Popular Album</Text>
        <FlatList
          data={albumData} // Sử dụng dữ liệu từ album.json
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()} // Xác định key cho mỗi item trong danh sách
          renderItem={({ item }) => (
            <PopularAlbum item={item} navigation={navigation} />
          )}
        />


        <Image
          style={{ height: 250, width: "100%" }}
          source={require("../assets/img/poster2.jpg")}
        />


        <Text style={styles.Title}>Chill</Text>
        <FlatList
          data={albumChill} // Sử dụng dữ liệu từ album.json
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()} // Xác định key cho mỗi item trong danh sách
          renderItem={({ item }) => (
            <AlbumChill item={item} navigation={navigation} />
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",  // Màu nền trắng
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    marginHorizontal: 6
  },
  Avatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgAvatar: {
    width: 42,
    height: 42,
    borderRadius: 20,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginRight: 10,
    
  },
  messageDay: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },

  Title: {
    marginLeft: 20,
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 13,
  },
});

export default Home;
