import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { inject, observer } from 'mobx-react';
import {
  StyleSheet, View,
} from 'react-native';

@inject('moviesPageStore')
@observer
class YearRelease extends React.Component {
  static defaultProps = {
    yearsSortBy: [
      {
        label: '2018',
        value: '2018',
      },
      {
        label: '2017',
        value: '2017',
      },
      {
        label: '2016',
        value: '2016',
      },
      {
        label: '2015',
        value: '2015',
      },
    ],
  };

  handleChangeYearsSortBy = (value) => {
    this.props.moviesPageStore.onChangeFilters({
      target: {
        name: 'primary_release_year',
        value,
      },
    });
  };

  render() {
    const {
      moviesPageStore: { filters },
      yearsSortBy,
    } = this.props;
    return (
      <View>
        <RNPickerSelect
          style={{ height: 5, width: 200 }}
          itemStyle={{
            color: 'blue',
            fontSize: 17,
          }}
          onValueChange={this.handleChangeYearsSortBy}
          value={filters.primary_release_year}
          items={yearsSortBy}
          style={{ ...pickerSelectStyles }}
        />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});

export default YearRelease;
