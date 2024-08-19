export type ResponseProp = {
  shop: string;
  result: any;
  error: null | string;
  status: number;
  type: string;
};

export type ErrorStateProps = {
  title: string;
  message: string;
  type: "critical" | "warning";
} | null;
