import { extendObservable, action } from 'mobx';

export default class BaseStoreModel {
  constructor(state) {
    this.initailState = state;
    this.reset(true);
  }

  @action
  reset = init => {
    if (init) {
      extendObservable(this, this.initailState);
    } else {
      Object.keys(this.initailState).forEach(
        key => (this[key] = this.initailState[key]),
      );
    }
  };

  // 同步变更状态
  @action
  commit = payload => {
    Object.keys(payload).forEach(key => (this[key] = payload[key]));
  };

  @action
  destory = () => {
    this.reset(this.initailState);
  };
}
