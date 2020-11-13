// 数据存储

export default () => {
  const storage = new Map();
  // 添加
  const add = (key, value) => {
    if (key === undefined || value === undefined) throw new Error('Key或Value未定义');
    if (storage[key] !== undefined) throw new Error('已存在的Key值');
    // storage[key] = value;
    storage.set(key, value);
    return this;
  };
  // 覆盖
  const replace = (key, value) => {
    if (key === undefined || value === undefined) throw new Error('Key或Value未定义');
    storage.set(key, value);
  };
  // 删除
  const del = key => {
    if (key === undefined) throw new Error('Key未定义');
    storage.delete(key);
    return this;
  };
  // 获取
  const get = key => {
    if (key === undefined) throw new Error('Key未定义');
    return storage.get(key);
  };
  // 获取整个对象
  const getAll = () => {
    return storage;
  };

  return {
    add,
    replace,
    del,
    get,
    getAll
  };
};
