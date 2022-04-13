export default {
  namespace: 'user',
  state: {
    userInfo: {
      id: '',
    },
  },
  reducers: {
    updateUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      }
    },
  },
  effects: {},
  subscriptions: {},
}
