import { extendObservable, action } from 'mobx';
import {} from './_service.Home.js';
// import { appHistory } from '../../layout/Root/index';
import { delay } from '../../utils/helper';

export default class Home {
  constructor() {
    this.reset(true);
  }

  @action
  reset = init => {
    const state = {
      loading: {
        update: false
      }, // 存储当前模块所有异步操作的loading状态，约定key值为方法名
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ]
    };

    if (init) {
      extendObservable(this, state);
    } else {
      Object.keys(state).forEach(key => (this[key] = state[key]));
    }
  };

  @action
  update = async () => {
    try {
      // appHistory.push('/login');
      console.log('start');
      this.loading.update = true;
      await delay(1);
      console.log(this);
      this.data = [
        ...this.data,
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ];
    } catch (error) {
      console.error(error);
    } finally {
      console.log('end');
      this.loading.update = false;
    }
  };
}
