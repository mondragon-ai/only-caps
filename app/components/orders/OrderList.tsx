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
import { OrderProps } from "~/lib/types/orders";

type OrderListProps = {
  orders: OrderProps[];
};
export const OrderList = ({ orders }: OrderListProps) => {
  const navigate = useNavigate();
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const renderBadge = (status: string, delivery: string) => {
    const statusBadge =
      status === "failed" ? (
        <Badge tone="success" progress="complete">
          Complete
        </Badge>
      ) : (
        <Badge tone="magic" progress="partiallyComplete">
          Processing
        </Badge>
      );

    const deliveryBadge =
      delivery !== "" ? (
        <Badge tone="success" progress="complete">
          Delivered
        </Badge>
      ) : (
        <Badge tone="critical" progress="incomplete">
          No Tracking
        </Badge>
      );

    return { statusBadge, deliveryBadge };
  };

  const rowMarkup = orders.map(
    ({ id, order_name, date, name, total, status, delivery }, index) => {
      const { statusBadge, deliveryBadge } = renderBadge(status, delivery);
      return (
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
          <IndexTable.Cell>{statusBadge}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" alignment="end" numeric>
              {`$${formatToMoney(Number(total))}`}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{deliveryBadge}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" as="span">
              {date}
            </Text>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    },
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
