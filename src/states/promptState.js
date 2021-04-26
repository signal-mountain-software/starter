import { atom } from 'recoil';

const promptState = atom({
  key: 'promptState',
  default: null,
  dangerouslyAllowMutability: true,
});

export default promptState;
