import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SliderItem = ({ item, index, scrollX }) => {

  const rnAnimatedStyle = useAnimatedStyle(()=>{
    return{
        transform:[
            {
                translateX: interpolate(
                  scrollX.value,
                  [(index - 1) * (width * 0.95), index * (width * 0.95), (index + 1) * (width * 0.95)],
                  [-width * 0.15, 0, -width * 0.05],
                    Extrapolation.CLAMP
                )
            },
            {
                scale : interpolate(
                  scrollX.value,
                  [(index - 1) * (width * 0.95), index * (width * 0.95), (index + 1) * (width * 0.95)],
                  [0.95, 1, 0.95],
                    Extrapolation.CLAMP
                )
            },
        ]
    }
})

  return (
    <Animated.View style={[styles.container, rnAnimatedStyle]}>
      <Image
        source={{uri: item.banner_url}}
        style={styles.image}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={require('../assets/star.png')}
            style={styles.starIcon}
          />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: width * 0.025,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: width * 0.03,
    borderRadius: 15,
  },
  title: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.005,
  },
  starIcon: {
    width: width * 0.04,
    height: width * 0.04,
    marginRight: width * 0.01,
  },
  featuredText: {
    fontSize: width * 0.065,
  },
  rating: {
    color: 'white',
    fontSize: width * 0.035,
  },
});
