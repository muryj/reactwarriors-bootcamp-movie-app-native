import React from 'react';
import { CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native';
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
        genresList, checkboxChecked,
      },
    } = this.props;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={genresList}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CheckBox
            title={item.name}
            checked={checkboxChecked}
          />
        )}
      />
    );
  }
}
export default Genres;
