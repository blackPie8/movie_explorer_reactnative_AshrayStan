import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { tabs } from '../constants/tabs';
import { useNavigation, useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const FooterComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => {
            if(tab.screens !== currentRoute){
            navigation.navigate(tab.screens);
            }
          }}
          
        >
          <Image
            source={tab.icon}
            style={[
              styles.icon,
              { tintColor: tab.screens === currentRoute ? '#2563EB' : '#666' }
            ]}
          />
          <Text
            style={[
              styles.label,
              { color: tab.screens === currentRoute ? '#2563EB' : '#666' }
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.015,
    borderTopWidth: height * 0.0012,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    marginBottom: height * 0.005,
  },
  label: {
    fontSize: width * 0.03,
    fontWeight: '500',
  },
});
