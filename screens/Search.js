import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';

const Search = () => {
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView style={{marginHorizontal: 10}}> 
    <View style={styles.inputContainer}>
      <EvilIcons name="search" size={24} color="black" />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Search"
        keyboardType="ascii-capable"
        returnKeyType='done'
      />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  
});
export default Search