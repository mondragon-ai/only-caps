export type MockupProps = {
  id: string;
  image: string;
  type: MockupTypes;
  status: string;
  cost: number;
  created: string;
  name: string;
  colors: string[];
  design: string | undefined;
  location: {
    top: number;
    left: number;
  };
  size: {
    width: number;
    height: number;
  };
  SKU: string;
  product_id: string;
  mockups: string[];
  design_dimensions: {
    height: number;
    width: number;
  };
  resized_design: string;
  resized_dimensions: {
    height: number;
    width: number;
  };
};

export type MockupTypes =
  | "dad"
  | "trucker"
  | "retro_trucker"
  | "snapback"
  | "mid_profile"
  | "high_profile"
  | "low_profile"
  | "foam_trucker"
  | "flat_bill"
  | "structured"
  | "relaxed";

export type HatDetail = {
  name: string;
  type: MockupTypes;
  colors: string[];
  details: string[];
  features: string;
  material: string;
  image: string;
  sample: string;
  delivery: string;
  price: string;
  title: string;
};

export type HatDataType = {
  [key in MockupTypes]: HatDetail;
};

export type DesignDocument = {
  id: string;
  domain: string;
  access_token: string;
  merchant_uuid: string;
  status: "ACTIVE" | "DEACTIVE";
  is_shirt: boolean;
  base_sku: string;
  title: string;
  product_id: string | number;
  front_mockup_urls: { url: string; alt: string }[];
  back_mockup_urls: { url: string; alt: string }[];
  size: "small" | "medium" | "large" | "whole";
  design_position: "left" | "right" | "center";
  has_inverted: boolean;
  design_urls: {
    front: string;
    front_large: string;
    back: string;
    back_large: string;
    sleeve: string;
    front_dark: string;
    front_large_dark: string;
    back_dark: string;
    back_large_dark: string;
    sleeve_dark: string;
  };
  sizes: (
    | "Small"
    | "Medium"
    | "Large"
    | "XL"
    | "2XL"
    | "3XL"
    | "4XL"
    | "5XL"
  )[];
  sides: ("FRONT" | "BACK")[];
  sleeve_side: "left" | "right";
  colors: ("WHITE" | "BLACK" | "GREEN" | "BLUE" | "GRAY")[];
  external?: "SHOPIFY" | null;
  front_is_main: boolean;
  url?: string;
  updated_at: any;
  created_at: any;
};
