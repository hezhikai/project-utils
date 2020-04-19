import { Message } from 'element-ui';

/**
 * 复制文字
 * @param {*string} text 所要复制的文字内容
 */
export function copyText(text) {
  let textarea = document.createElement('textarea');
  textarea.id = 'copyTextarea';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  let copyTextarea = document.getElementById('copyTextarea');
  copyTextarea.value = text;
  copyTextarea.select();
  document.execCommand('copy');
  Message({
    type: 'success',
    message: '复制成功！'
  });
  document.body.removeChild(textarea);
}
