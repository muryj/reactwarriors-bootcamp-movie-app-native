import React from 'react';
import { View, StyleSheet } from 'react-native';
import YearRelease from './YearRelease';
import Filters from './Filters';

class FiltersScreen extends React.Component {
  render() {
    return (
      <View
        style={styles.container}
      >
        <Filters
          style={{ marginBottom: 20 }}
        />
        <YearRelease
          style={{ marginBottom: 20 }}
        />
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
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
