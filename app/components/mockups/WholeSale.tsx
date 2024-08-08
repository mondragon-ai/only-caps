import {
  BlockStack,
  Button,
  Card,
  Icon,
  InlineGrid,
  Text,
  TextField,
} from "@shopify/polaris";
import { GeneratorStateProps, MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback, useState } from "react";
import { formatToMoney } from "~/lib/formatters/numbers";
import { CheckIcon } from "@shopify/polaris-icons";
import { HatData } from "~/lib/data/mockups";

export const WholeSale = ({
  mockup,
  handleWholesale,
}: {
  mockup: MockupProps;
  handleWholesale: (
    quantity: number,
    address: {
      address1: null | string;
      city: null | string;
      provinceCode: null | string;
      zip: null | string;
    },
  ) => Promise<void>;
}) => {
  const [isConfirmed, setConfirm] = useState<boolean>(false);
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
              <AddressForm quantity={0} />
            </BlockStack>
            <BlockStack gap="100">
              <GeneratorColors mockup={mockup} />
              <Button tone="success" onClick={() => {}}>
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

const calculateDiscount = (quantity: number) => {
  if (quantity < 25) return 0;
  if (quantity >= 25 && quantity < 50) return 10;
  if (quantity >= 50 && quantity < 100) return 25;
  if (quantity >= 100 && quantity < 150) return 45;
  return 75;
};

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

export const AddressForm = ({ quantity }: { quantity: number }) => {
  const discount = calculateDiscount(quantity);

  return (
    <div>
      <Text as="p" variant="bodyMd" tone="magic">
        Shipping Address
      </Text>
      <BlockStack gap="100">
        <Text as="p" variant="bodyXs" tone="disabled">
          Street Address
        </Text>
        <TextField
          value={String()}
          onChange={() => {}}
          label=""
          type="text"
          autoComplete="off"
        />
        <Text as="p" variant="bodyXs" tone="disabled">
          City
        </Text>
        <TextField
          value={String()}
          onChange={() => {}}
          label=""
          type="text"
          autoComplete="off"
        />
        <InlineGrid
          columns={["twoThirds", "twoThirds"]}
          alignItems="end"
          gap="200"
        >
          <BlockStack gap="100">
            <Text as="p" variant="bodyXs" tone="disabled">
              State
            </Text>
            <TextField
              value={String()}
              onChange={() => {}}
              label=""
              type="text"
              autoComplete="off"
            />
          </BlockStack>
          <BlockStack gap="100">
            <Text as="p" variant="bodyXs" tone="disabled">
              Zip
            </Text>
            <TextField
              value={String()}
              onChange={() => {}}
              label=""
              type="text"
              autoComplete="off"
            />
          </BlockStack>
          <Text as="p" variant="bodyXs" tone="magic">
            Discounted Price {`$${formatToMoney(discount)}`}
          </Text>
        </InlineGrid>
      </BlockStack>
    </div>
  );
};

interface ColorsProps {
  mockup: MockupProps;
  // setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}

export const GeneratorColors = ({ mockup }: ColorsProps) => {
  const handleColorChange = useCallback(
    (color: string) => {
      // setMockup((prevMockup) => ({
      //   ...prevMockup,
      //   colors: prevMockup.colors.includes(color)
      //     ? prevMockup.colors.filter((c) => c !== color)
      //     : [...prevMockup.colors, color],
      // }));
    },
    [mockup],
  );

  return (
    <BlockStack gap="500">
      <div className={styles.info}>
        <Text as="p" variant="bodyMd" tone="magic">
          Colors
        </Text>
        <Text as="p" variant="bodyXs" tone="disabled">
          Choose ONE color. Make multiple orders if other colors are needed.
        </Text>
      </div>
      <div className={styles.colorGrid}>
        {HatData[mockup.type].colors &&
          HatData[mockup.type].colors.map((color) =>
            color.includes("/")
              ? renderDualColorSwatch(mockup, color, handleColorChange)
              : renderSingleColorSwatch(mockup, color, handleColorChange),
          )}
      </div>
    </BlockStack>
  );
};

export const renderSingleColorSwatch = (
  mockup: MockupProps,
  color: string,
  handleColorChange: (color: string) => void,
) => (
  <div
    className={styles.color}
    key={color}
    onClick={() => handleColorChange(color)}
  >
    <div style={{ background: color }} className={styles.singleColorSwatch}>
      {mockup.colors.includes(color) ? (
        <Icon source={CheckIcon} tone="subdued" />
      ) : null}
    </div>
  </div>
);

export const renderDualColorSwatch = (
  mockup: MockupProps,
  color: string,
  handleColorChange: (color: string) => void,
) => {
  const [color1, color2] = color.split("/");
  return (
    <div
      className={styles.color}
      key={color}
      onClick={() => handleColorChange(color)}
    >
      <div className={styles.dualColorSwatch}>
        <div style={{ position: "absolute", zIndex: 10 }}>
          {mockup.colors.includes(color) ? (
            <Icon source={CheckIcon} tone="subdued" />
          ) : null}
        </div>
        <div
          style={{ background: color1 }}
          className={styles.dualColorHalf}
        ></div>
        <div
          style={{ background: color2 }}
          className={styles.dualColorHalf}
        ></div>
      </div>
    </div>
  );
};
