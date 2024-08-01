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
  const [quantity, setQuantity] = useState(25);

  const calculatePercentage = (quantity: number) => {
    if (quantity < 25) return 0;
    if (quantity >= 25 && quantity < 50) return 5;
    if (quantity >= 50 && quantity < 100) return 12;
    if (quantity >= 100 && quantity < 150) return 25;
    return 55;
  };

  const percentage = calculatePercentage(quantity);

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h4" variant="headingMd">
          Wholesale Options
        </Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Calculate wholesale price options for bulk orders and receive a
          discount. This option is perfect for big events or those wanting to
          receive a special deal
        </Text>
        <InlineGrid
          columns={["twoThirds", "oneThird", "oneThird"]}
          alignItems="center"
          gap="200"
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

interface WholeSaleFormProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const WholeSaleForm = ({
  quantity,
  setQuantity,
}: WholeSaleFormProps) => {
  const handleQtyChange = useCallback(
    (value: string) => setQuantity(Number(value)),
    [setQuantity],
  );

  const calculateDiscount = (quantity: number) => {
    if (quantity < 25) return 0;
    if (quantity >= 25 && quantity < 50) return 10;
    if (quantity >= 50 && quantity < 100) return 25;
    if (quantity >= 100 && quantity < 150) return 45;
    return 75;
  };

  const discount = calculateDiscount(quantity);

  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        Width
      </Text>
      <BlockStack gap="100">
        <TextField
          value={String(quantity)}
          onChange={handleQtyChange}
          label=""
          type="number"
          suffix="QTY"
          autoComplete="off"
        />
        <Text as="p" variant="bodyXs" tone="magic">
          Discounted Price {`$${formatToMoney(discount)}`}
        </Text>
      </BlockStack>
    </div>
  );
};
