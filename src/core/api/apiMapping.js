import storeFactory from '../store/storeFactory';
import storeKeys from '../store/storeKeys';

const apiStore = storeFactory.createStore(storeKeys.API_STORE_KEY);
const addApiModule = apiModule => {
  for (const apiKey of Object.getOwnPropertyNames(apiModule)) {
    apiStore.add(apiKey, apiModule[apiKey]);
  }
};

export default {
  addApiModule
};
