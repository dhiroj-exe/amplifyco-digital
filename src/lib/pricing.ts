export const pricingData = {
  socialMedia: [
    {
      id: "starter-digital-presence",
      name: "Starter Digital Presence",
      description: "Best for businesses starting their online presence.",
      price: "₹12,000–₹20,000",
      period: "/month",
      features: [
        "6 Social Media Posts / Month",
        "2 Instagram Reels / Month",
        "Caption Writing + Hashtag Research",
        "Post Publishing & Scheduling",
        "Social Media Profile Optimization",
        "Basic Content Planning",
        "Brand Style Consistency",
        "Monthly Performance Insights",
        "Bio & Highlights Optimization"
      ],
      goal: "Establish a professional online presence",
      highlight: false,
      cta: "Get Started"
    },
    {
      id: "growth-marketing",
      name: "Growth Marketing",
      description: "Best for businesses that want consistent growth and engagement.",
      price: "₹22,000–₹35,000",
      period: "/month",
      features: [
        "10 Social Media Posts / Month",
        "5 Instagram Reels / Month",
        "Caption Writing + Advanced Hashtag Strategy",
        "Content Planning & Monthly Content Calendar",
        "Post Publishing & Scheduling",
        "Profile Optimization & Highlights Management",
        "Competitor & Trend Research",
        "Monthly Analytics & Performance Report",
        "Creative Direction for Content",
        "Basic Lead Capture Setup (DM / inquiry flow)"
      ],
      goal: "Increase visibility and audience engagement",
      highlight: true,
      cta: "Get Started"
    },
    {
      id: "premium-growth",
      name: "Premium Growth",
      description: "Best for businesses focused on leads, customers, and brand growth.",
      price: "₹40,000–₹60,000",
      period: "/month",
      features: [
        "14–16 Social Media Posts / Month",
        "8–10 Instagram Reels / Month",
        "Advanced Content Strategy",
        "Full Content Calendar Planning",
        "High-quality Reel Editing",
        "Paid Ads Campaign Management (ad spend separate)",
        "Lead Generation Setup",
        "Landing Page or Funnel Guidance",
        "Monthly Growth Strategy Call",
        "Advanced Performance Report",
        "Competitor Growth Analysis"
      ],
      goal: "Generate leads and scale the business online",
      highlight: false,
      cta: "Get Started"
    }
  ],
  webDevelopment: [
    {
      id: "starter-website",
      name: "Starter Website",
      description: "Best for small businesses needing a professional online presence.",
      price: "From ₹12,000",
      period: "",
      features: [
        "3–4 Pages",
        "Mobile Responsive Design",
        "Contact Form / WhatsApp Integration",
        "Basic SEO Setup",
        "Google Maps Integration",
        "Clean Modern UI Design",
        "Fast Loading Optimization",
        "✔ 1st Year Free Maintenance",
        "✔ ₹3,000–₹5,000 Yearly Maintenance Charge"
      ],
      goal: "Establish a professional online presence",
      highlight: false,
      cta: "Get Started"
    },
    {
      id: "business-website",
      name: "Business Website",
      description: "Best for businesses that want a stronger online presence and lead generation.",
      price: "From ₹18,000",
      period: "",
      features: [
        "5–6 Pages",
        "Custom UI Design",
        "Lead Capture Forms",
        "SEO-Friendly Structure",
        "Speed Optimization",
        "Google Analytics Setup",
        "Social Media Integration",
        "Conversion-Focused Layout",
        "✔ 1st Year Free Maintenance",
        "✔ ₹3,000–₹5,000 Yearly Maintenance Charge"
      ],
      goal: "Increase visibility and audience engagement",
      highlight: true,
      cta: "Get Started"
    },
    {
      id: "premium-business-website",
      name: "Premium Business Website",
      description: "Best for businesses that want a premium brand presence.",
      price: "From ₹28,000",
      period: "",
      features: [
        "7–8 Pages",
        "Premium Custom Design",
        "Advanced Animations & Transitions",
        "Conversion-Focused Landing Sections",
        "Advanced SEO Setup",
        "Analytics & Tracking Setup",
        "Performance Optimization",
        "Content Structure Guidance",
        "✔ 1st Year Free Maintenance",
        "✔ ₹3,000–₹5,000 Yearly Maintenance Charge"
      ],
      goal: "Generate leads and scale the business online",
      highlight: false,
      cta: "Get Started"
    }
  ],
  oneTime: [
    {
      id: "starter-digital-launch",
      name: "Starter Digital Launch",
      description: "Best for businesses launching their online presence.",
      price: "₹18,000–₹25,000",
      period: "/one-time",
      features: [
        "Basic Business Website (3–4 pages)",
        "Mobile Responsive Design",
        "WhatsApp & Contact Form Integration",
        "Basic SEO Setup",
        "8–10 Social Media Posts",
        "3–4 Instagram Reels",
        "Caption Writing + Hashtag Strategy",
        "Social Media Profile Optimization",
        "Basic Content Planning",
        "✔ 1st Year Free Maintenance",
        "✔ ₹3,000–₹5,000 Yearly Maintenance Charge"
      ],
      goal: "Establish a professional online presence",
      highlight: false,
      cta: "Get Started"
    },
    {
      id: "growth-digital-launch",
      name: "Growth Digital Launch",
      description: "Best for businesses that want a strong start online.",
      price: "₹28,000–₹38,000",
      period: "/one-time",
      features: [
        "Business Website (5–6 pages)",
        "Lead Capture Forms",
        "SEO-Friendly Structure",
        "10–14 Social Media Posts",
        "4–6 Instagram Reels",
        "Caption Writing + Advanced Hashtag Strategy",
        "Content Planning & Post Ideas",
        "Reel Hook Suggestions",
        "Social Media Profile Optimization",
        "✔ 1st Year Free Maintenance",
        "✔ ₹3,000–₹5,000 Yearly Maintenance Charge"
      ],
      goal: "Launch brand presence and engagement",
      highlight: true,
      cta: "Get Started"
    },
    {
      id: "premium-digital-launch",
      name: "Premium Digital Launch",
      description: "Best for businesses that want a premium brand launch.",
      price: "₹42,000–₹55,000",
      period: "/one-time",
      features: [
        "Premium Website (6–8 pages)",
        "Advanced Animations & Transitions",
        "Conversion-Focused Landing Sections",
        "16–20 Social Media Posts",
        "6–8 Instagram Reels",
        "Advanced Content Strategy",
        "Competitor Content Review",
        "Brand Content Direction",
        "Growth Suggestions for Next Month",
        "✔ 1st Year Free Maintenance",
        "✔ ₹3,000–₹5,000 Yearly Maintenance Charge"
      ],
      goal: "Build a premium digital brand presence",
      highlight: false,
      cta: "Get Started"
    }
  ]
};

export function getPackageById(id: string) {
  const allPackages = [
    ...pricingData.socialMedia,
    ...pricingData.webDevelopment,
    ...pricingData.oneTime
  ];
  return allPackages.find(p => p.id === id);
}
