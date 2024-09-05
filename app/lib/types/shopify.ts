export interface ShopifyLineItemProps {
  discount_allocations: any[];
  discounts: any[];
  final_line_price: string;
  final_price: string;
  fulfillment: Record<string, unknown>;
  fulfillment_service: string;
  gift_card: boolean;
  grams: number;
  id: number;
  image: Record<string, unknown>;
  key: number;
  line_level_discount_allocations: any[];
  line_level_total_discount: string;
  line_price: string;
  message: string;
  options_with_values: any[];
  original_line_price: string;
  original_price: string;
  price: string;
  product: Record<string, unknown>;
  product_id: number;
  properties: Record<string, unknown>;
  quantity: number;
  requires_shipping: boolean;
  selling_plan_allocation: null;
  sku: string;
  successfully_fulfilled_quantity: number;
  tax_lines: any[];
  taxable: boolean;
  title: string;
  total_discount: string;
  unit_price: string;
  unit_price_measurement: any;
  url: Record<string, unknown>;
  url_to_remove: null;
  variant_title: string;
  variant: {
    option1: string;
    option2: string;
    option3: string;
  };
  variant_id: number;
  vendor: string;
}

interface FulfillmentOrder {
  id: string;
  status:
    | "in_progress"
    | "unsubmitted"
    | "submitted"
    | "cancelled"
    | "closed"
    | "open";
  request_status:
    | "submitted"
    | "unsubmitted"
    | "cancellation_requested"
    | "cancellation_accepted"
    | "rejected";
}

interface FulfillmentOrderMerchantRequest {
  id: string;
  message: string;
}

export interface FulfillmentOrderDataProps {
  original_fulfillment_order: FulfillmentOrder;
  submitted_fulfillment_order: FulfillmentOrder;
  unsubmitted_fulfillment_order: FulfillmentOrder;
  fulfillment_order_merchant_request: FulfillmentOrderMerchantRequest;
}
