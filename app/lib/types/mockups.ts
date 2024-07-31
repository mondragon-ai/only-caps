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
};

export type HatDataType = {
  [key in MockupTypes]: HatDetail;
};
