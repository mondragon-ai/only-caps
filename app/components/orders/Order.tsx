import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  InlineStack,
  Link,
  ResourceItem,
  ResourceList,
  ResourceListProps,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import styles from "./Orders.module.css";
import { formatToMoney } from "~/lib/formatters/numbers";
import { LineItem, OrderDocument, PODLineItemsProps } from "~/lib/types/orders";
import { PRODUCT_PLACEHODLER } from "~/lib/contants";
import { useState } from "react";
import { ResourceListSelectedItems } from "@shopify/polaris/build/ts/src/utilities/resource-list";

const renderBadge = (status: string, delivery: string) => {
  const statusBadge =
    status === "ACTIVE" ? (
      <Badge tone="success" progress="complete">
        Complete
      </Badge>
    ) : status === "CANCELLED" ? (
      <Badge tone="critical" progress="incomplete">
        Cancelled
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

export const Order = ({
  order,
  action,
  handleOrderRefund,
  handleRequestExchange,
}: {
  order: OrderDocument;
  action?: "refund" | "exchange" | null;
  handleOrderRefund: (list: string[] | undefined) => void;
  handleRequestExchange: (list: string[] | undefined) => void;
}) => {
  const [selectedItems, setSelectedItems] = useState<string[] | undefined>([]);

  const { statusBadge, deliveryBadge } = renderBadge(
    order.fulfillment_status,
    order.tracking_number,
  );
  return (
    <Card padding="400">
      <BlockStack gap="300">
        <div className={styles.orderBadges}>
          <div style={{ marginRight: "0.5rem" }}>{statusBadge}</div>
          {deliveryBadge}
        </div>
        <Text as="h4" variant="headingMd">
          Order
        </Text>
        <Text as="p" variant="bodyMd">
          Shipping Profile
          <Text as="p" variant="bodyMd" tone="disabled">
            {order.tracking_number ? (
              <Link url={order.tracking_number} target="_blank">
                {order.tracking_number}{" "}
              </Link>
            ) : (
              <Text as="p" variant="bodyMd" tone="disabled">
                No Tracking
              </Text>
            )}
          </Text>
        </Text>

        {action ? (
          <Box borderColor="border" borderWidth="025" borderRadius="100">
            <RenderLineItemSelect
              pod_li={order.pod_line_items}
              item={order.merchant_order.line_items}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              action={action}
            />
          </Box>
        ) : (
          <Box borderColor="border" borderWidth="025" borderRadius="100">
            <ResourceList
              resourceName={{ singular: "Line Item", plural: "Line Items" }}
              items={order.pod_line_items}
              renderItem={(items, id, i) =>
                renderLineItem(items, order.merchant_order.line_items, i)
              }
            />
          </Box>
        )}

        {action && action == "refund" ? (
          <InlineStack align="end">
            <ButtonGroup>
              <Button
                variant="primary"
                onClick={() => handleOrderRefund(selectedItems)}
                accessibilityLabel="Request Refund"
              >
                Confirm Refund
              </Button>
            </ButtonGroup>
          </InlineStack>
        ) : action && action == "exchange" ? (
          <InlineStack align="end">
            <ButtonGroup>
              <Button
                variant="primary"
                onClick={() => handleRequestExchange(selectedItems)}
                accessibilityLabel="Request Exchange"
              >
                Confirm Exchange
              </Button>
            </ButtonGroup>
          </InlineStack>
        ) : null}
      </BlockStack>
    </Card>
  );
};

const renderLineItem = (
  pod_li: PODLineItemsProps,
  item: LineItem[],
  i: number,
) => {
  const line_item =
    item.filter((li) => {
      return li.variant_id === pod_li.merchant_variants_id;
    })[0] || item[0];
  const { sku, title, variant_title, quantity, price } = line_item;
  const { variant_id, image, cost } = pod_li;

  const media = (
    <Thumbnail source={image || PRODUCT_PLACEHODLER} alt={`${sku}`} />
  );

  return (
    <ResourceItem
      id={String(variant_id)}
      url={"#"}
      media={media}
      accessibilityLabel={`View details for ${title}`}
    >
      <InlineGrid columns={["twoThirds", "oneThird", "oneThird", "oneThird"]}>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
          <Text variant="bodySm" as="h4" tone="subdued">
            {variant_title}
          </Text>
          <Text variant="bodySm" as="h4" tone="subdued">
            {sku}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`$${formatToMoney(Number(cost))}`}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`x ${quantity}`}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`$${formatToMoney(Number(price))}`}
          </Text>
        </div>
      </InlineGrid>
    </ResourceItem>
  );
};

const RenderLineItemSelect = ({
  pod_li,
  item,
  selectedItems,
  setSelectedItems,
  action,
}: {
  pod_li: PODLineItemsProps[];
  item: LineItem[];
  selectedItems: string[] | undefined;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  action: "exchange" | "refund";
}) => {
  const [option, setOption] = useState("");

  return (
    <ResourceList
      items={pod_li}
      selectedItems={selectedItems as any}
      onSelectionChange={setSelectedItems as any}
      selectable
      renderItem={(l) => {
        const line_item =
          item.filter((li) => {
            return li.variant_id === l.merchant_variants_id;
          })[0] || item[0];

        const { sku, title, variant_title, quantity, price } = line_item;
        const { variant_id, image, cost } = l;

        const media = (
          <Thumbnail source={image || PRODUCT_PLACEHODLER} alt={`${sku}`} />
        );

        const handleOptionChange = (v: string) => {
          setOption(v);
          if (selectedItems) {
            const item = selectedItems?.filter((i) => i != String(variant_id));
            if (item) {
            }
          }
        };

        return (
          <ResourceItem
            id={String(variant_id)}
            onClick={() => {}}
            name={title}
            media={media}
            accessibilityLabel={`View details for ${title}`}
          >
            <InlineGrid columns={["oneThird", "twoThirds"]}>
              <div>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
                <Text variant="bodySm" as="h4" tone="subdued">
                  {variant_title}
                </Text>
                {action !== "exchange" && (
                  <Text variant="bodySm" as="h4" tone="subdued">
                    {sku}
                  </Text>
                )}
              </div>
              {action == "exchange" && (
                <div>
                  <TextField
                    value={option}
                    onChange={handleOptionChange}
                    label="Options"
                    name="address1"
                    type="text"
                    autoComplete="off"
                    placeholder="red/small, blue/xl"
                  />
                </div>
              )}
            </InlineGrid>
          </ResourceItem>
        );
      }}
    />
  );
};
