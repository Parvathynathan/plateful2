import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const chats = [
  { id: '1', name: 'Customer 1', time: '18:47', avatar: 'https://via.placeholder.com/50', lastMessage: 'Hello!' },
  { id: '2', name: 'Customer 2', time: '18:12', avatar: 'https://via.placeholder.com/50', lastMessage: 'How are you?' },
  { id: '3', name: 'Customer 3', time: '18:10', avatar: 'https://via.placeholder.com/50', lastMessage: 'Thank you!' },
];

// 📌 Chat List Screen
const ChatListScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() => navigation.navigate('ChatScreen', { userName: item.name })}
        >
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.chatDetails}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>
      )}
    />
  </SafeAreaView>
);

// 📌 Individual Chat Screen
const ChatScreen = ({ route }) => {
  const { userName } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you?', sender: 'other' },
    { id: '2', text: 'I want to know more about your services.', sender: 'me' },
    { id: '3', text: 'Sure! Let me explain...', sender: 'other' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: newMessage, sender: 'me' }]);
    setNewMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{userName}</Text>
      <FlatList
        data={[...messages].reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        inverted
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// 📌 Stack Navigator
const Stack = createStackNavigator();

export default function MessagesScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

// ✅ Styles for WhatsApp-like Chat UI
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { fontSize: 20, fontWeight: 'bold', padding: 15, backgroundColor: '#007AFF', color: '#fff', textAlign: 'center' },
  chatItem: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', marginBottom: 2, alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  chatDetails: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  lastMessage: { fontSize: 14, color: 'gray' },
  time: { fontSize: 12, color: 'gray' },
  messageBubble: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '75%' },
  myMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherMessage: { backgroundColor: '#FFF', alignSelf: 'flex-start' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 10, height: 40 },
  sendButton: { marginLeft: 10, backgroundColor: '#007AFF', padding: 10, borderRadius: 20 },
});
