import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts ',
      );
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button title="Retry" onPress={handleRefresh} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id?.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {post: item})}>
              <View style={styles.postContainer}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postBody}>{item.body}</Text>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#007bff"
            />
          }
        />
      )}
      <Button
        title="Refresh"
        onPress={handleRefresh}
        style={styles.refreshButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  postContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  postBody: {
    color: '#555',
  },
  refreshButton: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#007bff',
    color: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    marginBottom: 10,
    color: 'red',
  },
});

export default HomeScreen;
