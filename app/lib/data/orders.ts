import { OrderDocument } from "../types/orders";

export const line_items = [
  {
    id: "100",
    url: "#",
    title: "Hawk Tuah",
    sku: "POD-IUHE-BLK-BLK",
    variants: ["Black", "Black"],
    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 60,
    cost: 30.5,
    quantity: 1,
  },
  {
    id: "102",
    url: "#",
    title: "Falcon Wing",
    sku: "POD-FW-RED-BLK",
    variants: ["Red", "Black"],
    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 70,
    cost: 35.0,
    quantity: 2,
  },
  {
    id: "103",
    url: "#",
    title: "Raven Shadow",
    sku: "POD-RS-BLK-GRY",
    variants: ["Black", "Gray"],

    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 75,
    cost: 37.5,
    quantity: 3,
  },
  {
    id: "104",
    url: "#",
    title: "Owl Night",
    sku: "POD-ON-NVY-BLK",
    variants: ["Navy", "Black"],

    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 80,
    cost: 40.0,
    quantity: 1,
  },
  {
    id: "105",
    url: "#",
    title: "Phoenix Flame",
    sku: "POD-PF-ORG-YLW",
    variants: ["Orange", "Yellow"],

    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 85,
    cost: 42.5,
    quantity: 2,
  },
];

export const mock_order = {
  id: "1005",
  order_name: 1005,
  name: "Bob Brown",
  status: "completed",
  total: 45,
  delivery: "2024-07-31",
  date: new Date().toLocaleDateString(),
  line_items: line_items,
  shipping: 5.99,
  customer: {
    id: 0,
    name: "Collin Sander",
    first_name: "Collin",
    last_name: "Sander",
    address: {
      line1: "420 Bigly",
      city: "Fay",
      state: "AR",
      country: "USA",
      zip: "72704",
    },
    email: "Colling@gobigly.com",
  },
};

export const order_list: any[] = [
  {
    id: "1001",
    order_name: 1001,
    name: "Collin Sander",
    status: "failed",
    total: 50,
    delivery: "",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1002",
    order_name: 1002,
    name: "Jane Doe",
    status: "completed",
    total: 75,
    delivery: "2024-07-30",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1003",
    order_name: 1003,
    name: "John Smith",
    status: "pending",
    total: 120,
    delivery: "",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1004",
    order_name: 1004,
    name: "Alice Johnson",
    status: "processing",
    total: 85,
    delivery: "",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1005",
    order_name: 1005,
    name: "Bob Brown",
    status: "completed",
    total: 45,
    delivery: "2024-07-31",
    date: new Date().toLocaleDateString(),
  },
];

export const mockAddress = {
  id: 0,
  customer_id: 0,
  first_name: "Collin",
  last_name: "Sander",
  company: "",
  address1: "420 Bigly",
  address2: "",
  city: "Faye",
  province: "AR",
  country: "US",
  zip: "41069",
  phone: "",
  province_code: "AR",
  country_code: "US",
  country_name: "",
  default: true,
};

export const mockLineItem = {
  id: 0,
  variant_id: 0,
  title: "",
  quantity: 0,
  price: "",
  total_discount: "",
};

export const mockOrders: OrderDocument[] = [];
// export const mockOrders: OrderDocument[] = [
//   {
//     id: "order1",
//     pod_created: true,
//     shipping_rate: 5.99,
//     domain: "example.com",
//     myshopify_domain: "example.myshopify.com",
//     timezone: "America/Chicago",
//     access_token: "abc123",
//     location_id: "loc1",
//     fulfillment_status: "ACTIVE",
//     tracking_number: "track123",
//     pod_line_items: [
//       {
//         variant_id: "variant123",
//         quantity: 2,
//         weight: 1.0,
//         cost: 10.0,
//       },
//       {
//         variant_id: "variant456",
//         quantity: 1,
//         weight: 0.5,
//         cost: 15.0,
//       },
//     ],
//     customer: {
//       id: 1,
//       email: "john.doe@example.com",
//       shipping_address: mockAddress,
//     },
//     merchant_order: {
//       order_id: "order1",
//       line_items: [mockLineItem],
//       order_number: "1001",
//     },
//     shopify_order_payload: {
//       line_items: [
//         {
//           variant_id: "variant123",
//           quantity: "2",
//         },
//       ],
//       currency: "USD",
//       financial_status: "paid",
//       customer: {
//         id: 1,
//       },
//       tags: "tag1, tag2",
//       shipping_lines: [
//         {
//           custom: true,
//           price: "5.99",
//           title: "Standard Shipping",
//         },
//       ],
//       shipping_address: mockAddress,
//     },
//     fulfillment_id: "fulfillment1",
//     created_at: 1717545600,
//     updated_at: 1717545600,
//   },
//   {
//     id: "order2",
//     pod_created: false,
//     shipping_rate: 7.99,
//     domain: "example2.com",
//     myshopify_domain: "example2.myshopify.com",
//     timezone: "America/Los_Angeles",
//     access_token: "def456",
//     location_id: "loc2",
//     fulfillment_status: "DEACTIVE",
//     tracking_number: "",
//     pod_line_items: [
//       {
//         variant_id: "variant789",
//         quantity: 3,
//         weight: 2.0,
//         cost: 20.0,
//       },
//     ],
//     customer: {
//       id: 2,
//       email: "jane.doe@example.com",
//       shipping_address: mockAddress,
//     },
//     merchant_order: {
//       order_id: "order2",
//       line_items: [
//         {
//           id: 2,
//           variant_id: 1234,
//           title: "Another Product",
//           quantity: 3,
//           price: "30.00",
//           total_discount: "5.00",
//         },
//       ],
//       order_number: "1002",
//     },
//     shopify_order_payload: {
//       line_items: [
//         {
//           variant_id: "variant789",
//           quantity: "3",
//         },
//       ],
//       currency: "USD",
//       financial_status: "paid",
//       customer: {
//         id: 2,
//       },
//       tags: "tag3, tag4",
//       shipping_lines: [
//         {
//           custom: true,
//           price: "7.99",
//           title: "Standard Shipping",
//         },
//       ],
//       shipping_address: mockAddress,
//     },
//     fulfillment_id: "fulfillment2",
//     created_at: 1722816000,
//     updated_at: 1722816000,
//   },
// ];
