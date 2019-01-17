import React from 'react';
import { View, StyleSheet } from 'react-native';
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

    } = this.props;
    return (
      <View style={styles.container}>

        <View style={styles.form}>

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
          </View>

          <View>
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
          </View>


        </View>

        <View>
          <Button
            icon={{ name: 'check', type: 'font-awesome' }}
            title="Submit"
            onPress={onLogin}
            buttonStyle={{
              borderRadius: 20, width: 300, height: 50, marginTop: 20,
            }}
          />
        </View>


        <View
          style={styles.baseError}
        >
          {errors.base && (
          <FormValidationMessage>{errors.base}</FormValidationMessage>
          )}
        </View>

      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  form: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 400,
  },
  baseError: {
    flex: 1,
  },

});
