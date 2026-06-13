export const archetypeProfiles = [
  {
    id: "digital-hustlers",
    name: "Digital Hustlers",
    population: "14.6M",
    politicalLean: "Lean Republican",
    medianIncome: "$74K",
    persuadability: "Very High",
    compass: {
    liberalConservative: 0.35,
    progressiveTraditional: 0.05,
    },
    medianAge: 29,
    homeownershipRate: 28,

    ageDistribution: [
      ["18-24", 27],
      ["25-34", 37],
      ["35-44", 18],
      ["45-54", 10],
      ["55-64", 5],
      ["65+", 3],
    ],

    ethnicityMix: [
      ["White", 44],
      ["Hispanic", 25],
      ["Asian", 15],
      ["African American", 10],
      ["Other", 6],
    ],

    incomeDistribution: [
      ["$0-49K", 22],
      ["$50-99K", 33],
      ["$100-149K", 23],
      ["$150-249K", 15],
      ["$250K+", 7],
    ],

    behavioralDNA: {
      overIndex: [
        ["E-commerce heavy", 81],
        ["Food delivery", 76],
        ["Crypto interest", 68],
        ["Gaming content", 69],
        ["Ride share usage", 64],
        ["YouTube finance", 58],
        ["Sports betting", 47],
      ],
      underIndex: [
        ["Homeownership", -42],
        ["Luxury travel", -28],
        ["Cable news consumption", -55],
        ["Big-box retail visitation", -31],
        ["Traditional banking", -37],
      ],
    },

    economicProfile: [
      ["Financial Security", "Low-Medium"],
      ["Inflation Sensitivity", "High"],
      ["Debt Load", "High"],
      ["Discretionary Spend Trend", "-2% YoY"],
      ["Savings Rate", "5%"],
      ["Gig Economy Participation", "High"],
    ],

    politicalProfile: [
      ["Inflation / Prices", 88],
      ["Crime / Safety", 72],
      ["Immigration", 71],
      ["Education / Schools", 49],
      ["Healthcare", 46],
      ["Climate Change", 28],
      ["Government Corruption", 67],
      ["Freedom / Anti-Establishment", 74],
    ],

    geography: [
      ["Phoenix", "High"],
      ["Austin", "High"],
      ["Las Vegas", "High"],
      ["Miami", "Medium-High"],
      ["Dallas", "Medium-High"],
      ["Atlanta", "Medium"],
    ],

    urbanicity: [
      ["Urban", 49],
      ["Suburban", 41],
      ["Rural", 10],
    ],

    persuadabilityTopics: [
      "Economic opportunity",
      "Cost of living",
      "Government corruption",
      "Freedom / anti-establishment messaging",
      "Technology and innovation",
    ],

    coalitionOverlap: [
      ["Multicultural Digital Natives", 63],
      ["Young Achievers", 54],
      ["Economic Survivalists", 49],
      ["Latino Aspirational Families", 38],
    ],

    filters: {
        regions: ["West Coast", "South", "Central"],
        demographics: ["Male", "Female", "Other"],
        incomes: ["0-50K", "50-100K", "100-150K"],
        ethnicities: ["White", "Hispanic", "Asian", "African American"],
        },
  },

  {
    id: "suburban-family-first",
    name: "Suburban Family First",
    population: "23M",
    politicalLean: "Competitive / Lean Mixed",
    medianIncome: "$128K",
    persuadability: "High",
    compass: {
    liberalConservative: 0.05,
    progressiveTraditional: 0.15,
    },
    medianAge: 41,
    homeownershipRate: 74,

    ageDistribution: [
      ["18-24", 6],
      ["25-34", 16],
      ["35-44", 26],
      ["45-54", 28],
      ["55-64", 17],
      ["65+", 7],
    ],

    ethnicityMix: [
      ["White", 62],
      ["Hispanic", 19],
      ["Asian", 9],
      ["African American", 8],
      ["Other", 2],
    ],

    incomeDistribution: [
      ["$0-49K", 8],
      ["$50-99K", 24],
      ["$100-149K", 31],
      ["$150-249K", 24],
      ["$250K+", 13],
    ],

    behavioralDNA: {
      overIndex: [
        ["Costco visitation", 78],
        ["SUV ownership", 64],
        ["Home improvement spend", 52],
        ["Streaming family content", 49],
        ["Grocery delivery", 33],
        ["Youth sports participation", 29],
        ["Disney+/Netflix family viewing", 27],
      ],
      underIndex: [
        ["Luxury fashion", -24],
        ["Crypto/Web3 content", -41],
        ["Nightlife spend", -47],
        ["Sports betting", -39],
        ["Gaming content", -53],
      ],
    },

    economicProfile: [
      ["Financial Security", "Medium-High"],
      ["Inflation Sensitivity", "High"],
      ["Childcare Burden", "High"],
      ["Mortgage Pressure", "Medium"],
      ["Discretionary Spend Trend", "-6% YoY"],
      ["Savings Rate", "12%"],
    ],

    politicalProfile: [
      ["Inflation / Cost of Living", 92],
      ["Education / Schools", 81],
      ["Healthcare", 73],
      ["Crime / Public Safety", 62],
      ["Housing Affordability", 57],
      ["Immigration", 44],
      ["Climate Change", 41],
      ["Gun Rights", 38],
    ],

    geography: [
      ["Dallas-Fort Worth", "High"],
      ["Phoenix", "High"],
      ["Atlanta", "High"],
      ["Charlotte", "High"],
      ["Tampa", "Medium-High"],
      ["Nashville suburbs", "Medium"],
    ],

    urbanicity: [
      ["Suburban", 72],
      ["Urban", 18],
      ["Rural", 10],
    ],

    persuadabilityTopics: [
      "Inflation",
      "Education quality",
      "Healthcare affordability",
      "Housing costs",
      "Child tax credits",
    ],

    coalitionOverlap: [
      ["Latino Aspirational Families", 55],
      ["Eco-Conscious Progressives", 48],
      ["Economic Survivalists", 46],
      ["Wellness Maximizers", 42],
    ],

    filters: {
    regions: ["South", "Midwest", "Central"],
    demographics: ["Male", "Female"],
    incomes: ["100-150K", "150-200K", "Above 200K"],
    ethnicities: ["White", "Hispanic", "Asian"],
    },
  },

  {
    id: "eco-conscious-progressives",
    name: "Eco-Conscious Progressives",
    population: "17.0M",
    politicalLean: "Lean Democrat",
    medianIncome: "$142K",
    persuadability: "Medium",
    compass: {
    liberalConservative: -0.75,
    progressiveTraditional: -0.8,
    },
    medianAge: 38,
    homeownershipRate: 61,

    ageDistribution: [
      ["18-24", 11],
      ["25-34", 29],
      ["35-44", 27],
      ["45-54", 18],
      ["55-64", 10],
      ["65+", 5],
    ],

    ethnicityMix: [
      ["White", 56],
      ["Asian", 18],
      ["Hispanic", 14],
      ["African American", 9],
      ["Other", 3],
    ],

    incomeDistribution: [
      ["$0-49K", 6],
      ["$50-99K", 18],
      ["$100-149K", 29],
      ["$150-249K", 31],
      ["$250K+", 16],
    ],

    behavioralDNA: {
      overIndex: [
        ["EV ownership", 84],
        ["Organic grocery shopping", 72],
        ["Boutique fitness", 61],
        ["Sustainable brands", 58],
        ["Public transit usage", 39],
        ["Farmers market visitation", 44],
        ["Streaming documentaries", 31],
      ],
      underIndex: [
        ["Pickup truck ownership", -61],
        ["Fast food visitation", -42],
        ["Sports betting", -49],
        ["Cable news consumption", -35],
        ["Discount retail visitation", -28],
      ],
    },

    economicProfile: [
      ["Financial Security", "High"],
      ["Inflation Sensitivity", "Medium"],
      ["Climate Spending Priority", "High"],
      ["Discretionary Spend Trend", "+4% YoY"],
      ["Savings Rate", "16%"],
      ["Travel Spend", "High"],
    ],

    politicalProfile: [
      ["Climate Change", 93],
      ["Healthcare", 81],
      ["Education / Schools", 74],
      ["Reproductive Rights", 71],
      ["Gun Control", 68],
      ["Public Transportation", 57],
      ["Income Inequality", 63],
      ["Inflation / Prices", 51],
    ],

    geography: [
      ["Seattle", "High"],
      ["San Francisco Bay Area", "High"],
      ["Denver", "High"],
      ["Portland", "Medium-High"],
      ["Boston", "Medium-High"],
      ["Austin", "Medium"],
    ],

    urbanicity: [
      ["Urban", 58],
      ["Suburban", 35],
      ["Rural", 7],
    ],

    persuadabilityTopics: [
      "Climate policy",
      "Healthcare access",
      "Education investment",
      "Reproductive rights",
      "Clean energy incentives",
    ],

    coalitionOverlap: [
      ["Wellness Maximizers", 61],
      ["Urban Progressives", 58],
      ["Asian Affluent Professionals", 49],
      ["Suburban Family First", 48],
    ],

    filters: {
    regions: ["South", "West Coast", "Central"],
    demographics: ["Male", "Female"],
    incomes: ["50-100K", "100-150K"],
    ethnicities: ["Hispanic"],
    },
  },

  {
    id: "economic-survivalists",
    name: "Economic Survivalists",
    population: "21.0M",
    politicalLean: "Competitive / Lean Republican",
    medianIncome: "$58K",
    persuadability: "Very High",
    compass: {
    liberalConservative: 0.25,
    progressiveTraditional: 0.25,
    },
    medianAge: 46,
    homeownershipRate: 57,

    ageDistribution: [
        ["18-24", 8],
        ["25-34", 18],
        ["35-44", 22],
        ["45-54", 25],
        ["55-64", 18],
        ["65+", 9],
    ],

    ethnicityMix: [
        ["White", 51],
        ["Hispanic", 24],
        ["African American", 16],
        ["Asian", 5],
        ["Other", 4],
    ],

    incomeDistribution: [
        ["$0-49K", 46],
        ["$50-99K", 38],
        ["$100-149K", 11],
        ["$150-249K", 4],
        ["$250K+", 1],
    ],

    behavioralDNA: {
        overIndex: [
        ["Dollar store visitation", 83],
        ["Discount grocery shopping", 72],
        ["Fast food visitation", 64],
        ["Buy-now-pay-later usage", 58],
        ["Lottery/gaming spend", 49],
        ["Used vehicle ownership", 46],
        ["Warehouse club shopping", 41],
        ],
        underIndex: [
        ["Luxury travel", -71],
        ["EV ownership", -62],
        ["Organic grocery shopping", -48],
        ["Boutique fitness", -55],
        ["Premium streaming subscriptions", -33],
        ],
    },

    economicProfile: [
        ["Financial Security", "Low"],
        ["Inflation Sensitivity", "Very High"],
        ["Debt Burden", "High"],
        ["Discretionary Spend Trend", "-12% YoY"],
        ["Savings Rate", "3%"],
        ["Housing Cost Stress", "High"],
    ],

    politicalProfile: [
        ["Inflation / Cost of Living", 96],
        ["Jobs / Wages", 84],
        ["Healthcare Costs", 78],
        ["Crime / Public Safety", 67],
        ["Housing Affordability", 65],
        ["Immigration", 54],
        ["Climate Change", 24],
        ["Government Assistance", 48],
    ],

    geography: [
        ["Cleveland", "High"],
        ["Detroit", "High"],
        ["Pittsburgh", "Medium-High"],
        ["Phoenix outer suburbs", "Medium"],
        ["Rural Midwest", "High"],
        ["Southern working-class suburbs", "Medium-High"],
    ],

    urbanicity: [
        ["Suburban", 44],
        ["Urban", 31],
        ["Rural", 25],
    ],

    persuadabilityTopics: [
        "Inflation",
        "Job growth",
        "Healthcare affordability",
        "Housing costs",
        "Gas prices",
    ],

    coalitionOverlap: [
        ["Cultural Traditionalists", 53],
        ["Heartland Anchors", 49],
        ["Digital Hustlers", 49],
        ["Latino Aspirational Families", 44],
    ],
  },

  {
    id: "cultural-traditionalists",
    name: "Cultural Traditionalists",
    population: "19.1M",
    politicalLean: "Lean Republican",
    medianIncome: "$92K",
    persuadability: "Medium-Low",
    compass: {
    liberalConservative: 0.75,
    progressiveTraditional: 0.8,
    },
    medianAge: 49,
    homeownershipRate: 78,

    ageDistribution: [
        ["18-24", 5],
        ["25-34", 13],
        ["35-44", 18],
        ["45-54", 26],
        ["55-64", 24],
        ["65+", 14],
    ],

    ethnicityMix: [
        ["White", 74],
        ["Hispanic", 12],
        ["African American", 8],
        ["Asian", 3],
        ["Other", 3],
    ],

    incomeDistribution: [
        ["$0-49K", 14],
        ["$50-99K", 36],
        ["$100-149K", 27],
        ["$150-249K", 17],
        ["$250K+", 6],
    ],

    behavioralDNA: {
        overIndex: [
        ["Pickup truck ownership", 82],
        ["Church visitation", 71],
        ["Outdoor recreation spend", 63],
        ["Sporting goods retail", 58],
        ["Country music streaming", 49],
        ["DIY/home repair", 44],
        ["Local diner visitation", 38],
        ],
        underIndex: [
        ["EV ownership", -67],
        ["Luxury wellness spend", -43],
        ["Public transit usage", -58],
        ["Organic grocery shopping", -39],
        ["Food delivery apps", -31],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium"],
        ["Inflation Sensitivity", "High"],
        ["Fuel Price Sensitivity", "High"],
        ["Discretionary Spend Trend", "-8% YoY"],
        ["Savings Rate", "10%"],
        ["Homeownership Stability", "High"],
    ],

    politicalProfile: [
        ["Inflation / Cost of Living", 89],
        ["Crime / Public Safety", 81],
        ["Immigration", 78],
        ["Gun Rights", 76],
        ["Religious Freedom", 69],
        ["Energy Independence", 66],
        ["Education / Schools", 52],
        ["Climate Change", 22],
    ],

    geography: [
        ["Nashville", "High"],
        ["Oklahoma City", "High"],
        ["Tampa exurbs", "Medium-High"],
        ["Dallas outer suburbs", "Medium-High"],
        ["Tennessee rural regions", "High"],
        ["Midwest small metros", "Medium"],
    ],

    urbanicity: [
        ["Suburban", 42],
        ["Rural", 39],
        ["Urban", 19],
    ],

    persuadabilityTopics: [
        "Inflation",
        "Fuel prices",
        "Public safety",
        "Immigration",
        "Economic nationalism",
    ],

    coalitionOverlap: [
        ["Heartland Anchors", 64],
        ["Economic Survivalists", 53],
        ["Exurban Explorers", 51],
        ["Suburban Family First", 38],
    ],
  },

  {
    id: "asian-affluent-networkers",
    name: "Asian Affluent Networkers",
    population: "13.1M",
    politicalLean: "Lean Democrat",
    medianIncome: "$168K",
    persuadability: "Medium",
    compass: {
    liberalConservative: -0.35,
    progressiveTraditional: -0.25,
    },
    medianAge: 39,
    homeownershipRate: 69,

    ageDistribution: [
        ["18-24", 8],
        ["25-34", 26],
        ["35-44", 31],
        ["45-54", 22],
        ["55-64", 10],
        ["65+", 3],
    ],

    ethnicityMix: [
        ["Asian", 84],
        ["White", 7],
        ["Hispanic", 4],
        ["African American", 2],
        ["Other", 3],
    ],

    heritageComposition: [
        ["Indian", 32],
        ["Chinese", 27],
        ["Korean", 14],
        ["Vietnamese", 11],
        ["Other Asian", 16],
    ],

    incomeDistribution: [
        ["$0-49K", 4],
        ["$50-99K", 14],
        ["$100-149K", 28],
        ["$150-249K", 36],
        ["$250K+", 18],
    ],

    behavioralDNA: {
        overIndex: [
        ["STEM/technology content", 84],
        ["International travel", 71],
        ["Luxury import vehicle ownership", 66],
        ["Education spending", 63],
        ["Premium grocery shopping", 54],
        ["Streaming global media", 49],
        ["Financial investment activity", 44],
        ],
        underIndex: [
        ["Pickup truck ownership", -69],
        ["Fast food visitation", -38],
        ["Sports betting", -41],
        ["Country music streaming", -52],
        ["Discount retail visitation", -27],
        ],
    },

    economicProfile: [
        ["Financial Security", "High"],
        ["Inflation Sensitivity", "Medium"],
        ["Education Spending Priority", "Very High"],
        ["Discretionary Spend Trend", "+6% YoY"],
        ["Savings Rate", "19%"],
        ["Investment Participation", "High"],
    ],

    politicalProfile: [
        ["Education / Schools", 88],
        ["Healthcare", 79],
        ["Immigration", 74],
        ["Climate Change", 63],
        ["Economic Stability", 58],
        ["Public Safety", 52],
        ["Technology Innovation", 49],
        ["Gun Control", 47],
    ],

    geography: [
        ["San Francisco Bay Area", "High"],
        ["Seattle", "High"],
        ["Northern Virginia", "Medium-High"],
        ["Dallas suburbs", "Medium"],
        ["New Jersey suburbs", "High"],
        ["Orange County", "Medium-High"],
    ],

    urbanicity: [
        ["Suburban", 57],
        ["Urban", 39],
        ["Rural", 4],
    ],

    persuadabilityTopics: [
        "Education policy",
        "Immigration reform",
        "Economic stability",
        "Healthcare access",
        "Technology and innovation",
    ],

    coalitionOverlap: [
        ["Eco-Conscious Progressives", 49],
        ["Young Achievers", 58],
        ["Suburban Family First", 37],
        ["Wellness Maximizers", 34],
    ],
  },

  {
    id: "exurban-explorers",
    name: "Exurban Explorers",
    population: "15.2M",
    politicalLean: "Lean Republican",
    medianIncome: "$104K",
    persuadability: "Medium",
    compass: {
    liberalConservative: 0.55,
    progressiveTraditional: 0.45,
    },
    medianAge: 47,
    homeownershipRate: 82,

    ageDistribution: [
        ["18-24", 5],
        ["25-34", 14],
        ["35-44", 21],
        ["45-54", 27],
        ["55-64", 22],
        ["65+", 11],
    ],

    ethnicityMix: [
        ["White", 69],
        ["Hispanic", 16],
        ["African American", 8],
        ["Asian", 4],
        ["Other", 3],
    ],

    incomeDistribution: [
        ["$0-49K", 10],
        ["$50-99K", 34],
        ["$100-149K", 31],
        ["$150-249K", 19],
        ["$250K+", 6],
    ],

    behavioralDNA: {
        overIndex: [
        ["Pickup truck ownership", 88],
        ["Long-distance commuting", 73],
        ["Home improvement spend", 66],
        ["Outdoor recreation retail", 61],
        ["Gas station / convenience visits", 54],
        ["Big-box retail visitation", 49],
        ["RV / boating / powersports interest", 41],
        ],
        underIndex: [
        ["Public transit usage", -76],
        ["Urban nightlife spend", -59],
        ["Boutique fitness", -44],
        ["Food delivery apps", -37],
        ["Luxury fashion spend", -31],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium-High"],
        ["Inflation Sensitivity", "High"],
        ["Fuel Price Sensitivity", "Very High"],
        ["Discretionary Spend Trend", "-5% YoY"],
        ["Savings Rate", "11%"],
        ["Home Equity Exposure", "High"],
    ],

    politicalProfile: [
        ["Inflation / Cost of Living", 90],
        ["Fuel Prices / Energy", 86],
        ["Crime / Public Safety", 75],
        ["Immigration", 69],
        ["Gun Rights", 63],
        ["Property Taxes", 58],
        ["Education / Schools", 51],
        ["Climate Change", 26],
    ],

    geography: [
        ["Dallas outer suburbs", "High"],
        ["Phoenix exurbs", "High"],
        ["Atlanta outer suburbs", "Medium-High"],
        ["Nashville exurbs", "Medium-High"],
        ["Tampa / Central Florida exurbs", "Medium-High"],
        ["Charlotte outer suburbs", "Medium"],
    ],

    urbanicity: [
        ["Exurban/Suburban", 68],
        ["Rural", 24],
        ["Urban", 8],
    ],

    persuadabilityTopics: [
        "Gas prices",
        "Cost of living",
        "Property taxes",
        "Public safety",
        "Infrastructure and roads",
    ],

    coalitionOverlap: [
        ["Cultural Traditionalists", 51],
        ["Heartland Anchors", 46],
        ["Suburban Family First", 43],
        ["Economic Survivalists", 37],
    ],
  },

  {
    id: "heartland-anchors",
    name: "Heartland Anchors",
    population: "17.4M",
    politicalLean: "Lean Republican",
    medianIncome: "$81K",
    persuadability: "Medium-Low",
    compass: {
    liberalConservative: 0.65,
    progressiveTraditional: 0.7,
    },
    medianAge: 51,
    homeownershipRate: 79,

    ageDistribution: [
        ["18-24", 4],
        ["25-34", 11],
        ["35-44", 18],
        ["45-54", 26],
        ["55-64", 25],
        ["65+", 16],
    ],

    ethnicityMix: [
        ["White", 76],
        ["Hispanic", 11],
        ["African American", 8],
        ["Asian", 2],
        ["Other", 3],
    ],

    incomeDistribution: [
        ["$0-49K", 16],
        ["$50-99K", 41],
        ["$100-149K", 25],
        ["$150-249K", 14],
        ["$250K+", 4],
    ],

    behavioralDNA: {
        overIndex: [
        ["Local business visitation", 81],
        ["Regional grocery shopping", 69],
        ["Church/community events", 63],
        ["Domestic vehicle ownership", 57],
        ["Home improvement spend", 49],
        ["Local sports engagement", 44],
        ["Family dining visitation", 38],
        ],
        underIndex: [
        ["Luxury travel", -61],
        ["EV ownership", -54],
        ["Premium wellness spend", -43],
        ["Public transit usage", -67],
        ["Food delivery apps", -31],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium"],
        ["Inflation Sensitivity", "High"],
        ["Community Stability", "High"],
        ["Discretionary Spend Trend", "-6% YoY"],
        ["Savings Rate", "9%"],
        ["Homeownership Stability", "High"],
    ],

    politicalProfile: [
        ["Inflation / Cost of Living", 91],
        ["Public Safety", 79],
        ["Jobs / Manufacturing", 74],
        ["Immigration", 63],
        ["Property Taxes", 59],
        ["Healthcare", 54],
        ["Education / Schools", 48],
        ["Climate Change", 21],
    ],

    geography: [
        ["Ohio small metros", "High"],
        ["Indiana suburbs", "High"],
        ["Wisconsin regional metros", "Medium-High"],
        ["Missouri suburbs", "Medium"],
        ["Iowa communities", "High"],
        ["Western Pennsylvania", "Medium-High"],
    ],

    urbanicity: [
        ["Suburban", 46],
        ["Rural", 37],
        ["Urban", 17],
    ],

    persuadabilityTopics: [
        "Cost of living",
        "Local economic growth",
        "Manufacturing/jobs",
        "Healthcare affordability",
        "Community safety",
    ],

    coalitionOverlap: [
        ["Cultural Traditionalists", 64],
        ["Exurban Explorers", 46],
        ["Economic Survivalists", 49],
        ["Suburban Family First", 34],
    ],
  },

  {
    id: "latino-aspirational-families",
    name: "Latino Aspirational Families",
    population: "19.2M",
    politicalLean: "Competitive",
    medianIncome: "$86K",
    persuadability: "High",
    compass: {
    liberalConservative: 0.05,
    progressiveTraditional: 0.1,
    },
    medianAge: 34,
    homeownershipRate: 63,

    ageDistribution: [
        ["18-24", 16],
        ["25-34", 31],
        ["35-44", 28],
        ["45-54", 15],
        ["55-64", 7],
        ["65+", 3],
    ],

    ethnicityMix: [
        ["Hispanic", 88],
        ["White", 5],
        ["African American", 3],
        ["Asian", 2],
        ["Other", 2],
    ],

    heritageComposition: [
        ["Mexican", 46],
        ["Puerto Rican", 15],
        ["Cuban", 10],
        ["Dominican", 9],
        ["Peruvian", 4],
        ["Other Latin American", 16],
    ],

    incomeDistribution: [
        ["$0-49K", 24],
        ["$50-99K", 41],
        ["$100-149K", 22],
        ["$150-249K", 10],
        ["$250K+", 3],
    ],

    behavioralDNA: {
        overIndex: [
        ["Family dining visitation", 74],
        ["SUV/truck ownership", 69],
        ["Soccer content consumption", 61],
        ["Warehouse club shopping", 57],
        ["Mobile-first commerce", 49],
        ["Remittance activity", 38],
        ["Home improvement purchases", 36],
        ],
        underIndex: [
        ["Luxury wellness spend", -41],
        ["Public transit usage", -28],
        ["Traditional print news", -62],
        ["Organic grocery shopping", -19],
        ["Luxury fashion spend", -26],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium"],
        ["Inflation Sensitivity", "High"],
        ["Family Spending Priority", "Very High"],
        ["Discretionary Spend Trend", "-4% YoY"],
        ["Savings Rate", "8%"],
        ["Small Business Activity", "High"],
    ],

    politicalProfile: [
        ["Inflation / Cost of Living", 91],
        ["Jobs / Economic Opportunity", 83],
        ["Education / Schools", 74],
        ["Healthcare", 69],
        ["Immigration", 61],
        ["Public Safety", 58],
        ["Housing Affordability", 55],
        ["Climate Change", 34],
    ],

    geography: [
        ["Houston", "High"],
        ["Phoenix", "High"],
        ["Miami", "High"],
        ["Las Vegas", "Medium-High"],
        ["Dallas-Fort Worth", "Medium-High"],
        ["Southern California Inland Empire", "High"],
    ],

    urbanicity: [
        ["Suburban", 52],
        ["Urban", 38],
        ["Rural", 10],
    ],

    persuadabilityTopics: [
        "Economic opportunity",
        "Education quality",
        "Healthcare affordability",
        "Public safety",
        "Immigration reform",
    ],

    coalitionOverlap: [
        ["Suburban Family First", 55],
        ["Economic Survivalists", 44],
        ["Digital Hustlers", 38],
        ["Heartland Anchors", 31],
    ],
  },

  {
    id: "multicultural-digital-natives",
    name: "Multicultural Digital Natives",
    population: "15.5M",
    politicalLean: "Competitive / Lean Democrat",
    medianIncome: "$79K",
    persuadability: "Very High",
    compass: {
    liberalConservative: -0.25,
    progressiveTraditional: -0.35,
    },
    medianAge: 28,
    homeownershipRate: 24,

    ageDistribution: [
        ["18-24", 34],
        ["25-34", 41],
        ["35-44", 15],
        ["45-54", 6],
        ["55-64", 3],
        ["65+", 1],
    ],

    ethnicityMix: [
        ["Hispanic", 34],
        ["White", 28],
        ["African American", 19],
        ["Asian", 14],
        ["Other", 5],
    ],

    incomeDistribution: [
        ["$0-49K", 29],
        ["$50-99K", 39],
        ["$100-149K", 19],
        ["$150-249K", 10],
        ["$250K+", 3],
    ],

    behavioralDNA: {
        overIndex: [
        ["TikTok / short-form video consumption", 88],
        ["Mobile-first commerce", 74],
        ["Streaming entertainment", 69],
        ["Food delivery app usage", 63],
        ["Creator economy engagement", 58],
        ["Sneaker/streetwear spend", 47],
        ["Social commerce activity", 44],
        ],
        underIndex: [
        ["Cable television consumption", -78],
        ["Print news readership", -73],
        ["Homeownership", -52],
        ["Luxury travel", -31],
        ["Traditional banking usage", -28],
        ],
    },

    economicProfile: [
        ["Financial Security", "Low-Medium"],
        ["Inflation Sensitivity", "High"],
        ["Gig Economy Participation", "High"],
        ["Discretionary Spend Trend", "+1% YoY"],
        ["Savings Rate", "4%"],
        ["Rental Household Share", "High"],
    ],

    politicalProfile: [
        ["Cost of Living", 82],
        ["Student Debt", 74],
        ["Jobs / Economic Opportunity", 71],
        ["Social Justice", 66],
        ["Healthcare", 61],
        ["Climate Change", 57],
        ["Technology Regulation", 43],
        ["Immigration", 41],
    ],

    geography: [
        ["Los Angeles", "High"],
        ["Houston", "High"],
        ["Atlanta", "Medium-High"],
        ["Miami", "Medium-High"],
        ["New York City", "High"],
        ["Phoenix", "Medium"],
    ],

    urbanicity: [
        ["Urban", 63],
        ["Suburban", 31],
        ["Rural", 6],
    ],

    persuadabilityTopics: [
        "Economic opportunity",
        "Student debt relief",
        "Housing affordability",
        "Technology and creator economy",
        "Healthcare access",
    ],

    coalitionOverlap: [
        ["Digital Hustlers", 63],
        ["Urban Progressives", 46],
        ["Latino Aspirational Families", 41],
        ["Young Achievers", 37],
    ],
  },

  {
    id: "rooted-ethnic-enclaves",
    name: "Rooted Ethnic Enclaves",
    population: "12.9M",
    politicalLean: "Competitive",
    medianIncome: "$72K",
    persuadability: "Medium-High",
    compass: {
    liberalConservative: -0.05,
    progressiveTraditional: 0.05,
    },
    medianAge: 42,
    homeownershipRate: 66,

    ageDistribution: [
        ["18-24", 11],
        ["25-34", 23],
        ["35-44", 27],
        ["45-54", 21],
        ["55-64", 12],
        ["65+", 6],
    ],

    ethnicityMix: [
        ["Hispanic", 41],
        ["Asian", 32],
        ["African American", 18],
        ["White", 6],
        ["Other", 3],
    ],

    heritageComposition: [
        ["Mexican", 21],
        ["Chinese", 14],
        ["Indian", 11],
        ["Dominican", 9],
        ["Korean", 8],
        ["Vietnamese", 7],
        ["Puerto Rican", 6],
        ["Caribbean African", 5],
        ["Other", 19],
    ],

    incomeDistribution: [
        ["$0-49K", 22],
        ["$50-99K", 39],
        ["$100-149K", 23],
        ["$150-249K", 12],
        ["$250K+", 4],
    ],

    behavioralDNA: {
        overIndex: [
        ["Ethnic grocery visitation", 86],
        ["Language-specific media consumption", 74],
        ["Community/religious institution visits", 63],
        ["Cash/remittance activity", 57],
        ["Multi-generational household spend", 49],
        ["Small business activity", 46],
        ["International calling/mobile apps", 38],
        ],
        underIndex: [
        ["Luxury travel", -41],
        ["Country music streaming", -63],
        ["Pickup truck ownership", -52],
        ["Outdoor recreation retail", -36],
        ["Golf/leisure club activity", -28],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium"],
        ["Inflation Sensitivity", "High"],
        ["Family Support Spending", "Very High"],
        ["Discretionary Spend Trend", "-3% YoY"],
        ["Savings Rate", "7%"],
        ["Small Business Ownership", "High"],
    ],

    politicalProfile: [
        ["Cost of Living", 89],
        ["Healthcare", 76],
        ["Education / Schools", 73],
        ["Immigration", 71],
        ["Public Safety", 58],
        ["Small Business Support", 54],
        ["Housing Affordability", 52],
        ["Climate Change", 33],
    ],

    geography: [
        ["Queens / NYC boroughs", "High"],
        ["Houston", "High"],
        ["Los Angeles", "High"],
        ["Miami", "Medium-High"],
        ["Northern New Jersey", "Medium-High"],
        ["San Francisco Bay Area", "Medium"],
    ],

    urbanicity: [
        ["Urban", 61],
        ["Suburban", 33],
        ["Rural", 6],
    ],

    persuadabilityTopics: [
        "Cost of living",
        "Healthcare access",
        "Immigration reform",
        "Education quality",
        "Small business opportunity",
    ],

    coalitionOverlap: [
        ["Latino Aspirational Families", 52],
        ["Asian Affluent Professionals", 39],
        ["Multicultural Digital Natives", 44],
        ["Suburban Family First", 28],
    ],
  },

  {
    id: "wellness-maximizers",
    name: "Wellness Maximizers",
    population: "11.9M",
    politicalLean: "Lean Democrat",
    medianIncome: "$136K",
    persuadability: "Medium",
    compass: {
        liberalConservative: -0.45,
        progressiveTraditional: -0.55,
        },
    medianAge: 37,
    homeownershipRate: 58,

    ageDistribution: [
        ["18-24", 9],
        ["25-34", 32],
        ["35-44", 29],
        ["45-54", 17],
        ["55-64", 10],
        ["65+", 3],
    ],

    ethnicityMix: [
        ["White", 58],
        ["Asian", 16],
        ["Hispanic", 13],
        ["African American", 9],
        ["Other", 4],
    ],

    incomeDistribution: [
        ["$0-49K", 5],
        ["$50-99K", 19],
        ["$100-149K", 33],
        ["$150-249K", 29],
        ["$250K+", 14],
    ],

    behavioralDNA: {
        overIndex: [
        ["Boutique fitness memberships", 86],
        ["Organic grocery shopping", 74],
        ["Wellness supplement purchases", 69],
        ["Meditation/mindfulness content", 58],
        ["Healthy meal delivery", 54],
        ["Wearable fitness tech", 49],
        ["Yoga/Pilates studio visitation", 47],
        ],
        underIndex: [
        ["Fast food visitation", -66],
        ["Sports betting", -53],
        ["Discount retail visitation", -41],
        ["Traditional cable news", -38],
        ["Pickup truck ownership", -34],
        ],
    },

    economicProfile: [
        ["Financial Security", "High"],
        ["Inflation Sensitivity", "Medium"],
        ["Health Spending Priority", "Very High"],
        ["Discretionary Spend Trend", "+7% YoY"],
        ["Savings Rate", "17%"],
        ["Travel & Experience Spend", "High"],
    ],

    politicalProfile: [
        ["Healthcare", 89],
        ["Climate Change", 76],
        ["Mental Health", 72],
        ["Education / Schools", 61],
        ["Reproductive Rights", 59],
        ["Food & Product Safety", 54],
        ["Income Inequality", 49],
        ["Inflation / Prices", 44],
    ],

    geography: [
        ["Los Angeles", "High"],
        ["Denver", "High"],
        ["Austin", "Medium-High"],
        ["Seattle", "Medium"],
        ["Miami", "Medium"],
        ["San Diego", "High"],
    ],

    urbanicity: [
        ["Urban", 51],
        ["Suburban", 43],
        ["Rural", 6],
    ],

    persuadabilityTopics: [
        "Healthcare access",
        "Mental health policy",
        "Climate and sustainability",
        "Food quality and safety",
        "Work-life balance",
    ],

    coalitionOverlap: [
        ["Eco-Conscious Progressives", 61],
        ["Urban Progressives", 48],
        ["Asian Affluent Professionals", 34],
        ["Suburban Family First", 42],
    ],
  },

  {
    id: "aspiring-achievers",
    name: "Aspiring Achievers",
    population: "11.6M",
    politicalLean: "Competitive / Lean Democrat",
    medianIncome: "$118K",
    persuadability: "High",
    compass: {
    liberalConservative: -0.25,
    progressiveTraditional: -0.3,
    },
    medianAge: 31,
    homeownershipRate: 36,

    ageDistribution: [
        ["18-24", 18],
        ["25-34", 49],
        ["35-44", 24],
        ["45-54", 6],
        ["55-64", 2],
        ["65+", 1],
    ],

    ethnicityMix: [
        ["White", 47],
        ["Asian", 21],
        ["Hispanic", 17],
        ["African American", 10],
        ["Other", 5],
    ],

    incomeDistribution: [
        ["$0-49K", 11],
        ["$50-99K", 29],
        ["$100-149K", 33],
        ["$150-249K", 21],
        ["$250K+", 6],
    ],

    behavioralDNA: {
        overIndex: [
        ["LinkedIn/professional networking", 86],
        ["Productivity app subscriptions", 73],
        ["Premium coffee shop visitation", 68],
        ["Investment/finance content", 64],
        ["Frequent business travel", 52],
        ["Luxury tech purchases", 47],
        ["Coworking space usage", 39],
        ],
        underIndex: [
        ["Cable television consumption", -74],
        ["Big-box retail visitation", -43],
        ["Traditional print news", -51],
        ["Pickup truck ownership", -48],
        ["Discount retail visitation", -27],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium-High"],
        ["Inflation Sensitivity", "Medium"],
        ["Career Advancement Priority", "Very High"],
        ["Discretionary Spend Trend", "+8% YoY"],
        ["Savings Rate", "14%"],
        ["Investment Participation", "High"],
    ],

    politicalProfile: [
        ["Economic Opportunity", 86],
        ["Education / Student Debt", 73],
        ["Healthcare", 67],
        ["Technology & Innovation", 61],
        ["Climate Change", 56],
        ["Housing Affordability", 54],
        ["Workforce Mobility", 47],
        ["Public Safety", 39],
    ],

    geography: [
        ["New York City", "High"],
        ["Austin", "High"],
        ["San Francisco Bay Area", "High"],
        ["Seattle", "Medium-High"],
        ["Chicago", "Medium"],
        ["Washington DC", "Medium-High"],
    ],

    urbanicity: [
        ["Urban", 64],
        ["Suburban", 31],
        ["Rural", 5],
    ],

    persuadabilityTopics: [
        "Economic opportunity",
        "Student debt",
        "Housing affordability",
        "Technology and innovation",
        "Career mobility",
    ],

    coalitionOverlap: [
        ["Asian Affluent Professionals", 58],
        ["Digital Hustlers", 54],
        ["Multicultural Digital Natives", 37],
        ["Eco-Conscious Progressives", 34],
    ],
  },

  {
    id: "senior-security-voters",
    name: "Senior Security Voters",
    population: "13.3M",
    politicalLean: "Lean Republican",
    medianIncome: "$76K",
    persuadability: "Medium-Low",
    compass: {
    liberalConservative: 0.45,
    progressiveTraditional: 0.55,
    },
    medianAge: 67,
    homeownershipRate: 84,

    ageDistribution: [
        ["18-24", 1],
        ["25-34", 2],
        ["35-44", 5],
        ["45-54", 14],
        ["55-64", 29],
        ["65+", 49],
    ],

    ethnicityMix: [
        ["White", 78],
        ["Hispanic", 9],
        ["African American", 8],
        ["Asian", 3],
        ["Other", 2],
    ],

    incomeDistribution: [
        ["$0-49K", 31],
        ["$50-99K", 39],
        ["$100-149K", 18],
        ["$150-249K", 9],
        ["$250K+", 3],
    ],

    behavioralDNA: {
        overIndex: [
        ["Healthcare/pharmacy visitation", 84],
        ["Local news consumption", 76],
        ["Home improvement/gardening", 58],
        ["Cruise/travel planning", 44],
        ["Religious/community events", 41],
        ["Financial planning activity", 37],
        ["Cable television viewing", 34],
        ],
        underIndex: [
        ["Food delivery apps", -73],
        ["Crypto interest", -81],
        ["Gaming content", -67],
        ["Ride share usage", -42],
        ["Fast-fashion spending", -39],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium"],
        ["Inflation Sensitivity", "High"],
        ["Healthcare Cost Concern", "Very High"],
        ["Discretionary Spend Trend", "-4% YoY"],
        ["Savings Rate", "18%"],
        ["Retirement Income Dependence", "High"],
    ],

    politicalProfile: [
        ["Social Security / Medicare", 94],
        ["Healthcare Costs", 88],
        ["Inflation / Cost of Living", 82],
        ["Public Safety", 66],
        ["Taxes", 61],
        ["Prescription Drug Costs", 58],
        ["Immigration", 47],
        ["Climate Change", 19],
    ],

    geography: [
        ["Florida retirement corridors", "High"],
        ["Arizona retirement communities", "High"],
        ["Carolinas coastal communities", "Medium-High"],
        ["Central Florida", "Medium"],
        ["Phoenix suburbs", "Medium-High"],
        ["Nevada retirement communities", "Medium"],
    ],

    urbanicity: [
        ["Suburban", 51],
        ["Rural", 31],
        ["Urban", 18],
    ],

    persuadabilityTopics: [
        "Healthcare costs",
        "Social Security stability",
        "Prescription drug pricing",
        "Inflation",
        "Public safety",
    ],

    coalitionOverlap: [
        ["Heartland Anchors", 47],
        ["Cultural Traditionalists", 44],
        ["Suburban Family First", 29],
        ["Economic Survivalists", 26],
    ],
  },

  {
    id: "urban-progressives",
    name: "Urban Progressives",
    population: "17M",
    politicalLean: "Strong Democrat",
    medianIncome: "$124K",
    persuadability: "Medium",
    compass: {
    liberalConservative: -0.85,
    progressiveTraditional: -0.85,
    },
    medianAge: 35,
    homeownershipRate: 39,

    ageDistribution: [
        ["18-24", 15],
        ["25-34", 38],
        ["35-44", 27],
        ["45-54", 12],
        ["55-64", 6],
        ["65+", 2],
    ],

    ethnicityMix: [
        ["White", 49],
        ["Hispanic", 19],
        ["African American", 16],
        ["Asian", 12],
        ["Other", 4],
    ],

    incomeDistribution: [
        ["$0-49K", 12],
        ["$50-99K", 27],
        ["$100-149K", 31],
        ["$150-249K", 22],
        ["$250K+", 8],
    ],

    behavioralDNA: {
        overIndex: [
        ["Public transit usage", 86],
        ["Streaming news/documentaries", 72],
        ["Urban dining/nightlife", 67],
        ["Ride share usage", 61],
        ["Progressive issue engagement", 56],
        ["Cultural institution visitation", 49],
        ["Premium coffee shop visitation", 43],
        ],
        underIndex: [
        ["Pickup truck ownership", -79],
        ["Outdoor recreation retail", -48],
        ["Religious institution visitation", -42],
        ["Country music streaming", -58],
        ["Big-box retail visitation", -31],
        ],
    },

    economicProfile: [
        ["Financial Security", "Medium-High"],
        ["Housing Cost Stress", "Very High"],
        ["Inflation Sensitivity", "Medium"],
        ["Discretionary Spend Trend", "+3% YoY"],
        ["Savings Rate", "11%"],
        ["Rental Household Share", "High"],
    ],

    politicalProfile: [
        ["Climate Change", 91],
        ["Reproductive Rights", 83],
        ["Healthcare", 79],
        ["Social Justice", 76],
        ["Gun Control", 69],
        ["Public Transportation", 63],
        ["Housing Affordability", 58],
        ["Immigration", 52],
    ],

    geography: [
        ["New York City", "High"],
        ["San Francisco", "High"],
        ["Chicago", "Medium-High"],
        ["Seattle", "Medium-High"],
        ["Washington DC", "High"],
        ["Boston", "Medium"],
    ],

    urbanicity: [
        ["Urban", 79],
        ["Suburban", 18],
        ["Rural", 3],
    ],

    persuadabilityTopics: [
        "Housing affordability",
        "Climate policy",
        "Healthcare access",
        "Public transportation",
        "Economic inequality",
    ],

    coalitionOverlap: [
        ["Eco-Conscious Progressives", 58],
        ["Wellness Maximizers", 48],
        ["Multicultural Digital Natives", 46],
        ["Young Achievers", 34],
    ],
  },

];

export function getArchetypeProfileById(id) {
  return archetypeProfiles.find((item) => item.id === id);
}

console.log(
  archetypeProfiles.map((x) => x.id)
);