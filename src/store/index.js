import Global from '../models/Global';
import Home from '../pages/Home/index.model';
import Login from '../pages/Login/index.model';
import FormBasic from '../pages/Form/Basic.model';
import FormStep from '../pages/Form/Step.model';
import Maps from '../pages/Maps/index.model';


export default {
  globalStore: new Global(),
  modelHome: new Home(),
  modelLogin: new Login(),
  modelFormBasic: new FormBasic(),
  modelFormStep: new FormStep(),
  modelMaps: new Maps(),

};
