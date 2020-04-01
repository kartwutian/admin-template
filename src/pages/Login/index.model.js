import { action } from 'mobx';
import BaseModel from '../../models/Base';
import { login } from './_service.Login';
import { delay } from 'utils/helper';

export default class loginStore extends BaseModel {
  constructor() {
    const state = {
      loading: {
        update: false,
      }, // 存储当前模块所有异步操作的loading状态，约定key值为方法名
    };
    super(state);
  }

  @action
  login = async params => {
    try {
      // appHistory.push('/login');
      this.loading.login = true;
      await delay(2);
      const res = await login(params);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.login = false;
    }
  };
}
