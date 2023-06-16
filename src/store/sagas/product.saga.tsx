import { call, put, takeLatest } from "redux-saga/effects";
import {} from "../reducers/auth-slice.reducer";
import {
  addProduct,
  getProductList,
  setAddProduct,
  setGetProductList,
  updateProduct,
  setUpdateProduct,
  deleteProduct,
  setDeleteProduct,
} from "../reducers/product-slice.reducer";
import request from "../request";

export function* productSaga() {
  yield takeLatest(addProduct.type, handleAddProduct);
  yield takeLatest(updateProduct.type, handleUpdateProduct);
  yield takeLatest(deleteProduct.type, handleDeleteProduct);
  yield takeLatest(getProductList.type, handleGetProductList);
}

export function* handleAddProduct(action: any): any {
  const response = yield call(
    request,
    "product",
    "post",
    "data",
    action.payload
  );
  yield put(setAddProduct(response));
}

export function* handleUpdateProduct(action: any): any {
  const response = yield call(
    request,
    `product/${action.payload.id}`,
    "put",
    "data",
    action.payload.data
  );
  yield put(setUpdateProduct(response));
}

export function* handleDeleteProduct(action: any): any {
  const response = yield call(
    request,
    `product`,
    "delete",
    "data",
    action.payload
  );
  yield put(setDeleteProduct(response));
}

export function* handleGetProductList(action: any): any {
  const response = yield call(
    request,
    "product",
    "get",
    "params",
    action.payload
  );
  yield put(setGetProductList(response));
}
