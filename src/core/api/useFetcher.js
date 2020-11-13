import useSWR from 'swr';
import apiFetcher from './apiFetcher';

/**
 * get请求
 *
 * @param {string} apiKey
 * @param {object} [apiParams]
 * @param {object} [options]
 */
export default (apiKey, apiParams = {}, options = {}) => {
  // console.log('useFetcher', apiKey, apiParams);
  // const [params, setParams] = useImmer({
  //   restfulData,
  //   queryData,
  //   postData
  // });
  const key = [apiKey, JSON.stringify(apiParams)];

  const { data, error, isValidating, revalidate, mutate } = useSWR(key, apiFetcher, options);
  return {
    data,
    error,
    isValidating,
    mutate,
    revalidate
  };
};

/**
 * 非get请求
 *
 * @param {string} apiId 请求id
 * @param {object} apiParams 请求参数
 * @param {'json'|'file'|'formData'} [apiParams.type] 默认json
 * @param {object} [apiParams.headers]
 * @param {object} [apiParams.queryData]
 * @param {object} [apiParams.postData]
 * @param {object} [apiParams.restfulData]
 */
export const request = async (apiId, apiParams) => {
  const result = await apiFetcher(apiId, apiParams);
  return result;
};
