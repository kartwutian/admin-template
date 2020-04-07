// import { action } from 'mobx';
import BaseModel from './Base';
import router from '@/_router';
import { action } from 'mobx';

export default class GlobalStore extends BaseModel {
  constructor() {
    const state = {
      loading: 'false', // 是否显示加载状态
      router: router || {},
    };
    super(state);
  }

  @action
  updateRoutes() {
    // 此处可以异步获取路由
    this.router = router;
  }
}
