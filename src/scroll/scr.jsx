import { createSlice } from '@reduxjs/toolkit';
import { categoriesListThunk, productListThunk } from './operations';

export const recommendedOptions = [
  { value: 'all', label: 'All' },
  { value: 'false', label: 'Recommended' },
  { value: 'true', label: 'Not recommended' },
];

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    list: [],
    isLoading: false,
    error: null,
    filter: {
      search: '',
      category: { value: 'all', label: 'Categories' },
      recomended: recommendedOptions[0],
    },
    page: 1,
  },
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    nextPage: (state, { payload }) => {
      state.page = payload;
    },
    reset: state => {
      state.list = [];
      state.page = 1;
    },
    // setPage: (state, { payload }) => {
    //   state.page = payload;
    // },
    // setHasMore: (state, { payload }) => {
    //   state.hasMore = payload;
    // },
    // setStates: (state, { payload: { isLoading, error } }) => {
    //   state.isLoading = isLoading;

    //   state.error = error;
    // },
  },
  extraReducers: builder =>
    builder
      .addCase(categoriesListThunk.pending, handlePending)
      .addCase(categoriesListThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload;
      })
      .addCase(categoriesListThunk.rejected, handleRejected)
      .addCase(productListThunk.pending, handlePending)
      .addCase(productListThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.list = payload.products;
        state.list.push(...payload.products);
        state.page++;
        state.total = payload.total;
        state.hasMore =
          payload.products.length < state.total ||
          payload.products.length === state.total;
        // state.list = [...state.list, ...payload.products];
        // state.hasMore = payload.products.length === 24;
      })
      .addCase(productListThunk.rejected, handleRejected),
});

function handlePending(state) {
  state.isLoading = true;
}

function handleRejected(state, { payload }) {
  state.isLoading = false;
  state.error = payload;
}

export const productsReducer = productSlice.reducer;
export const { setFilter } = productSlice.actions;
export const resetListReducer = productSlice.actions.reset;
export const nextPageReducer = productSlice.actions.nextPage;
