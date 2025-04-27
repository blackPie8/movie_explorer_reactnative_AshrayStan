import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const Pagination = ({ items, paginationIndex }) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: paginationIndex === index ? '#222' : '#aaa' }
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#aaa',
    height: width * 0.02,
    width: width * 0.02,
    marginHorizontal: width * 0.01,
    borderRadius: width * 0.01,
  },
});
