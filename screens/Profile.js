import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Entypo, SimpleLineIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import { useAppContext } from '../ContextAPI/AppContext';

const Profile = ({ navigation }) => {
  const { likedSongs, removeLikedSong } = useAppContext();
  const [menuVisibility, setMenuVisibility] = useState({});

  const handleLikedSongPress = (song) => {
    console.log(`Liked song pressed: ${song.nameSong}`);
  };

  const toggleMenu = (itemId) => {
    console.log("Toggling menu for item ID:", itemId);
    setMenuVisibility((prevMenuVisibility) => ({
      ...prevMenuVisibility,
      [itemId]: !prevMenuVisibility[itemId],
    }));
  };


  const renderLikedSong = ({ item }) => {
    const handleToggleMenu = (itemId) => {
      console.log("Toggling menu for item ID:", itemId);
      setMenuVisibility((prevMenuVisibility) => ({
        ...prevMenuVisibility,
        [itemId]: !prevMenuVisibility[itemId],
      }));
    };
  
    const handleRemoveSong = (song) => {
      console.log("Removing song:", song);
      console.log(song.id)
      removeLikedSong(song.id);
      handleToggleMenu(song.id);
    };
  
    return (
      <TouchableOpacity
        onPress={() => {
          handleLikedSongPress(item);
          navigation.navigate("SongMusic", { song: item });
        }}
      >
        <View style={styles.likedSongItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ paddingRight: 10 }}>
              <Image style={{ width: 60, height: 60, borderRadius: 6 }} source={{ uri: item.image }} />
            </View>
            <View>
              <Text style={{ fontWeight: "700" }}>{item.nameSong}</Text>
              <Text>{item.artist}</Text>
            </View>
          </View>
          <View style={styles.likedSongOptions}>
            <Entypo
              name="dots-three-horizontal"
              size={20}
              color="grey"
              onPress={() =>  handleToggleMenu(item.id)}
              style={styles.optionsIcon}
            />
            {menuVisibility[item.id] && (
              <TouchableOpacity onPress={() => handleRemoveSong(item)}>
                <Text style={{ color: 'red', marginLeft: 10 }}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/332339988_911941676608916_4773911433797269542_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=dVeYQ0Hmp8IAX-MO2Dx&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBwdoSBE3K977DrabNlknmboQ6qT2u5aYGE9VLtSORAHQ&oe=657B1A63',
            }}
          />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.UserName}>Nguyễn Kiên Sơn</Text>
        <View style={styles.infoFollower}>
          <Text style={{ color: '#777' }}>0</Text>
          <Text style={{ color: '#777' }}>Follower .</Text>
          <Text style={{ color: '#777' }}>0</Text>
          <Text style={{ color: '#777' }}>Following</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.actionItem}>
          <Octicons name="pencil" size={24} color="black" />
          <Entypo style={{ paddingLeft: 20 }} name="dots-three-horizontal" size={20} color="grey" />
        </View>
        <View style={styles.actionItem}>
          <FontAwesome style={{ paddingHorizontal: 18 }} name="random" size={20} color="grey" />
          <SimpleLineIcons name="control-play" size={24} color="black" />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingTop: 30 }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Pinned to Spotlight</Text>
          <Text style={{ color: 'gray' }}>Pin items to Spotlight</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: 'gray', fontWeight: '700' }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Bài hát yêu thích</Text>
        <FlatList
          data={likedSongs}
          renderItem={renderLikedSong}
          keyExtractor={(item, index) => index.toString()}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'gray', // Đặt màu nền xám cho header
    height: 120,
    position: 'relative'
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    paddingTop: 80,
    paddingLeft: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: '600'
  },
  info: {
    marginTop: 90
  },
  UserName: {
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 20,
  },
  infoFollower: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
    gap: 5,
  },
  actionContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likedSongItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },

  likedSongName: {
    fontSize: 16,
    fontWeight: '500',
  },

  likedSongOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionsIcon: {
    marginLeft: 10,
  },
});


export default Profile;
