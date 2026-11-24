// ===== Edit this file to customise the site =====
window.CONFIG = {
  brand: "Supreme IPTV",
  whatsapp: "447884911814",         // international format, digits only (no + or spaces)
  email: "support@example.com",
  telegram: "https://t.me/yourchannel",

  // Prices per currency. "months" is used to compute the per-month price (null = lifetime).
  plans: [
    {
      id: "starter", name: "Starter", term: "3 Months", months: 3, screens: 2,
      price: { GBP: 19.99, USD: 24.99, EUR: 22.99 },
      features: ["All live channels", "Movies & series library", "HD / FHD quality", "EPG TV guide"],
      excluded: ["4K streams", "Anti-freeze servers", "Catch-up TV"]
    },
    {
      id: "premium", name: "Premium", term: "6 Months", months: 6, screens: 3, badge: "Most popular", featured: true,
      price: { GBP: 29.99, USD: 37.99, EUR: 34.99 },
      features: ["All live channels", "Movies & series library", "4K UHD streams", "Anti-freeze servers", "24/7 WhatsApp support"],
      excluded: ["Catch-up TV"]
    },
    {
      id: "pro", name: "Pro", term: "12 Months", months: 12, screens: 4, badge: "Best value",
      price: { GBP: 45, USD: 56, EUR: 52 },
      features: ["Everything in Premium", "PPV events included", "7-day catch-up TV", "VIP priority support"],
      excluded: []
    },
    {
      id: "lifetime", name: "Ultimate", term: "Lifetime", months: null, screens: 5, badge: "One-time payment",
      price: { GBP: 350, USD: 440, EUR: 410 },
      features: ["Everything in Pro", "Pay once, no renewals", "All future upgrades", "5 screens at once"],
      excluded: []
    }
  ]
};
