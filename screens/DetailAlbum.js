import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons, Ionicons, EvilIcons, Fontisto, AntDesign, Entypo, FontAwesome, SimpleLineIcons, FontAwesome5, Octicons } from '@expo/vector-icons';

import COLORS from '../constants/colors';
import { useAppContext } from '../ContextAPI/AppContext'

const DetailAlbum = ({ route, navigation }) => {
  const { album } = route.params;
  const { addLikedSong } = useAppContext();
  const [number, onChangeNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null); // Track the selected song for modal
  //const { addLikedSong, removeLikedSong } = useAppContext();

  const handleListItemPress = (item) => {
    // If the three-dot icon is pressed, show the modal
    setModalVisible(true);
    setSelectedSong(item);
  };

  const render = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("SongMusic", { song: item })}>
        <View style={styles.listMusic}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ paddingRight: 10 }}>
              <Image style={{ width: 60, height: 60, borderRadius: 6 }} source={{ uri: item.image }} />
            </View>
            <View>
              <Text style={{ fontWeight: "700" }}>{item.nameSong}</Text>
              <Text>{item.artist}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleListItemPress(item)}>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSongOptions = (item) => {
    // If the item is in the modal state, show the modal, else navigate to "SongMusic" screen
    if (selectedSong && selectedSong === item) {
      setModalVisible(true);
    } else {
      navigation.navigate("SongMusic", { song: item });
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedSong(null);
  };

  const SongOptionsModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={handleModalClose} activeOpacity={1}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalRow} onPress={() => handleAction('like')}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={styles.modalContentText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalRow} onPress={() => handleAction('share')}>
              <AntDesign name="sharealt" size={24} color="black" />
              <Text style={styles.modalContentText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalRow} onPress={() => handleAction('goToUserProfile')}>
              <AntDesign name="user" size={24} color="black" />
              <Text style={styles.modalContentText}>Go to User Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalRow} onPress={() => handleAction('viewComment')}>
              <FontAwesome5 name="comment-dots" size={24} color="black" />
              <Text style={styles.modalContentText}>View Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalRow} onPress={() => handleAction('report')}>
              <Octicons name="report" size={24} color="black" />
              <Text style={styles.modalContentText}>Report</Text>
            </TouchableOpacity>
            {/* Close modal button */}
            <View style={{ alignItems: 'center' }}>
              <Pressable onPress={handleModalClose}>
                <Text style={styles.modalCloseText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const handleAction = (action) => {
    if (action === 'like') {
      // Thực hiện xử lý khi ấn nút "Like"
      // Ví dụ: Thêm bài hát vào danh sách yêu thích
      addLikedSong(selectedSong);
    }
    console.log(`Performing action: ${action}`);
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-back-circle-outline" size={30} color="#666"
          onPress={() => navigation.goBack()} />
        <MaterialCommunityIcons name="cast-connected" size={24} color="#666" />
      </View>
      <View style={styles.inputContainer}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Search"
          keyboardType="ascii-capable"
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center" }}>
        <View>
          <Image source={{ uri: album.image }} style={{ width: 100, height: 100 }} />
        </View>
        <View>
          <Text style={styles.nameText}>{album.name}</Text>
          <Text style={styles.tracks}>{album.artist}</Text>
          <View style={styles.soundCloud}>
            <View style={styles.soundCloudLogoContainer}>
              <Fontisto name="soundcloud" size={24} color="white" />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.byText}>By </Text>
              <Text style={styles.soundCloudText}>SoundCloud</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <View style={styles.actionItem}>
          <AntDesign style={styles.actionIcon} name="hearto" size={24} color="grey" />
          <Text style={styles.actionText}>190K</Text>
          <Entypo style={{ paddingLeft: 8 }} name="dots-three-horizontal" size={20} color="grey" />
        </View>
        <View style={styles.actionItem}>
          <FontAwesome style={{ paddingHorizontal: 18 }} name="random" size={20} color="grey" />
          <SimpleLineIcons name="control-play" size={24} color="black" />
        </View>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Text>
          A playlist for when you stay inside instead of going out to that party.
        </Text>
      </View>

      <View>
        <FlatList
          data={album.songs}
          renderItem={render}
          keyExtractor={(item) => (item && item.id ? item.id.toString() : Math.random().toString())}
        />
      </View>

      <SongOptionsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6,
    borderRadius: 20,
    marginVertical: 10,
    paddingLeft: 10,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 30,
  },
  tracks: {
    marginVertical: 6
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600'
  },
  soundCloud: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  soundCloudLogoContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  byText: {
    color: 'gray',
    fontSize: 16
  },
  soundCloudText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 4,
  },
  actionText: {
    color: 'grey',
    paddingHorizontal: 10,
  },
  listMusic: {
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Adjust the alignment as per your requirement
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContentText: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20
  },
  modalCloseText: {
    color: COLORS.primary,
    marginVertical: 20,
    alignItems: 'center',
    fontSize: 18,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default DetailAlbum;