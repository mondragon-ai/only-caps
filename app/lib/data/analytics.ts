export const revenue = [
  { date: "2024-07-01", value: 4500 },
  { date: "2024-07-02", value: 3200 },
  { date: "2024-07-03", value: 2800 },
  { date: "2024-07-04", value: 3100 },
  { date: "2024-07-05", value: 2000 },
  { date: "2024-07-06", value: 2600 },
  { date: "2024-07-07", value: 3700 },
];

export const sold = [
  { date: "2024-07-01", value: 200 },
  { date: "2024-07-02", value: 500 },
  { date: "2024-07-03", value: 1050 },
  { date: "2024-07-04", value: 500 },
  { date: "2024-07-05", value: 900 },
  { date: "2024-07-06", value: 300 },
  { date: "2024-07-07", value: 1400 },
];
export const top_sellers = [
  { name: "Hawk Tuah", value: 2400 },
  { name: "The Don", value: 1898 },
  { name: "Mercaaa Fuck Yea", value: 1800 },
  { name: "Sandy Hook", value: 608 },
  { name: "Go Team", value: 300 },
];

export const fulfillment_data = [
  { date: "2024-07-01", value: 11 },
  { date: "2024-07-02", value: 2 },
  { date: "2024-07-03", value: 5 },
  { date: "2024-07-04", value: 3 },
  { date: "2024-07-05", value: 9 },
  { date: "2024-07-06", value: 3 },
  { date: "2024-07-07", value: 7 },
  { date: "2024-07-08", value: 12 },
  { date: "2024-07-09", value: 3 },
  { date: "2024-07-10", value: 10 },
];

export const type_data = [
  { name: "Trucker", value: 400 },
  { name: "Flat", value: 350 },
  { name: "Snapback", value: 340 },
  { name: "Foam", value: 200 },
  { name: "Low", value: 500 },
  { name: "Mid", value: 100 },
  { name: "High", value: 100 },
  { name: "Retro", value: 900 },
  { name: "Struct", value: 300 },
];

export const shipping = [
  { date: "2024-07-01", value: 15 },
  { date: "2024-07-02", value: 14 },
  { date: "2024-07-03", value: 9 },
  { date: "2024-07-04", value: 10 },
  { date: "2024-07-05", value: 9 },
  { date: "2024-07-06", value: 19 },
  { date: "2024-07-07", value: 4.99 },
];

export const COLORS = [
  "#03045E",
  "#023E8A",
  "#0077B6",
  "#0096C7",
  "#00B4D8",
  "#48CAE4",
  "#90E0EF",
  "#ADE8F4",
  "#CAF0F8",
];

export const AnalyticsInit = [
  {
    id: 1717545600,
    total_orders: 2,
    total_items: 110,
    total_revenue: 13400,
    timezone: "chicago/america",
    created_at: 1717545600,
    updated_at: 1717545600,
    orders: [
      {
        id: "order1",
        created_at: 1717545600,
        total_items: 55,
        total_price: 6700,
        fulfilled_date: 1722816000,
        fulfilled_time: 0,
        shipping_cost: 5.09,
      },
      {
        id: "order2",
        created_at: 1717545600,
        total_items: 55,
        total_price: 6700,
        fulfilled_date: 1722816000,
        fulfilled_time: 0,
        shipping_cost: 4.99,
      },
    ],
    top_sellers: {
      "hawk tuah": 65,
      don: 28,
      mercaa: 11,
    },
    top_types: {
      retro_trucker: 3,
      mid_profile: 3,
      high_profile: 14,
      structured: 5,
      snapback: 10,
    },
  },
  {
    id: 1722816000,
    total_orders: 2,
    total_items: 84,
    total_revenue: 10300,
    timezone: "chicago/america",
    created_at: 1717545600,
    updated_at: 1717545600,
    orders: [
      {
        id: "order3",
        created_at: 1717545600,
        total_items: 42,
        total_price: 5150,
        fulfilled_date: 1722816000,
        fulfilled_time: 0,
        shipping_cost: 3.99,
      },
      {
        id: "order4",
        created_at: 1717545600,
        total_items: 42,
        total_price: 5150,
        fulfilled_date: 1722816000,
        fulfilled_time: 0,
        shipping_cost: 7.01,
      },
    ],
    top_sellers: {
      "hawk tuah": 43,
      don: 30,
      mercaa: 14,
    },
    top_types: {
      retro_trucker: 8,
      mid_profile: 32,
      high_profile: 20,
      structured: 15,
      snapback: 19,
    },
  },
];

// export const AnalyticsInit = [];
