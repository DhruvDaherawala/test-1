import whyChooseUsReducer, {
  setActiveFeatureId,
  resetActiveFeature,
  INITIAL_FEATURES
} from './whyChooseUsSlice';
import {
  selectWhyChooseUsFeatures,
  selectActiveFeatureId,
  selectActiveFeature
} from './whyChooseUsSelectors';

describe('whyChooseUsSlice and selectors', () => {
  const initialState = {
    features: INITIAL_FEATURES,
    activeFeatureId: null,
  };

  it('should return initial state when passed an empty action', () => {
    expect(whyChooseUsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('contains exactly 4 features matching Problem 2 requirements', () => {
    expect(INITIAL_FEATURES).toHaveLength(4);
    const expectedIds = ['senior-engineers', 'fast-delivery', 'scalable-teams', 'secure-by-design'];
    expect(INITIAL_FEATURES.map((f) => f.id)).toEqual(expectedIds);
  });

  it('sets activeFeatureId when an ID is dispatched', () => {
    const nextState = whyChooseUsReducer(initialState, setActiveFeatureId('fast-delivery'));
    expect(nextState.activeFeatureId).toBe('fast-delivery');
  });

  it('toggles activeFeatureId back to null if clicked again', () => {
    const activeState = { ...initialState, activeFeatureId: 'fast-delivery' };
    const nextState = whyChooseUsReducer(activeState, setActiveFeatureId('fast-delivery'));
    expect(nextState.activeFeatureId).toBeNull();
  });

  it('switches activeFeatureId when clicking a different feature', () => {
    const activeState = { ...initialState, activeFeatureId: 'fast-delivery' };
    const nextState = whyChooseUsReducer(activeState, setActiveFeatureId('scalable-teams'));
    expect(nextState.activeFeatureId).toBe('scalable-teams');
  });

  it('resets activeFeatureId with resetActiveFeature', () => {
    const activeState = { ...initialState, activeFeatureId: 'secure-by-design' };
    const nextState = whyChooseUsReducer(activeState, resetActiveFeature());
    expect(nextState.activeFeatureId).toBeNull();
  });

  describe('selectors', () => {
    const state = {
      whyChooseUs: {
        features: INITIAL_FEATURES,
        activeFeatureId: 'senior-engineers'
      }
    };

    it('selectWhyChooseUsFeatures returns all features', () => {
      expect(selectWhyChooseUsFeatures(state)).toEqual(INITIAL_FEATURES);
    });

    it('selectActiveFeatureId returns the active ID', () => {
      expect(selectActiveFeatureId(state)).toBe('senior-engineers');
    });

    it('selectActiveFeature returns the active feature object', () => {
      const active = selectActiveFeature(state);
      expect(active).toBeDefined();
      expect(active.id).toBe('senior-engineers');
      expect(active.title).toBe('Senior Engineers');
    });

    it('selectActiveFeature returns null when activeFeatureId is null', () => {
      const emptyState = {
        whyChooseUs: {
          features: INITIAL_FEATURES,
          activeFeatureId: null
        }
      };
      expect(selectActiveFeature(emptyState)).toBeNull();
    });
  });
});
