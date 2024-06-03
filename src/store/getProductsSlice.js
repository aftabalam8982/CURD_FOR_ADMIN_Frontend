import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./apis";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await axios.get(URL);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const postProduct = createAsyncThunk(
  "product/postProduct",
  async (productData) => {
    try {
      const res = await axios.post(URL, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (updatedProduct) => {
    const { id, data } = updatedProduct;
    try {
      const res = await axios.put(`${URL}/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const res = await axios.delete(`${URL}/${id}`);
      return id;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  isData: [],
  page: 1,
  pages: 0,
  disable: false,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL PRODUCTS --------------------------->
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isData = action.payload.reverse();
        state.pages = Math.ceil(action.payload.length / 4);
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = true;
      })
      // POST PRODUCT ----------------------------->
      .addCase(postProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.isData = [...state.isData, action.payload];
        state.isLoading = false;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      // UPDATE PRODUCT DATA -------------------------->
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const product = state.isData.find(
          (product) => product._id === action.payload._id
        );
        if (product) {
          Object.assign(product, action.payload);
        }
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.log("error");
        state.error = action.payload;
      })
      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isData = state.isData.filter(
          (product) => product._id !== action.payload
        );
        state.pages = Math.ceil(state.isData.length / 4);
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addPage } = productsSlice.actions;
export default productsSlice.reducer;
