import React from 'react';
import {
  Card, Button, Icon,
} from 'react-native-elements';
import {
  View, Image, StyleSheet, Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <View
        style={styles.constainer}
      >
        <Card
          title={item.title}
          borderRadius={20}
        >
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}` }}
          />


          <Button

            icon={<Icon name="visibility" color="#ffffff" />}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 10,
            }}
            title="Детально"
          />

        </Card>
      </View>
    );
  }
}
export default MovieItem;

const styles = StyleSheet.create({
  constainer: {
    width: SCREEN_WIDTH,
  },
  image: {
    width: '100%',
    height: 400,

    marginBottom: 20,
  },
});
