import React from 'react';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import {
  StyleSheet, ActivityIndicator, View, Dimensions, Animated, PanResponder, FlatList,
} from 'react-native';
import MovieItem from './MovieItem';
import AppHeader from '../../shared/AppHeader';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

@inject('moviesPageStore', 'userStore')
@observer
class MoviesScreen extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getMovies();
    this.props.userStore.getUserFromStore();
  }

  render() {
    const {
      moviesPageStore: {
        page, isLoading, onClearFilters, movies, nextPage, prevPage,
      },
    } = this.props;

    return (

      <View style={styles.container}>
        <AppHeader />

        <View style={styles.listItems}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <AnimatedFlatList
              style={{ width: SCREEN_WIDTH }}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              scrollEventThrottle={16}
              data={movies}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <MovieItem item={item} />)}
            />

          )}
        </View>

        <View style={styles.paginationButtons}>
          <View>
            <Button
              icon={{ name: 'ban', type: 'font-awesome' }}
              style={styles.paginationButton}
              onPress={onClearFilters}
              title="Clear Filters"
              buttonStyle={{
                borderRadius: 20, width: 130,
              }}
            />
          </View>
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
    margin: 10,
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
