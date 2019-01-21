import {
  observable, action, computed, toJS,
} from 'mobx';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import CallApi from '../api/api';

class UserStore {
  @observable user = {};

  @observable session_id = {};

  @observable showLoginModal = false;

  @observable watchlistMovies = [];

  @observable favoriteMovies = [];

  @computed get isAuth() {
    return Boolean(Object.keys(this.user).length);
  }

  @action
  toggleLoginButton = () => {
    Actions.login();
  };

  @action
  toggleSubmitButton = () => {
    Actions.movies();
  }

  @action
  updateAuth = (user, session_id) => {
    this.user = user;
    this.session_id = session_id;
    this.setUser();
  };


  @action
  setUser = async () => {
    try {
      await AsyncStorage.setItem('session_id', this.session_id);
    } catch (error) {
      console.log(error.message);
    }
  };

  @action
  getSessionId = async () => {
    let session_id = '';
    try {
      session_id = await AsyncStorage.getItem('session_id') || 'none';
    } catch (error) {
      console.log(error.message);
    }
    return session_id;
  }


  @action
   getUserFromStore = async () => {
     const session_id = await this.getSessionId();
     CallApi.get('/account', {
       params: {
         session_id,
       },
     })
       .then((user) => {
         userStore.updateAuth(user, session_id);
       })
       .catch((error) => {
         this.submitting = false;
         this.errors = { ...this.errors, base: error.status_message };
       });
   };


  @action
  onLogout = () => {
    CallApi.delete('/authentication/session', {
      body: {
        session_id: this.session_id,
      },
    }).then((data) => {
      this.user = {};
      this.session_id = {};
      this.favoriteMovies = [];
      this.watchlistMovies = [];
    });
  };
}

export const userStore = new UserStore();
