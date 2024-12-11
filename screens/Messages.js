import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Button } from 'react-native';

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Thành', content: 'Hello!', timestamp: '10:00 AM' },
    { id: '2', sender: 'Sơn', content: 'Hi there!', timestamp: '10:05 AM' },
    { id: '3', sender: 'Trường', content: 'Hi there!', timestamp: '11:05 AM' },
    { id: '4', sender: 'Huyền', content: 'Hi there!', timestamp: '12:05 AM' },
    { id: '5', sender: 'Đạt', content: 'Hi there!', timestamp: '13:00 AM' },
    { id: '6', sender: 'Thảo', content: 'Hi there!', timestamp: '15:05 AM' },
    // Thêm các tin nhắn khác tại đây
  ]);

  const generateRandomMessage = () => {
    const senders = ['Charlie', 'David', 'Emma', 'Frank'];
    const contents = ['How are you?', 'Nice to meet you!', 'What\'s up?'];
    const randomSender = senders[Math.floor(Math.random() * senders.length)];
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return { id: `${messages.length + 1}`, sender: randomSender, content: randomContent, timestamp };
  };

  const addRandomMessage = () => {
    const newRandomMessage = generateRandomMessage();
    setMessages((prevMessages) => [...prevMessages, newRandomMessage]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.sender}</Text>
      <Text>{item.content}</Text>
      <Text style={{ color: 'gray' }}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ width: '100%' }}
        />

        <Button title="Add Random Message" onPress={addRandomMessage} />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
