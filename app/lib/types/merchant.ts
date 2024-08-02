export type ShopifyMerchant = {
  analytics: {
    orders_summary: {
      awaiting: number;
      fulfilled: number;
      failed: number;
    };
    recent_orders: [];
    highlight_stats: {
      revenue: number;
      sold: number;
    };
    current_month: number;
  };
  capped_usage: number;
  state: string;
  created_at?: any;
  updated_at?: any;
  owner: {
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
  address: {
    address1: string;
    city: string;
    province: string;
    zip: string;
    country: string;
  };
  fulfillment: {
    id: number;
    location_id: number;
  };
  installed: boolean;
  status: "DECLINED" | "ACTIVE" | "EXPIRED";
  subscription_id: string;
  usage: number;
  webhook_id: number;
  id: string;
  timezone: string;
  access_token: string;
  shop_name: string;
  shop_domain: string;
  myshopify_domain: string;
};
