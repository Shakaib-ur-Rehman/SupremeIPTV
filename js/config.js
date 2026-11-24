// ===== Edit this file to customise the site =====
window.CONFIG = {
  brand: "Supreme IPTV",
  whatsapp: "447884911814",         // international format, digits only (no + or spaces)
  whatsappDisplay: "+44 7884 911814", // how the number is shown in the top bar
  email: "supremeiptv954@gmail.com",
  telegram: "https://t.me/yourchannel",

  currency: "£",

  // Reseller packages (GBP)
  reseller: {
    // credits: panel credits included in the top-up. perks: extras shown for that package only.
    tiers: [
      { name: "Basic",    price: 200,  credits: 30,  perks: ["Instant activation"] },
      { name: "Gold",     price: 300,  credits: 70,  perks: ["Instant activation"], popular: true },
      { name: "Platinum", price: 500,  credits: 180, perks: ["Instant activation"] },
      { name: "Diamond",  price: 1000, credits: 650, perks: ["Free branded app with your logo"] }
    ],
    // "What you get": included in every reseller package
    features: [
      "Reseller portal with account-management tools",
      "Create & manage customer accounts",
      "Generate trials or subscriptions",
      "Instant setup & support",
      "No technical skills needed"
    ]
  },
  superReseller: {
    price: 1500,
    period: "month",
    features: [
      "3 sub-reseller accounts",
      "Free branded app with your logo",
      "Free DNS with your own name",
      "24/7 direct WhatsApp support",
      "No panel fee or hidden charges"
    ]
  },

  // Included in every plan
  features: [
    "20,000+ live channels",
    "100,000+ movies & series",
    "Up to 4K UHD quality",
    "Anti-freeze servers",
    "EPG TV guide",
    "24/7 WhatsApp support"
  ],

  // prices: total price in GBP for 1, 2 and 3 devices.
  // The 2- and 3-device add-on cost is worked out automatically (price minus the 1-device price).
  // months: used for the per-month figure (null = lifetime).
  plans: [
    { id: "1m",  name: "1 Month",   months: 1,    prices: [9.99,   14.99,  19.99] },
    { id: "3m",  name: "3 Months",  months: 3,    prices: [24.99,  37.99,  49.99] },
    { id: "6m",  name: "6 Months",  months: 6,    prices: [39.99,  59.99,  79.99],  badge: "Most popular", featured: true },
    { id: "12m", name: "12 Months", months: 12,   prices: [49.99,  74.99,  99.99],  badge: "Best value" },
    { id: "24m", name: "24 Months", months: 24,   prices: [84.99,  120.99, 154.99], badge: "Biggest saving" },
    { id: "life", name: "Lifetime", months: null, prices: [149.99, 249.99, 349.99], badge: "Pay once" }
  ]
};
