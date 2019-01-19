import {
  observable, action, computed, values,
} from 'mobx';
import CallApi from '../api/api';
import { userStore } from './userStore';

class LoginStore {
  @observable username = 'jekanator';

  @observable password = 'jekanator96';

  @observable submitting = false;

  @observable
  errors = {};

  @computed
  get hasError() {
    return values(this.errors).some(error => Boolean(error));
  }

  @action
  validateFields = () => {
    const errors = {};

    if (this.username === '') {
      errors.username = 'Not empty';
    }
    if (this.password === '') {
      errors.password = 'Not empty';
    }
    return errors;
  };

  @action
  onChangeInput = ({ name, value }) => {
    this[name] = value;
    this.errors[name] = null;
    this.errors.base = null;
  };

  @action
  clearErrors = () => {
    this.errors = {};
  }

  @action
  handleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
    }
  };

  @action
  onLogin = () => {
    const errors = this.validateFields();

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
    } else {
      this.chainPromises();
    }
  };



  @action
  chainPromises = () => {
    let session_id = null;
    this.submitting = true;

    CallApi.get('/authentication/token/new')
      .then(data => CallApi.post('/authentication/token/validate_with_login', {
        body: {
          username: this.username,
          password: this.password,
          request_token: data.request_token,
        },
      }))
      .then(data => CallApi.post('/authentication/session/new', {
        body: {
          request_token: data.request_token,
        },
      }))
      .then((data) => {
        session_id = data.session_id;
        return CallApi.get('/account', {
          params: {
            session_id: data.session_id,
          },
        });
      })
      .then((user) => {
        this.submitting = false;
        return { user, session_id };
      })
      .then((data) => {
        userStore.updateAuth(data.user, data.session_id);
        userStore.toggleSubmitButton();
      })
      .catch((error) => {
        this.submitting = false;
        this.errors = { ...this.errors, base: error.status_message };
      });
  };
}

export const loginStore = new LoginStore();
