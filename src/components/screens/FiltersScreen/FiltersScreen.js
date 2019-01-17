import React from 'react';
import { View } from 'react-native';
import YearRelease from './YearRelease';
import Filters from './Filters';

class FiltersScreen extends React.Component {
  render() {
    return (
      <View>
        <Filters />
        <YearRelease />
      </View>
    );
  }
}
export default FiltersScreen;
