import { observable, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';
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
  };

  @action
  updateUser = (user) => {
    this.user = user;
  };

  @action
  updateSessionId = (session_id) => {
    this.session_id = session_id;
  };

  @action
  getUser = () => {
    this.isLoading = true;
    const session_id = 'cookies';
    if (session_id) {
      CallApi.get('/account', {
        params: {
          session_id,
        },
      }).then((user) => {
        this.updateAuth(user, session_id);
      });
    }
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

  @action
  getFavoriteMovies = () => {
    const userFavMovies = [];
    CallApi.get(`/account/${this.user.id}/favorite/movies`, {
      params: {
        session_id: this.session_id,
      },
    }).then((data) => {
      data.results.map(movie => userFavMovies.push(movie.id));
      this.favoriteMovies = userFavMovies;
    });
  };

  @action
  getWatchListMovies = () => {
    const userWatchlistMovies = [];
    CallApi.get(`/account/${this.user.id}/watchlist/movies`, {
      params: {
        session_id: this.session_id,
      },
    }).then((data) => {
      data.results.map(movie => userWatchlistMovies.push(movie.id));
      this.watchlistMovies = userWatchlistMovies;
    });
  };
}

export const userStore = new UserStore();
