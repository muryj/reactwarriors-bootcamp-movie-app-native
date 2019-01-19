import React from 'react';
import { Button } from 'react-native-elements';
import {
  StyleSheet, View, ActivityIndicator, FlatList,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import MovieItem from './MovieItem';
import AppHeader from '../../shared/AppHeader';


@inject('moviesPageStore', 'userStore')
@observer
class MoviesScreen extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  handleViewRef = ref => (this.view = ref);

  onClearFiltersWithBounce = () => {
    this.props.moviesPageStore.onClearFilters();
    this.view.bounce(900);
  }


  render() {
    const {
      moviesPageStore: {
        page, isLoading, movies, nextPage, prevPage,
      },
    } = this.props;

    return (

      <View style={styles.container}>
        <AppHeader />

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
          <Animatable.View
            ref={this.handleViewRef}
          >
            <Button
              icon={{ name: 'ban', type: 'font-awesome' }}
              style={styles.paginationButton}
              onPress={this.onClearFiltersWithBounce}
              title="Clear Filters"
              buttonStyle={{
                borderRadius: 20, width: 130,
              }}
            />
          </Animatable.View>
          <Button
            icon={{ name: 'arrow-left', type: 'font-awesome' }}
            style={styles.paginationButton}
            onPress={prevPage}
            title="Previous"
            disabled={page === 1}
            buttonStyle={{
              borderRadius: 20, width: 130,
            }}

          />
          <Button
            icon={{ name: 'arrow-right', type: 'font-awesome' }}
            style={styles.paginationButton}
            onPress={nextPage}
            title="Next"
            buttonStyle={{
              borderRadius: 20, width: 130,
            }}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  listItems: {
    flex: 6,
    width: '100%',
    margin: 20,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -10,
    height: 50,
  },
});

export default MoviesScreen;
