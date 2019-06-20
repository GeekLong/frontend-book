import * as types from './mutations-types';
import Vue from 'vue';

const ajaxHandle = () => {
  const buildUrl = (url, params) => {
    let str = '?'
    for (const key in params) {
      url += str + key + '=' + params[key];
      str = '&';
    }
    return url;
  };

  const ajaxGet = (url, fn) => {
    let results = null;
    Vue.http.get(url).then((response) => {
      if (response.ok) {
        results = response.body;
        fn(1, results);
      } else {
        fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn(0, results);
      }
    });
  };

  const ajaxPost = (url, params, options, fn) => {
    let results = null;

    if (typeof options === 'function' && arguments.length <= 3) {
      fn = options;
      options = {};
    }

    Vue.http.post(url, params, options).then((response) => {
      if (response.ok) {
        results = response.body;
        fn(1, results);
      } else {
        fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn(0, results);
      }
    })
  };

  const normalAjax = (url, fn, originResult) => {
    const ort = originResult ? originResult : [];
    ajaxGet(url, function(state, results) {
      if (state) {
        let back = ort;
        if (results.status === 0) {
          if (results.data) {
            back = results.data;
          }
        }
        fn(state, back);
      } else {
        fn(state, ort);
      }
    });
  };

  const normalAjaxPost = (url, params, fn, originResult) => {
    const ort = originResult ? originResult : [];
    ajaxPost(url, params, function(state, results) {
      if (state) {
        let back = ort;
        if (results.status === 0) {
          if (results.data) {
            back = results.data;
          }
        }
        fn(state, back);
      } else {
        fn(state, ort);
      }
    });
  };

  return {
    buildUrl: buildUrl,
    ajaxGet: ajaxGet,
    ajaxPost: ajaxPost,
    normalAjax: normalAjax,
    normalAjaxPost: normalAjaxPost
  }
};

const ah = ajaxHandle();

const apiObj = {
  API_GET_USERIFM: ''
};

export default {
  getUserIfm ({ commit }, payload) {
    payload = payload ? payload : {};
    const url = ah.buildUrl(apiObj.API_GET_USERIFM, payload);

    return new Promise((reslove, reject) => {
      ah.normalAjax(url, (state, results) => {
        if (state) {
          commit(types.SET_USERIFMS, results);
          reslove();
        } else {
          reject();
        }
      });
    });
  }
}