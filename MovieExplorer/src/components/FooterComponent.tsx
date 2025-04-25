import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { tabs } from '../constants/tabs';

const { height, width } = Dimensions.get('window');

const FooterComponent = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => setActiveTab(tab.name)}
        >
          <Image
            source={tab.icon}
            style={[
              styles.icon,
              { tintColor: activeTab === tab.name ? '#2563EB' : '#666' }
            ]}
          />
          <Text
            style={[
              styles.label,
              { color: activeTab === tab.name ? '#2563EB' : '#666' }
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
