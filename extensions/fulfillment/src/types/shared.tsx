export type OrderResponseType = {
  data: {
    order: {
      id: string;
      name: string;
      fulfillmentOrders: {
        nodes: Array<{
          id: string;
          status:
            | "IN_PROGRESS"
            | "UNSUBMITTED"
            | "SUBMITTED"
            | "CANCELLED"
            | "OPEN";
          requestStatus:
            | "ACCEPTED"
            | "CLOSED"
            | "SUBMITTED"
            | "CANCELLATION_REQUESTED"
            | "REJECTED";
          assignedLocation: {
            name: string;
            location: {
              id: string;
            };
          };
        }>;
      };
    };
  };
  extensions: {
    cost: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
};
