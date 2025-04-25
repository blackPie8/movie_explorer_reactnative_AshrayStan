import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'

const { height, width } = Dimensions.get('window')

const HeaderComponent = () => {
  const [isGridView, setIsGridView] = useState(true)

  const toggleView = () => {
    setIsGridView(prev => !prev)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MovieExplor</Text>
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TouchableOpacity onPress={toggleView}>
          <Image
            source={
              isGridView
                ? require('../assets/list.png')
                : require('../assets/grid.png')
            }
            style={[
              styles.toggleIcon,
              isGridView ? styles.gridImage : styles.listImage
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.02,
    paddingTop: height * 0.025,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    height: height * 0.055,
  },
  searchIcon: {
    width: width * 0.045,
    height: width * 0.045,
    tintColor: '#000',
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#000',
  },
  toggleIcon: {
    tintColor: '#000',
    marginLeft: width * 0.02,
  },
  gridImage: {
    height: height * 0.022,
    width: height * 0.022,
  },
  listImage: {
    height: height * 0.027,
    width: height * 0.027,
  },
})
