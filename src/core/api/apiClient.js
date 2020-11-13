/**
 * 定义API调用类
 */

import Axios from 'axios';

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH'
};

/**
 * http 请求客户端
 */
const HttpClient = () => {
  const axios = Axios.create();
  // const apiInterceptorRegister = new ApiInterceptorRegister();
  // const { requestInterceptor, responseInterceptor } = apiInterceptorRegister;
  // axios.interceptors.request.use(requestInterceptor.perform, requestInterceptor.errorHandler);
  // axios.interceptors.response.use(responseInterceptor.perform, responseInterceptor.errorHandler);

  /**
   * 获取http请求配置
   * type类型：json, file, formData
   */
  const getHttpConfig = (method, url, data, type, headers = {}) => {
    const config = Object.assign(
      {},
      {
        url,
        withCredentials: true,
        method,
        validateStatus(status) {
          return status >= 200 && status <= 401;
        },
        headers
      }
    );
    if (method !== METHOD.GET) {
      //   sendURL += genQuery(data);
      //   config.url = sendURL;
      // } else {
      let contentType = '';
      let cfgData = data;
      switch (type) {
        case 'json':
          contentType = 'application/json';
          cfgData = JSON.stringify(data || {});
          break;
        case 'file':
          contentType = 'multipart/form-data';
          cfgData = new FormData();
          for (const key in data) {
            if ({}.hasOwnProperty.call(data, key)) {
              cfgData.append(key, data[key]);
            }
          }
          break;
        case 'formData':
          contentType = 'application/x-www-form-urlencoded';
          config.transformRequest = [
            requestData => {
              let ret = '';
              let index = 0;
              for (const k in requestData) {
                if ({}.hasOwnProperty.call(requestData, k)) {
                  ret += `${index === 0 ? '' : '&'}${encodeURIComponent(k)}=${encodeURIComponent(requestData[k])}`;
                  index += 1;
                }
              }
              return ret;
            }
          ];
          break;
        default:
          break;
      }
      config.headers = Object.assign({ 'Content-Type': contentType }, headers);
      console.log('cfgData:', cfgData);
      config.data = cfgData;
    }
    return config;
  };

  /**
   * HTTP 请求远端数据。
   * @return Promise
   */
  const send = (url, method, headers = {}, data, type = 'json') => {
    // if (!url) return Pro;
    const { request } = axios;
    // const config = getHttpConfig(method, `${Config.api.domain}${url}`, data, type);
    const config = getHttpConfig(method, `${url}`, data, type, headers);
    return request(config);
  };

  return {
    send
  };
};

// const apiClient = () => {
//   const http = HttpClient();
//   /**
//    * 发送请求
//    * @param name APIMapping中的设置 String  [require]
//    * @param restParam restful中的参数，key值跟ApiMapping中设置的变量名对应 Object    [option]
//    * @param queryData query参数 Object    [option]
//    * @param data POST参数 Object    [option]
//    * @param type 发送类型，enum('json', 'file', 'formData')    [option]
//    * @param type 发送类型，enum('json', 'file', 'formData')    [option]
//    */
//   const send = (url, method = 'get', body = {}, type = 'json', headers = {}) => {
//     // let url = restfulUrl;
//     // // 处理URL path参数
//     // url = genRestfulUrl(url, restData);

//     // 请求数据
//     return http.send(url, method, body, type, headers);
//   };

//   return {
//     send
//   };
// };

const { send } = HttpClient();
export default {
  send
};
