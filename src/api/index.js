/**
 * api引入文件
 * 依赖webpack api，只能使用webpack进行打包
 */
import apiMapping from '@/core/api/apiMapping';

const initApiStorage = apiModule => {
  apiMapping.addApiModule(apiModule);
};

const context = require.context('./', false, /\.api.js$/);
context.keys().forEach(file => {
  const apiModule = context(file);
  initApiStorage(apiModule.default || {});
});
