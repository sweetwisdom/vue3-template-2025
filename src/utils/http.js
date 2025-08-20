import axios from 'axios';
import { notification } from 'ant-design-vue';
const http = (key, api) => {
  http[key] = axios.create({
    baseURL: api,
    // timeout: 30000,
  });
  // 请求之前拦截
  http[key].interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  http[key].interceptors.response.use(
    res => {
      if (res.headers.authorization) {
        localStorage.setItem('token', res.headers.authorization);
      } else {
        if (res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
      }

      return res;
    },
    err => {
      console.log(err);
      // return err;
      return response_error(err);
    }
  );

  return http[key];
};

const response_error = error => {
  let message = '';

  if (error.response) {
    const data = error.response.data;
    console.log(data, '✅✅✅');
    switch (error.response.status) {
      case 401:
        if (data.code) {
          switch (data.code) {
            case 40101:
              message = '客户端未找到';
              break;
            case 40102:
              message = '错误的客户端凭证';
              break;
            case 40103:
              message = '客户端凭证过期';
              break;
            case 40104:
              message = 'Scope未找到';
              break;
            case 40111:
              message = '身份认证已过期, 请重新登录';
              break;
            case 40112:
              message = '账户已过期';
              break;
            case 40113:
              message = '用户名不存在';
              break;
            default:
              message = data.message || '身份未通过认证，请重新登录';
              break;
          }
        } else {
          message = '身份未通过认证，请重新登录';
        }
        localStorage.clear();
        window.location.reload();
        // removeToken();
        break;
      case 403:
        message = '访问权限不足';
        break;
      case 404:
        // location.href = `http://${document.location.host}#/404`
        message = '访问地址不存在';
        break;
      case 429:
        message = '流量受限';
        break;
      case 503:
        message = '服务不可用';
        break;
      default:
        message = data.message || data.error || '服务异常';
        break;
    }
  } else {
    message = error.message;
    // removeToken();
  }

  if (message.length > 0) {
    notification.error({
      description: message,
      message: '系统错误',
      offset: 50,
    });
  }
  return Promise.reject(error);
};

export default http('base', import.meta.env.VITE_API_BASE_URL);
