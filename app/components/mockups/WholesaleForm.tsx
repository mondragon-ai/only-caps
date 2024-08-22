import {
  BlockStack,
  InlineGrid,
  Text,
  Icon,
  TextField,
  Select,
} from "@shopify/polaris";
import { Address } from "./WholeSale";
import { MockupDocument } from "~/lib/types/mockups";
import { useCallback, useState } from "react";
import { formatToMoney } from "~/lib/formatters/numbers";
import { CheckIcon } from "@shopify/polaris-icons";
import styles from "./Mockups.module.css";
import { calculateDiscount } from "~/lib/util/mockups";
import { states, states_obj } from "~/lib/data/wholesale";
import { HatData } from "~/lib/data/mockups";

type FormProps = {
  color: string;
  address: any;
  email: string;
};

export const AddressForm = ({
  quantity,
  form,
  setForm,
}: {
  quantity: number;
  form: FormProps;
  setForm: React.Dispatch<React.SetStateAction<FormProps>>;
}) => {
  const discount = calculateDiscount(quantity);

  const handleSelectChange = useCallback((value: string, id: string) => {
    // setSelected(value)
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        province_code: value,
        province: states_obj[value as string],
      },
    }));
  }, []);

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
          placeholder={"420 Bigly Ln."}
          value={form.address.address1 || ""}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              address: { ...prev.address, address1: v },
            }))
          }
          label=""
          type="text"
          autoComplete="off"
        />
        <Text as="p" variant="bodyXs" tone="disabled">
          City
        </Text>

        <TextField
          placeholder={"Denver"}
          value={form.address.city || ""}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              address: { ...prev.address, city: v },
            }))
          }
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

            <Select
              label=""
              options={states}
              onChange={handleSelectChange}
              value={form.address.province_code || ""}
            />
            {/* <TextField
              placeholder={"CA"}
              value={form.address.province || ""}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  address: { ...prev.address, provinceCode: v },
                }))
              }
              label=""
              type="text"
              autoComplete="off"
            /> */}
          </BlockStack>
          <BlockStack gap="100">
            <Text as="p" variant="bodyXs" tone="disabled">
              Zip
            </Text>
            <TextField
              placeholder={"42069"}
              value={form.address.zip || ""}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  address: { ...prev.address, zip: v },
                }))
              }
              label=""
              type="text"
              autoComplete="off"
            />
          </BlockStack>
        </InlineGrid>

        <InlineGrid
          columns={["twoThirds", "twoThirds"]}
          alignItems="end"
          gap="200"
        >
          <BlockStack gap="100">
            <Text as="p" variant="bodyXs" tone="disabled">
              First Name
            </Text>
            <TextField
              placeholder={"Bigly"}
              value={form.address.first_name || ""}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  address: { ...prev.address, first_name: v },
                }))
              }
              label=""
              type="text"
              autoComplete="off"
            />
          </BlockStack>
          <BlockStack gap="100">
            <Text as="p" variant="bodyXs" tone="disabled">
              Last Name
            </Text>
            <TextField
              placeholder={"Bear"}
              value={form.address.last_name || ""}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  address: { ...prev.address, last_name: v },
                }))
              }
              label=""
              type="text"
              autoComplete="off"
            />
          </BlockStack>
        </InlineGrid>
        <Text as="p" variant="bodyXs" tone="disabled">
          Contact Email
        </Text>
        <TextField
          placeholder={"BigBear@gobigly.com"}
          value={form.email || ""}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              email: v,
            }))
          }
          label=""
          type="text"
          autoComplete="off"
        />
        <Text as="p" variant="bodyXs" tone="magic">
          Discounted Price: {`$${formatToMoney(discount)}`}. Total Quantity:{" "}
          {`${quantity}`}
        </Text>
      </BlockStack>
    </div>
  );
};

interface ColorsProps {
  mockup: MockupDocument;
  form: FormProps;
  setForm: React.Dispatch<React.SetStateAction<FormProps>>;
}

export const GeneratorColors = ({ mockup, setForm, form }: ColorsProps) => {
  const handleColorChange = (color: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      color: color,
    }));
  };

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
        {mockup.colors &&
          mockup.colors.map((color) => {
            if (!HatData[mockup.type].quarter_turns[color]) {
              return null;
            }
            return (
              <div className={styles.color} key={color}>
                <img
                  style={{ height: "25px", width: "25px" }}
                  src={HatData[mockup.type].quarter_turns[color]}
                  alt={color}
                />
              </div>
            );
          })}
        {/* {mockup.colors &&
          mockup.colors.map((color) =>
            color.includes("/")
              ? renderDualColorSwatch(form, color, handleColorChange)
              : renderSingleColorSwatch(form, color, handleColorChange),
          )} */}
      </div>
    </BlockStack>
  );
};

export const renderSingleColorSwatch = (
  form: FormProps,
  color: string,
  handleColorChange: (color: string) => void,
) => {
  return (
    <div
      className={styles.color}
      key={color}
      onClick={() => handleColorChange(color)}
    >
      <div style={{ background: color }} className={styles.singleColorSwatch}>
        {form.color.includes(color) ? (
          <Icon source={CheckIcon} tone="subdued" />
        ) : null}
      </div>
    </div>
  );
};

export const renderDualColorSwatch = (
  form: FormProps,
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
          {form.color.includes(color) ? (
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
