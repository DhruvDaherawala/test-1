import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCaseStudies,
  setCategoryFilter,
  setQueryFilter,
  resetFilters
} from './caseStudiesSlice';
import {
  selectFilteredCaseStudies,
  selectVisibleCount,
  selectCaseStudiesStatus,
  selectCaseStudiesError,
  selectCategoryFilter,
  selectQueryFilter,
  selectCategoryCounts,
  selectCaseStudiesItems
} from './caseStudiesSelectors';

import FilterChips from './components/FilterChips';
import SearchInput from './components/SearchInput';
import CaseStudyCard from './components/CaseStudyCard';
import CaseStudiesSkeleton from './components/CaseStudiesSkeleton';
import CaseStudiesError from './components/CaseStudiesError';
import CaseStudiesEmpty from './components/CaseStudiesEmpty';

const CaseStudiesBoard = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectCaseStudiesStatus);
  const error = useSelector(selectCaseStudiesError);
  const activeCategory = useSelector(selectCategoryFilter);
  const searchQuery = useSelector(selectQueryFilter);
  const filteredStudies = useSelector(selectFilteredCaseStudies);
  const visibleCount = useSelector(selectVisibleCount);
  const allItems = useSelector(selectCaseStudiesItems);
  const categoryCounts = useSelector(selectCategoryCounts);

  useEffect(() => {
    let promise;
    if (status === 'idle') {
      promise = dispatch(fetchCaseStudies());
    }
    return () => {
      if (promise && typeof promise.abort === 'function') {
        promise.abort();
      }
    };
  }, [dispatch, status]);

  const handleSelectCategory = useCallback(
    (category) => {
      dispatch(setCategoryFilter(category));
    },
    [dispatch]
  );

  const handleChangeQuery = useCallback(
    (query) => {
      dispatch(setQueryFilter(query));
    },
    [dispatch]
  );

  const handleClearQuery = useCallback(() => {
    dispatch(setQueryFilter(''));
  }, [dispatch]);

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);

  const isLoading = status === 'loading';
  const isFailed = status === 'failed';
  const isSucceeded = status === 'succeeded';

  return (
    <section
      id="case-study"
      aria-label="Case Studies Portfolio"
      className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 -z-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FC466B]/15 to-[#3F5EFB]/15 border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-[#FC466B] animate-ping" />
          <span>Real-World Impact</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Engineered for <span className="bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">Scale & Precision</span>
        </h2>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our proven production case studies spanning Web platforms, Mobile applications, Applied AI systems, and Blockchain architectures.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 p-4 sm:p-5 rounded-2xl bg-[#110D2E]/80 backdrop-blur-md border border-white/10 shadow-xl">
        <FilterChips
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          categoryCounts={categoryCounts}
        />

        <SearchInput
          query={searchQuery}
          onChangeQuery={handleChangeQuery}
          onClearQuery={handleClearQuery}
        />
      </div>

      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between text-xs sm:text-sm text-gray-400 px-2">
        <div>
          {isLoading ? (
            <span>Fetching case studies...</span>
          ) : (
            <span>
              Showing{' '}
              <strong className="text-white font-semibold">{visibleCount}</strong>{' '}
              of <strong className="text-white font-semibold">{allItems.length}</strong> case studies
              {activeCategory !== 'All' && (
                <> in <span className="text-purple-300 font-semibold">{activeCategory}</span></>
              )}
              {searchQuery && (
                <> matching <span className="text-purple-300 font-mono">"{searchQuery}"</span></>
              )}
            </span>
          )}
        </div>

        {(activeCategory !== 'All' || searchQuery) && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-purple-400 hover:text-purple-200 transition-colors duration-150 underline underline-offset-4 focus:outline-none"
          >
            Reset filters
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto min-h-[400px]">
        {isLoading && <CaseStudiesSkeleton count={6} />}

        {!isLoading && isFailed && (
          <CaseStudiesError error={error} onRetry={handleRetry} />
        )}

        {!isLoading && !isFailed && isSucceeded && visibleCount === 0 && (
          <CaseStudiesEmpty
            category={activeCategory}
            query={searchQuery}
            onReset={handleResetFilters}
          />
        )}

        {!isLoading && !isFailed && visibleCount > 0 && (
          <div
            key={`${activeCategory}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn transition-opacity duration-300"
          >
            {filteredStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesBoard;
