import Global from '../models/Global';
import Home from '../pages/Home/index.model';
import Login from '../pages/Login/index.model';
import Maps from '../pages/Maps/index.model';

export default {
  globalStore: new Global(),
  modelHome: new Home(),
  modelLogin: new Login(),
  modelMaps: new Maps(),
};
