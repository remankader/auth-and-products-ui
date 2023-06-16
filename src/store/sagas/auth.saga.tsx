import { call, put, takeLatest } from "redux-saga/effects";
import {
  jwtLogin,
  jwtLogout,
  setJwtLogin,
  setJwtLogout,
  setJwtUpdateAccessToken,
  jwtUpdateAccessToken,
  jwtRegister,
  setJwtRegister,
} from "../reducers/auth-slice.reducer";
import request from "../request";

export function* authSaga() {
  yield takeLatest(jwtLogin.type, handleJwtLogin);
  yield takeLatest(jwtRegister.type, handleJwtRegister);
  yield takeLatest(jwtUpdateAccessToken.type, handleJwtUpdateAccessToken);
  yield takeLatest(jwtLogout.type, handleJwtLogout);
}

export function* handleJwtLogin(action: any): any {
  const response = yield call(
    request,
    "auth/login",
    "post",
    "data",
    action.payload
  );
  yield put(setJwtLogin(response));
}

export function* handleJwtRegister(action: any): any {
  const response = yield call(
    request,
    "auth/register",
    "post",
    "data",
    action.payload
  );
  yield put(setJwtRegister(response));
}

export function* handleJwtUpdateAccessToken(action: any): any {
  const response = yield call(
    request,
    "auth/access-token",
    "put",
    "data",
    action.payload
  );
  yield put(setJwtUpdateAccessToken(response));
}

export function* handleJwtLogout(action: any): any {
  const response = yield call(
    request,
    "auth/logout",
    "delete",
    "data",
    action.payload
  );
  yield put(setJwtLogout(response));
}
