import React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


import COLORS from '../constants/colors';

const DetailAlbumChill = ({ route, navigation }) => {
  const { albumChill } = route.params;
  const [number, onChangeNumber] = React.useState('');
  const render = ({item}) => {
    return(
      <TouchableOpacity onPress={() => navigation.navigate("SongMusic", { song: item })}>
        <View style={styles.listMusic}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{paddingRight: 10}}>
              <Image style={{width: 60, height: 60, borderRadius: 6}}
              source={{ uri: item.image }} />
            </View>
            <View>
              <Text style={{fontWeight: "700"}}>{item.artist_nameSong}</Text>
              <Text>{item.category}</Text>
            </View>
          </View>
          <View>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-back-circle-outline" size={30} color="#666" 
        onPress={() => navigation.goBack()}/>
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
      <View style={{display: "flex", flexDirection: "row" , gap: 20, alignItems: "center"}}>
        <View>
          <Image source={{ uri: albumChill.image }} style={{ width: 100, height: 100 }} />
        </View>
        <View>
          <Text style={styles.nameText}>{albumChill.name}</Text>
          <Text style={styles.tracks}>{albumChill.artist}</Text>
          <View style={styles.soundCloud}>
            <View style={styles.soundCloudLogoContainer}>
              <Fontisto name="soundcloud" size={24} color="white" />
            </View>
            <View style={{flexDirection: 'row'}}>
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
          <Entypo style={{paddingLeft: 8}} name="dots-three-horizontal" size={20} color="grey" />
        </View>
        <View style={styles.actionItem}>
          <FontAwesome style={{ paddingHorizontal: 18 }} name="random" size={20} color="grey" />
          <SimpleLineIcons name="control-play" size={24} color="black" />
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <Text>
          A playlist for when you stay inside instead of going out to that party.
        </Text>
      </View>

      <View>
      <FlatList
          data={albumChill.songs} 
          renderItem={render}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> 

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
  tracks:{
    marginVertical:6
  },
  nameText:{
    fontSize: 18,
    fontWeight: '600'
  },
  soundCloud:{
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
  
});

export default DetailAlbumChill;
