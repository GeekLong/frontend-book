
import lodash from 'lodash-es';

var func1 = function(v) {
  alert('111');
  return lodash.isArray(v);
}

var func2 = function(v) {
  return v;
};

export {
  func1,
  func2
}
