import { StyleSheet, View, ScrollView, Image, Pressable, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const DATA = [
  {
    id: 1,
    title: "Liked Tracks",
  },
  {
    id: 2,
    title: "Playlists",
  },
  {
    id: 3,
    title: "Albums",
  },
  {
    id: 4,
    title: "Pollowing",
  },
  {
    id: 5,
    title: "Stations",
  },
];

type ItemProps = {title: string};

const Item = ({ title }: ItemProps) => (
  <TouchableOpacity>
    <View style={[styles.item, styles.itemContainer]}>
      <Text style={styles.title}>{title}</Text>
      <MaterialIcons name="navigate-next" size={24} color="black" />
    </View>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
          <LinearGradient
            colors={['purple', 'orange']} // Define your gradient colors here
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 8, padding:6}}
          >
            <Text style={styles.getnextpro}>Get Next Pro</Text>
          </LinearGradient>
          </View>
          <View>
          <Text style={styles.library}>Library</Text>
          </View>
          <View style={styles.iconAvatarContainer}>
            <TouchableOpacity style={styles.iconContainer}>
              <MaterialCommunityIcons name="cast-connected" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Settings")}
            style={styles.iconContainer}
            >
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.Avatar}>
              {/* Avatar component */}
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  style={styles.imgAvatar}
                  source={{
                    uri: "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/332339988_911941676608916_4773911433797269542_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=fryArG6GaQQAX9FZaIz&_nc_ht=scontent.fhan18-1.fna&oh=00_AfA8X21eafBpOAWK1k6WHNaFOF9tPSQTFZF6svKbIGUK4g&oe=6549AA23",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id.toString()} // Convert id to string
        />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Màu nền trắng
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  library: {
    marginLeft: 30,
    fontSize: 16,
    fontWeight: '600'
  },
  iconAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginHorizontal: 6,
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
  },
  getnextpro: {
    fontSize: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 30,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
  }
});

export default Home;
