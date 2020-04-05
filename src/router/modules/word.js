import excel from '@/views/word/excel';
import other from '@/views/word/other';

export default [
  {
    name: 'Excel工具',
    path: 'word/excel',
    meta: {
      title: 'Excel工具'
    },
    component: excel
  },
  {
    name: '其他工具',
    path: 'word/other',
    meta: {
      title: '其他工具'
    },
    component: other
  }
];
