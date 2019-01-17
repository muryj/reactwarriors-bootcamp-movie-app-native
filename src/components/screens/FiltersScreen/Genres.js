import React from 'react';
import { CheckBox } from 'react-native-elements';
import { FlatList, Text } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('moviesPageStore')
@observer
class Genres extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getGenres();
  }

  render() {
    const {
      moviesPageStore: {
        resetGenres, genresList, onChangeGenres, filters,
      },
    } = this.props;
    console.log(genresList);
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={genresList}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    );
  }
}
export default Genres;
