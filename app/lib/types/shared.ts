export type ResponseProp = {
  shop: string | null;
  result: any | null;
  error: null | string;
  status: number;
  type: string;
};

export type ErrorStateProps = {
  title: string;
  message: string;
  type: "critical" | "warning";
} | null;
