export const selectWhyChooseUsState = (state) => state.whyChooseUs;

export const selectWhyChooseUsFeatures = (state) => state.whyChooseUs.features;

export const selectActiveFeatureId = (state) => state.whyChooseUs.activeFeatureId;

export const selectActiveFeature = (state) => {
  const activeId = state.whyChooseUs.activeFeatureId;
  if (!activeId) return null;
  return state.whyChooseUs.features.find((f) => f.id === activeId) || null;
};
