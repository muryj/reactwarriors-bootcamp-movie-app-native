import React from 'react';
import {
  Card, Button, Icon,
} from 'react-native-elements';
import { Image, StyleSheet } from 'react-native';

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <Card
        style={styles.constainer}
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
    );
  }
}
export default MovieItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
});
