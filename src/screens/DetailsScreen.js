import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DetailScreen = ({route}) => {
  const {post} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'left',
  },
  body: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
  },
});

export default DetailScreen;
