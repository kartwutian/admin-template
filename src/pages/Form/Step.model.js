// import { action } from 'mobx';
import BaseModel from 'models/Base';
// import { delay } from 'utils/helper';
import {} from './_service.Form.js';

export default class FormStep extends BaseModel {
  constructor() {
    const state = {
      loading: {
        update: false,
      }, // 存储当前模块所有异步操作的loading状态，约定key值为方法名
    };
    super(state);
  }
}
