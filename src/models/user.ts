export interface IState {
  userInfo: {
    id: string;
  };
}

const initState: IState = {
  userInfo: {
    id: '',
  },
};

export default {
  namespace: 'user',
  state: initState,
  reducers: {
    updateUserInfo(state: IState, {payload}: any) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
