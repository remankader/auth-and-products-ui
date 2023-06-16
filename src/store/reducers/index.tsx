import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice.reducer";
import productSliceReducer from "./product-slice.reducer";
import miscSlice from './misc.reducer';

const reducers = combineReducers({
  auth: authSliceReducer,
  product: productSliceReducer,
  misc: miscSlice,
});

export default reducers;
