import React from 'react';
import { View } from 'react-native';
import {
  FormLabel, FormInput, FormValidationMessage, Button,
} from 'react-native-elements';
import { inject, observer } from 'mobx-react';


@inject('loginStore', 'userStore')
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
        errors,

      },
      userStore: {
        toggleSubmitButton,
      },
    } = this.props;
    return (
      <View>
        <FormLabel>Login</FormLabel>
        <FormInput
          placeholder="Пользователь"
          value={username}
          onChangeText={(inputValue) => {
            onChangeInput({ name: 'username', value: inputValue });
          }}
          onBlur={() => {
            handleBlur();
          }}
        />
        {errors.username && (
          <FormValidationMessage>{errors.username}</FormValidationMessage>
        )}

        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder="Пользователь"
          value={password}
          onChangeText={(inputValue) => {
            onChangeInput({ name: 'password', value: inputValue });
          }}
          onBlur={() => {
            handleBlur();
          }}
        />
        {errors.password && (
          <FormValidationMessage>{errors.password}</FormValidationMessage>
        )}

        <Button
          large
          rightIcon={{ name: 'done' }}
          title="Submit"
          color="green"
          onPress={onLogin}
        />
        <Button
          large
          rightIcon={{ name: 'done' }}
          title="Skip"
          color="green"
          onPress={toggleSubmitButton}
        />
        {errors.base && (
        <FormValidationMessage>{errors.base}</FormValidationMessage>
        )}
      </View>
    );
  }
}
export default LoginScreen;
