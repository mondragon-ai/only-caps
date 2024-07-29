import { useNavigate } from "@remix-run/react";
import {
  Badge,
  Card,
  IndexTable,
  Text,
  useBreakpoints,
  useIndexResourceState,
} from "@shopify/polaris";
import { DeleteIcon, ShippingLabelIcon } from "@shopify/polaris-icons";
import { formatToMoney } from "~/lib/formatters/numbers";

type OrderProps = {
  orders: {
    id: string;
    order_name: number;
    name: string;
    status: string;
    total: number;
    delivery: string;
    date: string;
  }[];
};
export const OrderList = ({ orders }: OrderProps) => {
  const navigate = useNavigate(); // Initialize navigate
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    ({ id, order_name, date, name, total, status, delivery }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        onClick={() => navigate(`/app/order/${id}`)}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            #{order_name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {status == "failed" ? (
            <Badge tone="success" progress={"complete"}>
              Complete
            </Badge>
          ) : (
            <Badge tone="magic" progress={"partiallyComplete"}>
              Processing
            </Badge>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {`$${formatToMoney(Number(total))}`}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {delivery !== "" ? (
            <Badge tone="success" progress={"complete"}>
              Delivered
            </Badge>
          ) : (
            <Badge tone="critical" progress={"incomplete"}>
              No Tracking
            </Badge>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {date}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const bulkActions = [
    {
      destructive: false,
      icon: ShippingLabelIcon,
      content: "Request Fulfillment",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: "Delete orders",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  return (
    <Card padding={"0"}>
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Order" },
          { title: "Customer" },
          { title: "Status" },
          { title: "Total", alignment: "end" },
          { title: "Fulfillment status" },
          { title: "Date" },
        ]}
        bulkActions={bulkActions}
        // promotedBulkActions={promotedBulkActions}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
