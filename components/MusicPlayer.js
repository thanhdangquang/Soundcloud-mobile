import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const MusicPlayer = ({ song, sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (sound) {
      // Add event listeners to update play/pause state
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying !== isPlaying) {
          setIsPlaying(status.isPlaying);
        }
      });
    }
  }, [sound, isPlaying]);

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  return (
    <View>
      <Image source={{ uri: song.image }} style={{ width: 200, height: 200 }} />
      <Text>{song.name}</Text>
      <Text>{song.artist}</Text>
      <TouchableOpacity onPress={togglePlayPause}>
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicPlayer;
