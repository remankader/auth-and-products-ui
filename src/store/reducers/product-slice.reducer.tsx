import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    addProductData: {},
    updateProductData: {},
    deleteProductData: {},
    getProductListData: {},
  },
  reducers: {
    addProduct(state, action) {},
    setAddProduct(state, action) {
      state.addProductData = action.payload;
    },
    updateProduct(state, action) {},
    setUpdateProduct(state, action) {
      state.updateProductData = action.payload;
    },
    deleteProduct(state, action) {},
    setDeleteProduct(state, action) {
      state.deleteProductData = action.payload;
    },
    getProductList(state, action) {},
    setGetProductList(state, action) {
      state.getProductListData = action.payload;
    },
  },
});

export const {
  addProduct,
  setAddProduct,
  updateProduct,
  setUpdateProduct,
  deleteProduct,
  setDeleteProduct,
  getProductList,
  setGetProductList,
} = productSlice.actions;

export default productSlice.reducer;
