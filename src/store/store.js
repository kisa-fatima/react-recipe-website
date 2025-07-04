import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './adminAuthSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'adminAuth',
  storage,
};

const persistedAdminAuthReducer = persistReducer(persistConfig, adminAuthReducer);

const store = configureStore({
  reducer: {
    adminAuth: persistedAdminAuthReducer,
  },
});

export const persistor = persistStore(store);
export default store; 