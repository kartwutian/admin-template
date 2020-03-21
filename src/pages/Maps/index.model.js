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
      submiting: false,
      layerTypesMap: {}, // 图层类型映射
    };

    if (init) {
      extendObservable(this, state);
    } else {
      Object.keys(state).forEach(key => (this[key] = state[key]));
    }
  };

  // 同步变更状态
  @action
  commit = payload => {
    Object.keys(payload).forEach(key => (this[key] = payload[key]));
  };

  @action
  layerTypesChange = (layerType, checked) => {
    this.loading = true;
    console.log(layerType);
    console.log(checked);
    console.log(this.layerTypesMap);
    const { layerTypesMap } = this;
    layerTypesMap[layerType].checked = checked;
    this.layerTypesMap = layerTypesMap;
  };
}
