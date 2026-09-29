import { createSelector } from '@reduxjs/toolkit';

export const selectCaseStudiesState = (state) => state.caseStudies;

export const selectCaseStudiesItems = (state) => state.caseStudies.items;
export const selectCaseStudiesStatus = (state) => state.caseStudies.status;
export const selectCaseStudiesError = (state) => state.caseStudies.error;
export const selectCaseStudiesFilters = (state) => state.caseStudies.filters;
export const selectCategoryFilter = (state) => state.caseStudies.filters.category;
export const selectQueryFilter = (state) => state.caseStudies.filters.query;

export const selectIsLoading = (state) => state.caseStudies.status === 'loading';
export const selectIsFailed = (state) => state.caseStudies.status === 'failed';
export const selectIsSucceeded = (state) => state.caseStudies.status === 'succeeded';
export const selectIsIdle = (state) => state.caseStudies.status === 'idle';

export const selectFilteredCaseStudies = createSelector(
  [selectCaseStudiesItems, selectCategoryFilter, selectQueryFilter],
  (items, category, query) => {
    if (!Array.isArray(items)) return [];

    const normalizedQuery = (query || '').trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory =
        category === 'All' || !category || item.category === category;

      const matchesQuery =
        !normalizedQuery ||
        (item.title && item.title.toLowerCase().includes(normalizedQuery)) ||
        (item.summary && item.summary.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }
);

export const selectVisibleCount = createSelector(
  [selectFilteredCaseStudies],
  (filteredItems) => filteredItems.length
);

export const selectCategoryCounts = createSelector(
  [selectCaseStudiesItems],
  (items) => {
    const counts = { All: items.length, Web: 0, Mobile: 0, AI: 0, Blockchain: 0 };
    items.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category] += 1;
      }
    });
    return counts;
  }
);
