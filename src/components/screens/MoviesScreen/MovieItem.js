import React from 'react';
import { Text, View, Image } from 'react-native';
import {
  Card, Button, Icon,
} from 'react-native-elements';

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <Card
        title={item.title}
        image={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}` }}
      >

        <Button
          icon={<Icon name="visibility" color="#ffffff" />}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,
          }}
          title="Детально"
        />
      </Card>
    );
  }
}
