import {
  selectFilteredCaseStudies,
  selectVisibleCount,
  selectCategoryCounts
} from './caseStudiesSelectors';

describe('caseStudiesSelectors', () => {
  const mockItems = [
    {
      id: '1',
      title: 'Decentralized Exchange',
      category: 'Blockchain',
      summary: 'High performance AMM on Ethereum L2.',
      year: 2024
    },
    {
      id: '2',
      title: 'Computer Vision AI Diagnostics',
      category: 'AI',
      summary: 'Deep neural net for medical imaging.',
      year: 2024
    },
    {
      id: '3',
      title: 'E-Commerce SuperApp',
      category: 'Mobile',
      summary: 'Cross-platform shopping app with offline sync.',
      year: 2023
    },
    {
      id: '4',
      title: 'Enterprise Analytics Dashboard',
      category: 'Web',
      summary: 'Real-time telemetry and reporting portal.',
      year: 2024
    }
  ];

  const buildState = (category = 'All', query = '', items = mockItems) => ({
    caseStudies: {
      items,
      status: 'succeeded',
      error: null,
      filters: { category, query }
    }
  });

  describe('selectFilteredCaseStudies', () => {
    it('returns all items when category is "All" and query is empty', () => {
      const state = buildState('All', '');
      const result = selectFilteredCaseStudies(state);
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockItems);
    });

    it('filters items strictly by category', () => {
      const state = buildState('AI', '');
      const result = selectFilteredCaseStudies(state);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
      expect(result[0].category).toBe('AI');
    });

    it('filters items by query case-insensitively against title', () => {
      const state = buildState('All', 'exchange');
      const result = selectFilteredCaseStudies(state);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('filters items by query case-insensitively against summary', () => {
      const state = buildState('All', 'telemetry');
      const result = selectFilteredCaseStudies(state);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('4');
    });

    it('combines category and query filters simultaneously', () => {
      // "Enterprise Analytics Dashboard" is Web
      const matchingState = buildState('Web', 'enterprise');
      expect(selectFilteredCaseStudies(matchingState)).toHaveLength(1);

      // Same query but wrong category should return empty
      const nonMatchingState = buildState('AI', 'enterprise');
      expect(selectFilteredCaseStudies(nonMatchingState)).toHaveLength(0);
    });

    it('trims whitespace in search query', () => {
      const state = buildState('All', '   superapp   ');
      const result = selectFilteredCaseStudies(state);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('3');
    });

    it('returns empty array when items is empty or non-array', () => {
      const state = buildState('All', '', []);
      expect(selectFilteredCaseStudies(state)).toEqual([]);
    });
  });

  describe('selectVisibleCount', () => {
    it('returns total count when no filters are applied', () => {
      const state = buildState('All', '');
      expect(selectVisibleCount(state)).toBe(4);
    });

    it('returns filtered count when category filter is active', () => {
      const state = buildState('Blockchain', '');
      expect(selectVisibleCount(state)).toBe(1);
    });

    it('returns 0 when nothing matches', () => {
      const state = buildState('All', 'non-existent-query-string-12345');
      expect(selectVisibleCount(state)).toBe(0);
    });
  });

  describe('selectCategoryCounts', () => {
    it('computes correct counts per category including "All"', () => {
      const state = buildState();
      const counts = selectCategoryCounts(state);
      expect(counts).toEqual({
        All: 4,
        Web: 1,
        Mobile: 1,
        AI: 1,
        Blockchain: 1
      });
    });
  });
});
