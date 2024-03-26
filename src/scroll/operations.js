import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const categoriesListThunk = createAsyncThunk('category', async (_, thunkAPI) => {
  try {
    const res = await axios.get('products/category');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const productListThunk = createAsyncThunk('products', async (params, thunkAPI) => {
  try {
    const { search, category, recomended, page, limit } = params;
    const queryParams = [];

    if (search && search.trim() !== '') {
      queryParams.push(`search=${search}`);
    }

    if (category && category !== 'all') {
      queryParams.push(`category=${category}`);
    }

    if (recomended && recomended !== 'all') {
      queryParams.push(`recommended=${recomended}`);
    }

    queryParams.push(`page=${page}`);
    queryParams.push(`limit=${limit}`);

    const queryParamsString = queryParams.join('&');

    const url = `products/?${queryParamsString}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const infiniteScrollThunk = createAsyncThunk('infiniteScroll', async (params, thunkAPI) => {
  try {
    const { search, category, recomended, page, limit } = params;
    const queryParams = [];

    if (search && search.trim() !== '') {
      queryParams.push(`search=${search}`);
    }

    if (category && category !== 'all') {
      queryParams.push(`category=${category}`);
    }

    if (recomended && recomended !== 'all') {
      queryParams.push(`recomended=${recomended}`);
    }

    queryParams.push(`page=${page}`);
    queryParams.push(`limit=${limit}`);

    const queryParamsString = queryParams.join('&');

    const url = `products/?${queryParamsString}`;

    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
