import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_FEATURES = [
  {
    id: "senior-engineers",
    title: "Senior Engineers",
    desc: "Top 5% vetted developers with real production experience.",
    theme: "purple",
    accentColor: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    borderColor: "border-[#8B5CF6]/50",
    activeBorderColor: "border-[#A855F7]",
    iconBg: "bg-[#170E38]",
    iconBorder: "border-[#8B5CF6]/40",
    dashColor: "bg-[#A855F7]",
    particleColor: "#A855F7"
  },
  {
    id: "fast-delivery",
    title: "Fast Delivery",
    desc: "Quick onboarding and rapid execution to meet your deadlines.",
    theme: "blue",
    accentColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    borderColor: "border-[#3B82F6]/50",
    activeBorderColor: "border-[#38BDF8]",
    iconBg: "bg-[#0B1A3D]",
    iconBorder: "border-[#3B82F6]/40",
    dashColor: "bg-[#38BDF8]",
    particleColor: "#38BDF8"
  },
  {
    id: "scalable-teams",
    title: "Scalable Teams",
    desc: "Easily scale up or down based on your project requirements.",
    theme: "cyan",
    accentColor: "#22D3EE",
    glowColor: "rgba(34, 211, 238, 0.4)",
    borderColor: "border-[#06B6D4]/50",
    activeBorderColor: "border-[#22D3EE]",
    iconBg: "bg-[#062432]",
    iconBorder: "border-[#06B6D4]/40",
    dashColor: "bg-[#22D3EE]",
    particleColor: "#22D3EE"
  },
  {
    id: "secure-by-design",
    title: "Secure by Design",
    desc: "Security-first development to protect your data and users.",
    theme: "pink",
    accentColor: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    borderColor: "border-[#EC4899]/50",
    activeBorderColor: "border-[#F472B6]",
    iconBg: "bg-[#2D0B24]",
    iconBorder: "border-[#EC4899]/40",
    dashColor: "bg-[#EC4899]",
    particleColor: "#EC4899"
  }
];

const initialState = {
  features: INITIAL_FEATURES,
  activeFeatureId: null,
};

const whyChooseUsSlice = createSlice({
  name: 'whyChooseUs',
  initialState,
  reducers: {
    setActiveFeatureId: (state, action) => {
      state.activeFeatureId = state.activeFeatureId === action.payload ? null : action.payload;
    },
    resetActiveFeature: (state) => {
      state.activeFeatureId = null;
    }
  }
});

export const { setActiveFeatureId, resetActiveFeature } = whyChooseUsSlice.actions;

export default whyChooseUsSlice.reducer;
