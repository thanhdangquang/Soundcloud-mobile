import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const PopularAlbum = ({ item, navigation }) => {
  

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailAlbum", { album: item })}
        style={{ padding: 10 }}
      >
        <Image
          style={{ width: 130, height: 130, borderRadius: 5 }}
          source={{ uri: item.image }}
        />
        <Text style={styles.blockRenderItem}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PopularAlbum;

const styles = StyleSheet.create({
  blockRenderItem: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 10,
  },
});
