import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { rootReducer } from './reducers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'],
};

const initStore = (initialState = {}) => {
  const pReducer = persistReducer(persistConfig, rootReducer);
  const middleWares = [thunk];
  const enhancer = composeWithDevTools(applyMiddleware(...middleWares));
  const store = createStore(pReducer, initialState, enhancer);
  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

export default initStore;
