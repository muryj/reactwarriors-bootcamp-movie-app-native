import React from 'react';
import {
  View, Image, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import Menu, { MenuItem } from 'react-native-material-menu';

@inject('userStore', 'moviesPageStore')
@observer
class AppHeader extends React.Component {
  menu = null;

  setMenuRef = (ref) => {
    this.menu = ref;
  };

  Logout = () => {
    this.menu.hide();
    this.props.userStore.onLogout();
  };

  showMenu = () => {
    this.menu.show();
  };

  render() {
    const {
      userStore: {
        user,
        isAuth,
        toggleLoginButton,
      },
      moviesPageStore: {
        toggleFilters,
      },
    } = this.props;
    return (


      <View style={styles.container}>


        <Button
          icon={{ name: 'filter', type: 'font-awesome' }}
          onPress={toggleFilters}
          buttonStyle={{
            borderRadius: 20, width: 100,
          }}
          title="Filters"

        />

        {isAuth && (
          <TouchableOpacity onPress={this.showMenu}>
            <Image
              source={{
                uri: `https://secure.gravatar.com/avatar/${
                  user.avatar.gravatar.hash
                }.jpg?s=64"`,

              }}
              style={styles.loginImage}
            />
            <Menu
              ref={this.setMenuRef}
              button={<Text />}
            >
              <MenuItem onPress={this.Logout}>Logout</MenuItem>
            </Menu>
          </TouchableOpacity>
        ) || (
        <Button
          icon={{ name: 'sign-in', type: 'font-awesome' }}
          onPress={toggleLoginButton}
          buttonStyle={{
            borderRadius: 20, width: 100,
          }}
          title="Login"

        />
        )}

      </View>
    );
  }
}

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: -10,
  },
  loginImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 30,
  },


});
