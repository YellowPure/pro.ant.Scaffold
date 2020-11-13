/**
 * store 工厂
 */

import Store from './store';

const store = Store();
// 创建store
const createStore = id => {
  if (!id) throw new Error('创建Store时，ID不能为空');
  const storeExists = store.get(id);
  if (storeExists) return storeExists;
  const s = Store();
  store.add(id, s);
  return s;
};

// 删除store
const delStore = id => {
  if (!id) throw new Error('删除Store时，ID不能为空');
  store.del(id);
};

// 获取store
const getStore = id => {
  if (!id) throw new Error('创建Store时，ID不能为空');
  return store.get(id);
};

export default {
  createStore,
  getStore,
  delStore
};
