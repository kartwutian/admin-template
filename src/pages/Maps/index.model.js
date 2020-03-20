import { extendObservable, action } from 'mobx';
import {} from './_service.Maps.js';

export default class Maps {
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
}
