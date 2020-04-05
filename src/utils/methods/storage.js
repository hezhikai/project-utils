import { coerceBoolean } from './common';
/**
 * 获取 localStorage
 * @param {string} key 键值
 * @returns {*} 缓存数据
 */
export function getLocalStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * 设置 localStorage
 * @param {string} key 键值
 * @param {*} obj 缓存数据
 */
export function setLocalStorageItem(key, obj) {
  if (coerceBoolean(obj)) {
    localStorage.setItem(key, JSON.stringify(obj));
  } else {
    removeLocalStorageItem(key);
  }
}

/**
 * 移除localstorage
 * @param {string} key 键值
 */
export function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

/**
 * 清空localstorage
 */
export function clearLocalStorageItem() {
  localStorage.clear();
}
