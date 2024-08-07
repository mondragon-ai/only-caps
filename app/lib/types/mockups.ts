export type MockupProps = {
  id: string;
  domain: string;
  access_token: string;
  shop_name: string;
  status: "ACTIVE" | "DEACTIVE";
  is_shirt: boolean;
  base_sku: string;
  title: string;
  mockup_urls: { url: string; alt: string }[];
  has_inverted: boolean;
  design_urls: "";
  sizes?: (
    | "Small"
    | "Medium"
    | "Large"
    | "XL"
    | "2XL"
    | "3XL"
    | "4XL"
    | "5XL"
  )[];
  image: string;
  type: MockupTypes;
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

export type GeneratorStateProps = MockupProps & {
  original_file: null | File;
  progress: number;
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
  mockup_urls: { url: string; alt: string }[];
  has_inverted: boolean;
  design_urls: "";
  sizes?: (
    | "Small"
    | "Medium"
    | "Large"
    | "XL"
    | "2XL"
    | "3XL"
    | "4XL"
    | "5XL"
  )[];
  url?: string;
  updated_at: any;
  created_at: any;
};
