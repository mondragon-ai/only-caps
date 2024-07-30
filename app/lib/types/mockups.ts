export type MockupProps = {
  id: string;
  image: string;
  type: MockupTypes;
  status: string;
  cost: number;
  created: string;
  name: string;
  colors: ("red" | "green" | "black")[];
  design: string;
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
};

export type MockupTypes = "dad" | "trucker" | "5panel" | "snapback";
