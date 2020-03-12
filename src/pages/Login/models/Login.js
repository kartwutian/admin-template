import { extendObservable, action } from 'mobx';
import { login } from '../services/Login';

export default class loginStore {
  constructor() {
    this.reset(true);
  }

  @action
  reset = init => {
    const state = {
      loading: false, // 是否显示加载状态
      submiting: false
    };

    if (init) {
      extendObservable(this, state);
    } else {
      Object.keys(state).forEach(key => (this[key] = state[key]));
    }
  };

  @action
  login = async params => {
    const res = await login(params);
    console.log(res);
    return res;
  };
}
