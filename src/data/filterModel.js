export const filterDistributions = {
  gender: {
    Male: 0.49,
    Female: 0.50,
    Other: 0.01,
  },

  region: {
    "East Coast": 0.18,
    "West Coast": 0.17,
    Midwest: 0.21,
    South: 0.30,
    Central: 0.14,
  },

  income: {
    "0-50K": 0.24,
    "50-100K": 0.31,
    "100-150K": 0.22,
    "150-200K": 0.13,
    "Above 200K": 0.1,
  },

  ethnicity: {
    White: 0.58,
    Asian: 0.07,
    Hispanic: 0.19,
    "African American": 0.12,
    Other: 0.04,
  },
};

export const archetypeFilterMultipliers = {
  "suburban-family-first": {
    region: { South: 1.18, Midwest: 1.08, "East Coast": 0.95, "West Coast": 0.85, Central: 1.02 },
    gender: { Male: 0.98, Female: 1.04, Other: 0.9 },
    income: { "0-50K": 0.45, "50-100K": 0.85, "100-150K": 1.25, "150-200K": 1.35, "Above 200K": 1.12 },
    ethnicity: { White: 1.05, Asian: 0.95, Hispanic: 0.92, "African American": 0.88, Other: 0.9 },
  },

  "digital-hustlers": {
    region: { South: 1.08, Midwest: 0.92, "East Coast": 1.02, "West Coast": 1.12, Central: 0.9 },
    gender: { Male: 1.18, Female: 0.82, Other: 1.25 },
    income: { "0-50K": 1.1, "50-100K": 1.28, "100-150K": 0.9, "150-200K": 0.55, "Above 200K": 0.35 },
    ethnicity: { White: 0.78, Asian: 1.1, Hispanic: 1.28, "African American": 1.16, Other: 1.2 },
  },

  "latino-aspirational-families": {
    region: { South: 1.2, Midwest: 0.75, "East Coast": 0.95, "West Coast": 1.25, Central: 1.05 },
    gender: { Male: 1, Female: 1, Other: 0.8 },
    income: { "0-50K": 0.9, "50-100K": 1.25, "100-150K": 1.05, "150-200K": 0.7, "Above 200K": 0.35 },
    ethnicity: { White: 0.25, Asian: 0.25, Hispanic: 3.8, "African American": 0.35, Other: 0.9 },
  },

  "economic-survivalists": {
    region: { South: 1.18, Midwest: 1.18, "East Coast": 0.78, "West Coast": 0.7, Central: 1.22 },
    gender: { Male: 1.04, Female: 0.98, Other: 0.75 },
    income: { "0-50K": 1.85, "50-100K": 1.25, "100-150K": 0.55, "150-200K": 0.25, "Above 200K": 0.12 },
    ethnicity: { White: 1.12, Asian: 0.45, Hispanic: 0.95, "African American": 1.05, Other: 0.8 },
  },

  "eco-conscious-progressives": {
    region: { South: 0.65, Midwest: 0.78, "East Coast": 1.35, "West Coast": 1.55, Central: 0.7 },
    gender: { Male: 0.82, Female: 1.12, Other: 1.8 },
    income: { "0-50K": 0.75, "50-100K": 0.95, "100-150K": 1.2, "150-200K": 1.25, "Above 200K": 1.15 },
    ethnicity: { White: 1.02, Asian: 1.1, Hispanic: 0.95, "African American": 0.9, Other: 1.15 },
  },
};

export function getFallbackMultiplier() {
  return {
    region: { "East Coast": 1, "West Coast": 1, Midwest: 1, South: 1, Central: 1 },
    gender: { Male: 1, Female: 1, Other: 1 },
    income: { "0-50K": 1, "50-100K": 1, "100-150K": 1, "150-200K": 1, "Above 200K": 1 },
    ethnicity: { White: 1, Asian: 1, Hispanic: 1, "African American": 1, Other: 1 },
  };
}