import React from 'react';
import { Button } from 'react-native-elements';
import {
  StyleSheet, View, ActivityIndicator, FlatList,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import Filters from './Filters';
import YearRelease from './YearRelease';


@inject('moviesPageStore')
@observer
class MoviesScreen extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  render() {
    const {
      moviesPageStore: {
        page, isLoading, movies, onClearFilters, nextPage, prevPage,
      },
    } = this.props;
    // console.log("movies", toJS(movies));
    return (

      <View style={styles.container}>

        <View style={styles.filtersList}>

          <Filters />
          <YearRelease />
        </View>


        <View style={styles.listItems}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={movies}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <MovieItem item={item} />}
            />
          )}
        </View>

        <View style={styles.paginationButtons}>
          <View>
            <Button
              style={styles.paginationButton}
              onPress={onClearFilters}
              title="Clear Filters"
              color="red"
            />
          </View>
          <Button
            style={styles.paginationButton}
            onPress={prevPage}
            title="Previous Page"
            color="green"
            disabled={page === 1}
          />
          <Button
            style={styles.paginationButton}
            onPress={nextPage}
            title="Next Page"
            color="green"
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItems: {
    flex: 2,
    width: '100%',
    margin: 20,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationButton: {
    marginRight: 2,
  },
});

export { MoviesScreen };
