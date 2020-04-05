import { checkType } from './common';
/**
 * 深拷贝
 * @param obj 拷贝对象
 * @param ignoreKeyList 不拷贝的属性列表
 */
export function deepClone(obj = {}, ignoreKeyList = []) {
  let _obj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (!(obj.constructor === Object && ignoreKeyList.includes(key))) {
      if (checkType(obj[key], ['Array', 'Object'])) {
        _obj[key] = deepClone(obj[key], ignoreKeyList);
      } else {
        _obj[key] = obj[key];
      }
    }
  }
  return _obj;
}
