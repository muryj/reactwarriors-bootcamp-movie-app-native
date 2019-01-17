import React from 'react';
import {
  View, Image, StyleSheet, Text,
} from 'react-native';
import { inject, observer } from 'mobx-react';


@inject('userStore')
@observer
class AppHeader extends React.Component {
  render() {
    const {
      userStore: {
        user,
        isAuth,
      },
    } = this.props;
    return (
      <View style={styles.container}>
        {isAuth && (
          <Image
            source={{
              uri: `https://secure.gravatar.com/avatar/${
                user.avatar.gravatar.hash
              }.jpg?s=64"`,

            }}
            style={{ width: 50, height: 50 }}
          />
        )}
        {isAuth && (<Text>{user.username}</Text>)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});

export default AppHeader;
