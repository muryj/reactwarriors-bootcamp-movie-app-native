import React from 'react';
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class LoginModal extends React.Component {
  menu = null;

  setMenuRef = (ref) => {
    this.menu = ref;
  };

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
          <MenuItem onPress={this.hideMenu}>Logout</MenuItem>
        </Menu>
      </View>
    );
  }
}

export default LoginModal;
