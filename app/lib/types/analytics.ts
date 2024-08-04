import { MockupTypes } from "./mockups";

// Data fethced
export type AnalyticsProps = {
  id: string | number;
  total_orders: number;
  total_items: number;
  total_revenue: number;
  timezone: string;
  created_at: any;
  updated_at: any;
  orders: OrderAnalyticsProps[];
  top_sellers: TopSellersProps;
  top_types: Record<MockupTypes, string>;
};

export type OrderAnalyticsProps = {
  id: string | number;
  time: number;
  total_items: number;
  total_price: number;
  fulilled_date: number;
  fulilled_time: number;
  shipping_cost: number;
};

export type TopSellersProps = {
  [key: string]: number;
};

// FOMRATTED DATE
export type TopSellerProps = { name: string; value: number };
export type DataProps = { date: string; value: number };
