import excel from '@/views/office/excel';
import other from '@/views/office/other';

export default [
  {
    name: 'Excel工具',
    path: 'office/excel',
    meta: {
      title: 'Excel工具'
    },
    component: excel
  },
  {
    name: '其他工具',
    path: 'office/other',
    meta: {
      title: '其他工具'
    },
    component: other
  }
];
