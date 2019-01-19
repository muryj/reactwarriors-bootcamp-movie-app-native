import React from 'react';
import { reaction, values } from 'mobx';
import { View, StyleSheet, Vibration } from 'react-native';
import {
  FormLabel, FormInput, FormValidationMessage, Button,
} from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';

@inject('loginStore', 'userStore')
@observer
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.buttonSubmitRef = React.createRef();
    reaction(() => values(props.loginStore.errors), () => {
      if (props.loginStore.hasError) {
        this.buttonSubmitRef.current.shake(1000);
        Vibration.vibrate(200);
      }
    });
  }


  // onLogin = () => {
  //   if (this.props.loginStore.hasError)
  // }

  render() {
    const {
      loginStore: {
        onChangeInput,
        handleBlur,
        username,
        password,
        errors,
        onLogin,
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

        <Animatable.View
          ref={this.buttonSubmitRef}
        >
          <Button
            icon={{ name: 'check', type: 'font-awesome' }}
            title="Submit"
            onPress={onLogin}
            buttonStyle={{
              borderRadius: 20, width: 300, height: 50, marginTop: 20,
            }}
          />
        </Animatable.View>


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
