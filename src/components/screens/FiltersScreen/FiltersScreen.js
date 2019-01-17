import React from 'react';
import { View, StyleSheet } from 'react-native';
import YearRelease from './YearRelease';
import Filters from './Filters';
import Genres from './Genres';

class FiltersScreen extends React.Component {
  render() {
    return (
      <View
        style={styles.container}
      >
        <Filters />
        <YearRelease />
        <Genres />
      </View>
    );
  }
}
export default FiltersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
