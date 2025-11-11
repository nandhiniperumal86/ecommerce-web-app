import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
