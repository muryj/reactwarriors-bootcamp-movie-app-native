import React from 'react';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import {
  StyleSheet, ActivityIndicator, View, Dimensions, Animated, PanResponder,
} from 'react-native';
import MovieItem from './MovieItem';
import AppHeader from '../../shared/AppHeader';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

@inject('moviesPageStore', 'userStore')
@observer
class MoviesScreen extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
    };


    this.translateSwipe = {
      transform: [...this.position.getTranslateTransform()],
    };

    this.nextCardOpacityScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.7, 1],
      extrapolate: 'clamp',
    });
  }


  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }

  componentDidMount() {
    this.props.moviesPageStore.getMovies();
    this.props.userStore.getUserFromStore();
  }

  nextPage = () => {
    this.setState({ currentIndex: 0 });
    this.props.moviesPageStore.nextPage();
  }

  prevPage = () => {
    this.setState({ currentIndex: 0 });
    this.props.moviesPageStore.prevPage();
  }

  renderMovies = () => this.props.moviesPageStore.movies.map((item, i) => {
    if (i === this.state.currentIndex) {
      return (
        <Animated.View
          {...this.PanResponder.panHandlers}
          key={item.id}
          style={[this.translateSwipe, {
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: 'absolute',
          }]}
        >
          <MovieItem item={item} />
        </Animated.View>
      );
    }
    if (this.state.currentIndex + 1 === i) {
      return (
        <Animated.View
          {...this.PanResponder.panHandlers}
          key={item.id}

          style={[{
            opacity: this.nextCardOpacityScale,
            transform: [{ scale: this.nextCardOpacityScale }],
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: 'absolute',
          }]}
        >
          <MovieItem item={item} />
        </Animated.View>
      );
    }
  }).reverse()

  render() {
    const {
      moviesPageStore: {
        page, isLoading, onClearFilters,
      },
    } = this.props;

    return (

      <View style={styles.container}>
        <AppHeader />

        <View style={styles.listItems}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              {this.renderMovies()}
            </View>

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
            onPress={this.prevPage}
            title="Previous"
            disabled={page === 1}
            buttonStyle={{
              borderRadius: 20, width: 130,
            }}

          />
          <Button
            icon={{ name: 'arrow-right', type: 'font-awesome' }}
            style={styles.paginationButton}
            onPress={this.nextPage}
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
