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
import { formatDateLong, formatToMoney } from "~/lib/formatters/numbers";
import { OrderDocument, OrderProps } from "~/lib/types/orders";

type OrderListProps = {
  orders: OrderDocument[];
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
      status === "ACTIVE" ? (
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
    (
      {
        id,
        merchant_order,
        created_at,
        shopify_order_payload,
        tracking_number,
        fulfillment_status,
      },
      index,
    ) => {
      const { statusBadge, deliveryBadge } = renderBadge(
        fulfillment_status,
        tracking_number,
      );
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
              #{merchant_order.order_number}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" as="span">
              {shopify_order_payload.shipping_address.first_name}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{statusBadge}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" alignment="end" numeric>
              {`$${formatToMoney(merchant_order.line_items.reduce((prev, curr) => prev + Number(curr.price), 0))}`}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{deliveryBadge}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" as="span">
              {formatDateLong(created_at)}
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
