import { takeLatest, put } from 'redux-saga/effects';
import { loginAdmin, logoutAdmin } from './adminAuthSlice';

// These actions will be dispatched from components
export const ADMIN_LOGIN_REQUEST = 'ADMIN_LOGIN_REQUEST';
export const ADMIN_LOGOUT_REQUEST = 'ADMIN_LOGOUT_REQUEST';

function* handleAdminLogin(action) {
  // action.payload: { email, navigate }
  yield put(loginAdmin({ email: action.payload.email }));
  if (action.payload.navigate) {
    action.payload.navigate('/log-in/admin', { replace: true });
  }
}

function* handleAdminLogout(action) {
  yield put(logoutAdmin());
  if (action?.payload?.navigate) {
    action.payload.navigate('/log-in');
  }
}

export default function* adminAuthSaga() {
  yield takeLatest(ADMIN_LOGIN_REQUEST, handleAdminLogin);
  yield takeLatest(ADMIN_LOGOUT_REQUEST, handleAdminLogout);
} 