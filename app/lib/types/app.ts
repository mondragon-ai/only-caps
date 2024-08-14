type AppSubscription = {
  admin_graphql_api_id: string;
  name: string;
  status: "ACTIVE" | "CANCELLED" | "PENDING" | "SUSPENDED"; // Assuming possible statuses
  admin_graphql_api_shop_id: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  currency: string;
  capped_amount: string; // Keeping this as a string to match the structure provided
};

type SubscriptionObject = {
  app_subscription: AppSubscription;
};
