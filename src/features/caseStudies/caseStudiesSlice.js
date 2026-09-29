import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCaseStudies as fetchCaseStudiesApi } from './caseStudiesApi';

export const fetchCaseStudies = createAsyncThunk(
  'caseStudies/fetchCaseStudies',
  async (_, { rejectWithValue, signal }) => {
    try {
      const data = await fetchCaseStudiesApi({ signal });
      return data;
    } catch (error) {
      if (error?.name === 'AbortError') {
        throw error;
      }
      return rejectWithValue(error?.message || 'Network failed');
    }
  }
);

export const fetchCaseStudiesAsync = fetchCaseStudies;

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  filters: {
    category: 'All',
    query: ''
  }
};

const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setQueryFilter: (state, action) => {
      state.filters.query = action.payload;
    },
    resetFilters: (state) => {
      state.filters.category = 'All';
      state.filters.query = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        // Ignore aborted requests to prevent erroneous error state
        if (action.meta?.aborted) {
          return;
        }
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Network failed';
      });
  }
});

export const { setCategoryFilter, setQueryFilter, resetFilters } = caseStudiesSlice.actions;
export default caseStudiesSlice.reducer;
