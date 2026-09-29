import caseStudiesReducer, {
  setCategoryFilter,
  setQueryFilter,
  resetFilters,
  fetchCaseStudies
} from './caseStudiesSlice';
import { INITIAL_CASE_STUDIES, fetchCaseStudies as fetchCaseStudiesApi } from './caseStudiesApi';

describe('caseStudiesSlice', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      category: 'All',
      query: ''
    }
  };

  it('should return initial state when passed empty action', () => {
    expect(caseStudiesReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should update category filter', () => {
    const nextState = caseStudiesReducer(initialState, setCategoryFilter('AI'));
    expect(nextState.filters.category).toBe('AI');
  });

  it('should update query filter', () => {
    const nextState = caseStudiesReducer(initialState, setQueryFilter('blockchain'));
    expect(nextState.filters.query).toBe('blockchain');
  });

  it('should reset filters to All and empty query', () => {
    const modifiedState = {
      ...initialState,
      filters: { category: 'Web', query: 'fintech' }
    };
    const nextState = caseStudiesReducer(modifiedState, resetFilters());
    expect(nextState.filters).toEqual({ category: 'All', query: '' });
  });

  it('should handle fetchCaseStudies.pending', () => {
    const state = caseStudiesReducer(initialState, fetchCaseStudies.pending('requestId'));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle fetchCaseStudies.fulfilled', () => {
    const mockData = [{ id: 'test-1', title: 'Test Study', category: 'Web', summary: 'Summary', year: 2024 }];
    const state = caseStudiesReducer(
      { ...initialState, status: 'loading' },
      fetchCaseStudies.fulfilled(mockData, 'requestId')
    );
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  it('should handle fetchCaseStudies.rejected with rejectWithValue', () => {
    const state = caseStudiesReducer(
      { ...initialState, status: 'loading' },
      fetchCaseStudies.rejected(null, 'requestId', undefined, 'Network failed')
    );
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network failed');
  });
});

describe('caseStudiesApi seed data validation', () => {
  it('contains at least 8 seeded case studies', () => {
    expect(INITIAL_CASE_STUDIES.length).toBeGreaterThanOrEqual(8);
  });

  it('ensures each seed item conforms to required schema', () => {
    const validCategories = ['Web', 'Mobile', 'AI', 'Blockchain'];
    INITIAL_CASE_STUDIES.forEach((item) => {
      expect(typeof item.id).toBe('string');
      expect(typeof item.title).toBe('string');
      expect(validCategories).toContain(item.category);
      expect(typeof item.summary).toBe('string');
      expect(typeof item.year).toBe('number');
    });
  });
});
