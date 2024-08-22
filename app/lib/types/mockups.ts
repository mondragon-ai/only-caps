export type MockupDocument = {
  id: string;
  domain: string;
  access_token: string;
  shop_name: string;
  design_url: string;
  base_sku: string;
  title: string;
  colors: string[];
  sizes: string[];
  blank_image: string;
  type: MockupTypes;
  cost: number;
  state: number;
  created_at: any;
  updated_at: any;
  mockup_urls: { url: string; alt: string }[];
  status: "ACTIVE" | "DEACTIVE";
  product_id: string;
  dimension: MockupDimensions;
  position: {
    top: number;
    left: number;
  };
  resized_design: string;
  original_file: File | null;
};

export type MockupDimensions = {
  original_width: number;
  original_height: number;
  resized_height: number;
  resized_width: number;
  blank_width: number;
  blank_height: number;
};

export type MockupPosition = {
  top: number;
  left: number;
};

export type MockupRequestBody = {
  design_url: string;
  base_sku: string;
  title: string;
  colors: string[];
  sizes: string[];
  type: MockupTypes;
  cost: number;
  dimension: {
    original_width: number;
    original_height: number;
    resized_height: number;
    resized_width: number;
    blank_width: number;
    blank_height: number;
  };
  position: {
    top: number;
    left: number;
  };
};

export type GeneratorStateProps = MockupDocument & {
  original_file: null | File;
  resized_design: string;
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
  cost: number;
  quarter_turns: {
    [key: string]: string;
  };
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

export type MockupResponseType = {
  error: boolean;
  mockups: {
    design_id: string;
    urls: {
      url: string;
      alt: string;
    }[];
  };
  text: string;
};
