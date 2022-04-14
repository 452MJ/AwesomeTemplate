import {createLogger} from 'redux-logger';
import {create} from 'dva-core';

let app;

let store;

let dispatch;

let registered;

function createApp(opt) {
  // redux 的日志
  opt.onAction = [createLogger()];
  app = create(opt);
  app.use({
    onError(err) {
      console.log('dvaError', err);
    },
  });
  if (!registered) {
    opt.models.forEach(model => app.model(model));
  }
  registered = true;
  app.start();
  store = app._store;
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  if (global) {
    global.dva_app = app;
  }
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
