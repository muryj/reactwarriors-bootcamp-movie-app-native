import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { moviesPageStore } from '../stores/moviesPageStore';
import { userStore } from '../stores/userStore';
import { loginStore } from '../stores/loginStore';
import MoviesScreen from './screens/MoviesScreen/MoviesScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

class Root extends React.Component {
  render() {
    return (
      <Provider moviesPageStore={moviesPageStore} userStore={userStore} loginStore={loginStore}>
        <Router>
          <Stack key="root">
            <Scene key="movies" component={MoviesScreen} title="Movies" />
            <Scene key="login" component={LoginScreen} title="Login" />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

export default Root;
