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
  province_code: string;
  zip: string;
  province: string;
  country: string;
  country_code: string;
  first_name: string;
  last_name: string;
  name: string;
};

type WholeSaleProps = {
  mockup: MockupDocument;
  handleWholesale: (quantity: number, form: FormProps) => Promise<void>;
  address: any;
  customer: {
    name: string;
    email: string;
  };
  isLoading: boolean;
};

type FormProps = {
  color: string;
  address: any;
  email: string;
};

export const WholeSale = ({
  mockup,
  handleWholesale,
  address,
  customer,
  isLoading,
}: WholeSaleProps) => {
  const [isConfirmed, setConfirm] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(25);
  const [form, setForm] = useState<FormProps>({
    color: "",
    email: String(customer.email || ""),
    address: {
      address1: String(address.address1 || ""),
      city: String(address.city || ""),
      province: String(address.province || "Arkansas"),
      province_code: String(address.provinceCode || "AR"),
      zip: String(address.zip || ""),
      country: String(address.country || "United States"),
      country_code: String(address.country || "US"),
      first_name: String(address.firstName || ""),
      last_name: String(address.lastName || ""),
      name: String(address.name || ""),
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
                disabled={isLoading}
                loading={isLoading}
                tone="success"
                onClick={() => handleWholesale(quantity, form)}
              >
                PURCHASE
              </Button>
              <Text as="p" variant="bodyXs" tone="subdued">
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
