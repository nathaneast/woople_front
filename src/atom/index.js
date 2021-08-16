import { atom } from 'recoil';

export const user = atom({
  key: 'userName',
  default: '',
});
