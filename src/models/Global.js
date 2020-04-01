// import { action } from 'mobx';
import BaseModel from './Base';

export default class GlobalStore extends BaseModel {
  constructor() {
    const state = {
      loading: 'false', // 是否显示加载状态
    };
    super(state);
  }
}
