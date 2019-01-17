import { observable, action } from 'mobx';
import CallApi from '../api/api';
import { userStore } from './userStore';

class LoginStore {
  @observable username = 'jekanator';

  @observable password = 'jekanator96';

  @observable repeatPassword = 'jekanator96';

  @observable submitting = false;

  @observable
  errors = {
    username: false,
    password: false,
    repeatPassword: false,
    base: false,
  };

  @action
  validateFields = (event) => {
    const errors = {};

    if (this.username === '') {
      this.errors.username = 'Not empty';
    }
    if (this.password === '') {
      this.errors.password = 'Not empty';
    }
    if (this.password !== this.repeatPassword && this.password !== '') {
      this.errors.repeatPassword = 'You must provide equal passwords';
    }
    return errors;
  };

  @action
  onChange = (event) => {
    this[event.target.name] = event.target.value;
    this.errors[event.target.name] = null;
    this.errors.base = null;
  };

  @action
  handleBlur = (event) => {
    const errors = this.validateFields(event.target.name);
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
    }
  };

  @action
  onLogin = (event) => {
    event.preventDefault();
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
        userStore.toggleModal();
      })
      .catch((error) => {
        console.log('error', error);
        this.submitting = false;
        this.errors.base = error.status_message;
      });
  };
}

export const loginStore = new LoginStore();
