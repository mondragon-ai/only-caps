import {
  BlockStack,
  Button,
  Card,
  InlineGrid,
  Text,
  TextField,
} from "@shopify/polaris";
import { MockupDocument } from "~/lib/types/mockups";
import { useCallback, useState } from "react";
import { formatToMoney } from "~/lib/formatters/numbers";
import { AddressForm, GeneratorColors } from "./WholesaleForm";
import { calculateDiscount, calculatePercentage } from "~/lib/util/mockups";

export type Address = {
  address1: string;
  city: string;
  provinceCode: string;
  zip: string;
};

type WholeSaleProps = {
  mockup: MockupDocument;
  handleWholesale: (
    quantity: number,
    address: Address,
    color: string,
  ) => Promise<void>;
  address: Address;
};

export const WholeSale = ({
  mockup,
  handleWholesale,
  address,
}: WholeSaleProps) => {
  const [isConfirmed, setConfirm] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(25);
  const [form, setForm] = useState({
    color: "",
    address: {
      address1: String(address.address1 || ""),
      city: String(address.city || ""),
      provinceCode: String(address.provinceCode || ""),
      zip: String(address.zip || ""),
    },
  });

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
        {!isConfirmed ? (
          <InlineGrid
            columns={["twoThirds", "oneThird", "oneThird"]}
            alignItems="center"
            gap="200"
          >
            <WholeSaleForm quantity={quantity} setQuantity={setQuantity} />
            <Text as="p" variant="bodyXs" tone="disabled">
              {`${percentage}% off`}
            </Text>
            <Button tone="success" onClick={() => setConfirm(true)}>
              ORDER NOW
            </Button>
          </InlineGrid>
        ) : (
          <InlineGrid
            columns={["twoThirds", "twoThirds"]}
            alignItems="start"
            gap="400"
          >
            <BlockStack gap="100">
              <AddressForm quantity={quantity} form={form} setForm={setForm} />
            </BlockStack>
            <BlockStack gap="100">
              <GeneratorColors mockup={mockup} form={form} setForm={setForm} />
              <Button
                tone="success"
                onClick={() =>
                  handleWholesale(quantity, form.address, form.color)
                }
              >
                PURCHASE
              </Button>
              <Text as="p" variant="bodyMd" tone="subdued">
                Buy clicking this button you are confimring you are making a
                purchase for this mockup.
              </Text>
            </BlockStack>
          </InlineGrid>
        )}
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
