import {
  BlockStack,
  Button,
  Card,
  InlineGrid,
  Text,
  TextField,
} from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback, useState } from "react";
import { formatToMoney } from "~/lib/formatters/numbers";

export const WholeSale = ({ mockup }: { mockup: MockupProps }) => {
  const [quantity, setQuantity] = useState(0);

  const percentage =
    quantity < 25
      ? 0
      : quantity >= 25 && quantity < 50
        ? 5
        : quantity >= 50 && quantity < 100
          ? 12
          : quantity >= 100 && quantity < 150
            ? 25
            : 55;
  return (
    <Card>
      <BlockStack gap={"400"}>
        <Text as={"h4"} variant="headingMd">
          Wholesale Options
        </Text>
        <Text as={"p"} variant="bodyMd" tone="subdued">
          Calculate wholesale price options for bulk orders and receive a
          discount. This option is perfect for big events or those wanting to
          receive a special deal
        </Text>
        <InlineGrid
          columns={["twoThirds", "oneThird", "oneThird"]}
          alignItems="center"
          gap={"200"}
        >
          <WholeSaleForm quantity={quantity} setQuantity={setQuantity} />
          <Text as="p" variant="bodyXs" tone="disabled">
            {`${percentage}% off`}
          </Text>
          <Button tone="success" onClick={() => console.log("OPEN MODULE")}>
            ORDER NOW
          </Button>
        </InlineGrid>
      </BlockStack>
    </Card>
  );
};

export const WholeSaleForm = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handelQtyChange = useCallback(
    (value: string) => setQuantity(Number(value)),
    [],
  );

  const dicsount =
    quantity < 25
      ? 0
      : quantity >= 25 && quantity < 50
        ? 10
        : quantity >= 50 && quantity < 100
          ? 25
          : quantity >= 100 && quantity < 150
            ? 45
            : 75;

  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        Width
      </Text>
      <BlockStack gap={"100"}>
        <TextField
          value={String(quantity)}
          onChange={handelQtyChange}
          label=""
          type="number"
          suffix="QTY"
          autoComplete="off"
        />
        <Text as="p" variant="bodyXs" tone="magic">
          Discounted Price {`$${formatToMoney(dicsount)}`}
        </Text>
      </BlockStack>
    </div>
  );
};
