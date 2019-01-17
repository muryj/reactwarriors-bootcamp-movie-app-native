import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { inject, observer } from 'mobx-react';
import {
  StyleSheet, View,
} from 'react-native';

@inject('moviesPageStore')
@observer
class Filters extends React.Component {
  static defaultProps = {
    optionsSortBy: [
      {
        label: 'Популярные по убыванию',
        value: 'popularity.desc',
      },
      {
        label: 'Популярные по возростанию',
        value: 'popularity.asc',
      },
      {
        label: 'Рейтинг по убыванию',
        value: 'vote_average.desc',
      },
      {
        label: 'Рейтинг по возростанию',
        value: 'vote_average.asc',
      },
    ],
  };

  handleChangeSortBy = (value) => {
    this.props.moviesPageStore.onChangeFilters({
      target: {
        name: 'sort_by',
        value,
      },
    });
  }

  render() {
    const {
      moviesPageStore: { filters, onChangeFilters },
      optionsSortBy,
    } = this.props;
    return (
      <View>
        <RNPickerSelect

          style={{ height: 5, width: 200 }}
          itemStyle={{
            color: 'blue',
            fontSize: 17,
          }}
          onValueChange={this.handleChangeSortBy}
          value={filters.sort_by}
          items={optionsSortBy}
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
    marginTop: 10,
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
export default Filters;
