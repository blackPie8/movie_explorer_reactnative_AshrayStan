import { View, Dimensions, ViewToken } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SliderItem from './SliderItem'
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Pagination from './Pagination';

const { width, height } = Dimensions.get('window');

const SliderComponent = ({ movies }) => {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(movies)
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll:(e)=>{
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(()=>{
    if( isAutoPlay === true ) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width * 0.95;
      }, 3000)
    } else {
      clearInterval(interval.current)
    }
    return () => {
      clearInterval(interval.current);
    }

  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true)
  })

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const onViewableItemsChanged = ({viewableItems} :{ viewableItems: ViewToken[] }) => {
    if(viewableItems[0].index !== undefined && viewableItems[0].index !== null){
      setPaginationIndex(viewableItems[0].index % movies.length)
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged}
  ]);

  return (
    <View>
      <Animated.FlatList 
        ref={ref}
        
        data={data}
        renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX}/>}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        snapToInterval={width * 0.95}
        decelerationRate="fast"
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        scrollEventThrottle={16}
        onEndReached={() => setData([...data, ...movies])}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true);
        }}

      />
      <Pagination items={movies} paginationIndex={paginationIndex}/>
    </View>
  )
}

export default SliderComponent