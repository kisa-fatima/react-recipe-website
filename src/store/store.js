import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './adminAuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const persistConfig = {
  key: 'adminAuth',
  storage,
};

const persistedAdminAuthReducer = persistReducer(persistConfig, adminAuthReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    adminAuth: persistedAdminAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store; 