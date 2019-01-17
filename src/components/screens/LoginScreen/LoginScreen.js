import React from 'react';
import { View } from 'react-native';
import {
  FormLabel, FormInput, FormValidationMessage, Button,
} from 'react-native-elements';
import { inject, observer } from 'mobx-react';


@inject('loginStore')
@observer
class LoginScreen extends React.Component {
  render() {
    const {
      loginStore: {
        onLogin,
        onChangeInput,
        handleBlur,
        username,
        password,
        repeatPassword,

      },
    } = this.props;
    return (
      <View>
        <FormLabel>Login</FormLabel>
        <FormInput
          placeholder="Пользователь"
          value={username}
          onChange={onChangeInput(username)}
          onBlur={handleBlur}
        />
        <FormValidationMessage>Error message</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder="Пользователь"
          value={password}
          onChangeText={onChangeInput}
          onBlur={handleBlur}
        />
        <FormValidationMessage>Error message</FormValidationMessage>
        <FormLabel>Repeat Password</FormLabel>
        <FormInput
          placeholder="Пользователь"
          value={repeatPassword}
          onChangeText={onChangeInput}
          onBlur={handleBlur}
        />
        <FormValidationMessage>Error message</FormValidationMessage>
        <Button
          large
          rightIcon={{ name: 'done' }}
          title="Submit"
          color="green"
          onPress={onLogin}
        />
      </View>
    );
  }
}
export default LoginScreen;
