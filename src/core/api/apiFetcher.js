import storeFactory from '@/core/store/storeFactory';
import storeKeys from '@/core/store/storeKeys';
import apiClient, { METHOD } from './apiClient';

// 接口返回的标识错误码的字段名
const ERROR_CODE_FIELD_NAME = 'error_code';
// 接口返回的标识错误信息的字段名
const ERROR_MSG_FIELD_NAME = 'msg';
// 接口返回的标识数据的字段名
const DATA_FIELD_NAME = 'result';

const apiStore = storeFactory.getStore(storeKeys.API_STORE_KEY);
// 从API池中获取API信息
const getApi = apiID => {
  const apiInfoStr = apiStore.get(apiID);
  if (!apiInfoStr) {
    throw new Error(`未定义的请求 <<<${apiID}>>>`);
  }
  const apiInfo = apiInfoStr.split(' ');
  // 处理请求方式
  let method = apiInfo[0] || METHOD.GET;
  method = method.toUpperCase();
  if (!METHOD[method]) throw new Error(`不支持的请求Method <<<${method}>>>`);

  // 取得请求URL
  const url = apiInfo[1];
  if (!url) {
    throw new Error(`未定义的请求URL <<<${url}>>>`);
    // return Promise.reject(new Error(`未定义的请求URL <<<${url}>>>`));
  }
  return {
    method,
    url
  };
};

/**
 * 定义生成http query string的方法
 * @param queryData Object query参数
 * @return string query字符串
 */
const genQuery = queryData => {
  if (!queryData) return '';
  let ret = '';
  // 防止IE接口缓存，加上时间戳
  // if (Device.isIE()) queryData.timestamp = new Date().getTime();
  // let query;
  for (const query in queryData) {
    if ({}.hasOwnProperty.call(queryData, query)) {
      ret += `&${query}=${encodeURIComponent(queryData[query])}`;
    }
  }
  return ret.replace(/&/, '?');
};

const JSONParse = content => {
  try {
    if (typeof content === 'object') {
      return content;
    }
    return JSON.parse(content);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * 生成restful的完整请求URL
 */
const genRestfulUrl = (url, urlParam) => {
  if (!url) return '';
  // if (!urlParam) return url;
  let ret = url;
  // 需根据URL中的restful参数进行取值
  for (const k in urlParam) {
    if ({}.hasOwnProperty.call(urlParam, k)) {
      const reg = new RegExp(`:${k}`, 'g');
      ret = ret.replace(reg, `${urlParam[k]}`);
    }
  }
  if (/\/:/g.test(ret)) {
    throw new Error(`存在未替换的restful参数：<<<${ret}>>>`);
  }
  return ret;
};

/**
 * @param apiParams string | array
 */
const send = async (url, method, headers, body, type = 'json') => {
  // url, method = 'get', body = {}, type = 'json', headers = {}
  const { data = {}, [ERROR_MSG_FIELD_NAME]: errorMSG = '' } = await apiClient
    .send(url, method, headers, body, type)
    .catch(err => {
      // 处理HTTP ERROR
      return { [ERROR_MSG_FIELD_NAME]: err.toString() };
    });
  // 进行错误转换，由逻辑层做进一步处理
  if (errorMSG) {
    data[ERROR_CODE_FIELD_NAME] = -1;
    data[ERROR_MSG_FIELD_NAME] = errorMSG;
    data[DATA_FIELD_NAME] = null;
  }
  return data;
};

// get 请求的fetcher
const getFetcher = async (url, headers = {}) => {
  // url, method, headers = {}, data, type = 'json'
  const rest = await send(url, METHOD.GET, headers);
  return rest;
};

// post 请求的fetcher
const postFetcher = async (url, method = METHOD.POST, body = {}, header = {}, type = 'json') => {
  console.log('postFetcher', url, method, body, header, type);
  const rest = send(url, method, header, body, type);
  return rest;
};

// 实际fetcher，根据method自动选择对应的fetcher
const fetcher = async (apiID, paramStr) => {
  const { url, method } = getApi(apiID);
  const { restfulData, queryData, postData, type, headers } = JSONParse(paramStr);
  const restfulUrl = genRestfulUrl(url, restfulData);
  const realUrl = `${restfulUrl}${genQuery(queryData)}`;
  let rest;
  if (method === METHOD.GET) {
    rest = await getFetcher(realUrl, headers);
  } else {
    rest = await postFetcher(realUrl, method, postData, headers, type);
  }
  return rest;
};

export default fetcher;

// /**
//  * @param apiParams string | array
//  * @returns Promise
//  * 允许apiParam为字符串或数组
//  * 当apiParam为字符串时，apiFetcher会将这个参数当做api id在apiMapping中进行查找, 根据查找出的URL及METHOD发送请求，默认请求为application/json格式
//  * 当apiParam为数组时，其结构为：[apiID, {restfulData, queryData, postData, type}]
//  * apiID： 必填
//  * restfulData：可选，当url为restful时，需要此参数，类型：Object
//  * queryData：可选，当接口需要queryData时，需要此参数，类型：Object
//  * postData：可选，当接口Method为非GET请求且需要传递数据时，需要此参数，类型：Object
//  */
// const send = async (apiID, ...apiParams) => {
//   // const apiId = apiParams[0];
//   const apiInfoStr = getApiParams(apiID);
//   if (!apiInfoStr) {
//     return Promise.reject(new Error(`未定义的请求 <<<${apiID}>>>`));
//   }
//   const apiInfo = apiInfoStr.split(' ');
//   // 处理请求方式
//   let method = apiInfo[0] || METHOD.GET;
//   method = method.toUpperCase();
//   if (!METHOD[method]) return Promise.reject(new Error(`不支持的请求Method <<<${method}>>>`));
//   // 取得请求URL
//   const url = apiInfo[1];
//   if (!url) {
//     return Promise.reject(new Error(`未定义的请求URL <<<${url}>>>`));
//   }

//   // 当参数类型为字符串时，说明仅传递了一个api id，则直接发送请求
//   let paramArr = [];
//   if (typeof apiParams === 'string') {
//     paramArr = [url, method, {}, {}, {}, 'json'];
//   } else {
//     const { restfulData = {}, queryData = {}, postData = {}, type = 'json' } = apiParams[1];
//     paramArr = [url, method, restfulData, queryData, postData, type];
//   }
//   const { data = {}, [ERROR_MSG_FIELD_NAME]: errorMSG = '' } = await apiClient.send(paramArr).catch(err => {
//     // 处理HTTP ERROR
//     return { [ERROR_MSG_FIELD_NAME]: err.toString() };
//   });
//   // 进行错误转换，由逻辑层做进一步处理
//   if (errorMSG) {
//     data[ERROR_CODE_FIELD_NAME] = -1;
//     data[ERROR_MSG_FIELD_NAME] = errorMSG;
//     data[DATA_FIELD_NAME] = null;
//   }
//   return data;
// };
