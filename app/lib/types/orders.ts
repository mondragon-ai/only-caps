import { ShopifyLineItemProps } from "./shopify";

export type LineItemProps = {
  id: string;
  url: string;
  title: string;
  sku: string;
  variants: string[];
  img: string;
  price: number;
  cost: number;
  quantity: number;
};

export type CustomerProps = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  email: string;
};

export type OrderProps = {
  id: string;
  order_name: number;
  name: string;
  status: string;
  total: number;
  delivery: string;
  date: string;
  line_items: LineItemProps[];
  shipping: number;
  customer: CustomerProps;
};

export type OrderDocument = {
  id: string;
  pod_created: boolean;
  shipping_rate: number;
  domain: string;
  myshopify_domain: string;
  timezone: string;
  access_token: string;
  location_id: number | string;
  fulfillment_status: "ACTIVE" | "DEACTIVE";
  tracking_number: string;
  pod_line_items: {
    variant_id: string;
    quantity: number;
    weight: number;
    cost: number;
  }[];
  customer: {
    id: number;
    email: string;
    shipping_address: Address;
  };
  merchant_order: {
    order_id: string | number;
    line_items: ShopifyLineItemProps[];
    order_number: string;
  };
  shopify_order_payload: {
    line_items: {
      variant_id: string;
      quantity: string;
    }[];
    currency: "USD" | string;
    financial_status: "paid" | string;
    customer: {
      id: number;
    };
    tags: string;
    shipping_lines: {
      custom: boolean;
      price: string;
      title: "Standard Shipping";
    }[];
    shipping_address: Address;
  };
  fulfillment_id: string;
  created_at?: any;
  updated_at?: any;
};

export type Address = {
  id: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  company: string | null;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  province_code: string;
  country_code: string;
  country_name: string;
  default: boolean;
};

export const OrderSummaryProps = {};
