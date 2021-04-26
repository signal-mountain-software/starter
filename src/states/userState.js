import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});

export default userState;
