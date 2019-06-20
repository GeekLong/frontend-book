
import * as types from './mutations-types';
import Vue from 'vue';
const ajaxHandle = () => {
  const buildUrl = (url, params, childParams) => {
    let str = '?'
    for (const key in params) {
      url += str + key + '=' + params[key];
      str = '&';
    }
    if (childParams) {
      return url + '/' + childParams;
    }
    return url;
  };
  const ajaxGet = (url, fn) => {
    let results = null;
    Vue.http.get(url, { emulateJSON: true, credentials: true }).then((response) => {
      if (response.ok) {
        results = response.body;
        fn && fn(1, results);
      } else {
        fn && fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn && fn(0, results);
      }
    });
  };
  const ajaxGetJSON = (url, fn) => {
    let results = null;
    Vue.http.get(url, { credentials: true }).then((response) => {
      if (response.ok) {
        results = response.body;
        fn && fn(1, results);
      } else {
        fn && fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn && fn(0, results);
      }
    });
  };
  const ajaxPost = (url, params, options, fn) => {
    let results = null;
    if (typeof options === 'function' && arguments.length <= 3) {
      fn = options;
      options = {};
    }
    Vue.http.interceptors.push((request, next) => {
      request.credentials = true;
      next();
    });
    Vue.http.post(url, params, { emulateJSON: true }).then((response) => {
      if (response.ok) {
        results = response.body;
        fn && fn(1, results);
      } else {
        fn && fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn && fn(0, results);
      }
    })
  };
  const ajaxPostJSON = (url, params, options, fn) => {
    let results = null;
    if (typeof options === 'function' && arguments.length <= 3) {
      fn = options;
      options = {};
    }
    Vue.http.interceptors.push((request, next) => {
      request.credentials = true;
      next();
    });
    Vue.http.post(url, params).then((response) => {
      if (response.ok) {
        results = response.body;
        fn && fn(1, results);
      } else {
        fn && fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn && fn(0, results);
      }
    })
  };
  return {
    buildUrl: buildUrl,
    ajaxGet: ajaxGet,
    ajaxGetJSON: ajaxGetJSON,
    ajaxPost: ajaxPost,
    ajaxPostJSON: ajaxPostJSON
  }
};

const ah = ajaxHandle();
const prefix = '//xxx.abc.com';

const apiObj = {
  API_GET_POWER: prefix + '/xxxx/yyy', // 获取用户信息
};

const apiFuncObj = {
  getPower: 'API_GET_POWER', // 获取用户信息
};

export default {
  commonActionPost ({ commit }, payload) {
    let url = apiObj[apiFuncObj[payload[0].split(':')[0]]];
    const mutationsName = payload[0].split(':')[1];

    const params = payload[1] ? payload[1] : {};
    return new Promise((reslove, reject) => {
      ah.ajaxPost(url, params, (state, results) => {
        if (state) {
          reslove(results);
        } else {
          reject();
        }
        if (mutationsName) {
          commit(mutationsName, results);
        }
      });
    });
  },
  commonActionPostJSON({ commit }, payload) {
    let url = apiObj[apiFuncObj[payload[0].split(':')[0]]];
    const mutationsName = payload[0].split(':')[1];

    const params = payload[1] ? payload[1] : {};
    return new Promise((reslove, reject) => {
      ah.ajaxPostJSON(url, params, (state, results) => {
        if (state) {
          reslove(results);
        } else {
          reject();
        }
        if (mutationsName) {
          commit(mutationsName, results);
        }
      });
    });
  },
  commonActionGet ({ commit }, payload) {
    let url = apiObj[apiFuncObj[payload[0].split(':')[0]]];
    const mutationsName = payload[0].split(':')[1];

    const params = payload[1] ? payload[1] : {};
    const childParams = payload[2] ? payload[2] : '';
    url = ah.buildUrl(url, params, childParams);
    return new Promise((reslove, reject) => {
      ah.ajaxGet(url, (state, results) => {
        if (state) {
          reslove(results);
        } else {
          reject();
        }
        if (mutationsName) {
          commit(mutationsName, results);
        }
      });
    });
  },
  commonActionGetJSON ({ commit }, payload) {
    let url = apiObj[apiFuncObj[payload[0].split(':')[0]]];
    const mutationsName = payload[0].split(':')[1];

    const params = payload[1] ? payload[1] : {};
    url = ah.buildUrl(url, params);
    return new Promise((reslove, reject) => {
      ah.ajaxGetJSON(url, (state, results) => {
        if (state) {
          reslove(results);
        } else {
          reject();
        }
        if (mutationsName) {
          commit(mutationsName, results);
        }
      });
    });
  }
}