import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const CommunityScreen = () => {
  // Initial Community Posts
  const [posts, setPosts] = useState([
    {
      id: '1',
      username: 'John Doe',
      image: 'https://source.unsplash.com/200x200/?food',
      description: 'Fresh home-cooked meal available for sharing!',
      likes: 5,
    },
    {
      id: '2',
      username: 'Emma Watson',
      image: 'https://source.unsplash.com/200x200/?vegan',
      description: 'Delicious vegan dish, anyone interested?',
      likes: 8,
    },
  ]);

  // Handle Like Functionality
  const [likedPosts, setLikedPosts] = useState([]); // Track liked posts

  const handleLike = (id) => {
    if (!likedPosts.includes(id)) {
      setPosts(posts.map(post => 
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      ));
      setLikedPosts([...likedPosts, id]); // Mark post as liked
    }
  };

  // Combine posts and FAQs into a single data source
  const faqData = [
    { type: 'faq', id: 'faq1', question: 'How does food sharing work?', answer: 'People can share extra food with others by posting here. Those in need can contact them.' },
    { type: 'faq', id: 'faq2', question: 'Is the food safe?', answer: 'We encourage users to share fresh food and mention any allergens.' },
    { type: 'faq', id: 'faq3', question: 'How can I contact a food provider?', answer: 'Each post includes the contact details of the provider.' },
  ];

  const combinedData = [
    { type: 'header', id: 'header1', title: 'Community Feed' },
    ...posts.map(post => ({ ...post, type: 'post' })),
    { type: 'header', id: 'header2', title: 'FAQs' },
    ...faqData,
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.heading}>{item.title}</Text>;
    }

    if (item.type === 'post') {
      return (
        <Card style={styles.postCard}>
          <Card.Title title={item.username} />
          <Card.Cover source={{ uri: item.image }} style={styles.postImage} />
          <Card.Content>
            <Text style={styles.description}>{item.description}</Text>
          </Card.Content>
          <Card.Actions>
            <Button icon="heart" onPress={() => handleLike(item.id)}>
              {item.likes} Likes
            </Button>
          </Card.Actions>
        </Card>
      );
    }

    if (item.type === 'faq') {
      return (
        <Card style={styles.faqCard}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        </Card>
      );
    }

    return null;
  };

  return (
    <FlatList
      data={combinedData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postCard: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  postImage: {
    height: 200,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginVertical: 8,
  },
  faqCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  faqQuestion: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
});

export default CommunityScreen;