import { action } from 'mobx';
import BaseModel from '../../models/Base';
import { login } from './_service.Login';

export default class loginStore extends BaseModel {
  constructor() {
    const state = {
      loading: 'false', // 是否显示加载状态
    };
    super(state);
  }

  @action
  login = async params => {
    const res = await login(params);
    console.log(res);
    return res;
  };
}
