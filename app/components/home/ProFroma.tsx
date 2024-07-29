import {
  Box,
  Button,
  Card,
  Divider,
  Form,
  FormLayout,
  InlineGrid,
  Text,
  TextField,
} from "@shopify/polaris";
import styles from "./Home.module.css";
import { useCallback, useState } from "react";
import { formatToMoney } from "~/lib/formatters/numbers";

export const ProFroma = () => {
  const [form, setForm] = useState({
    price: 60,
    qty: 5,
  });
  return (
    <Card padding="800">
      <InlineGrid
        gap="400"
        alignItems="center"
        columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
      >
        <div className={styles.imageContainer}>
          <img
            src="https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003"
            alt=""
          />
        </div>
        <div className={styles.proFormaContainer}>
          <Text as="h4" variant="headingMd" alignment="start">
            Expected Revenue to Generate{" "}
          </Text>
          <Divider borderColor="transparent" borderWidth="100" />
          <Text as="p" variant="bodyMd">
            Your cost for the hat starts at{" "}
            <Text
              as="strong"
              variant="bodyMd"
              fontWeight="semibold"
              tone="magic"
            >
              $30.00{" "}
            </Text>
          </Text>
          <SellFor setForm={setForm} form={form} />
          <DailyQuantity setForm={setForm} form={form} />
          <Text as="p" variant="bodyMd">
            Approximate annual revenue{" "}
          </Text>
          <Text as="h2" variant="heading2xl" tone="magic" fontWeight="bold">
            {`$${formatToMoney(Number(form.price * form.qty * 365))}`}
          </Text>
        </div>
      </InlineGrid>
    </Card>
  );
};

type FormProps = {
  setForm: React.Dispatch<
    React.SetStateAction<{
      price: number;
      qty: number;
    }>
  >;
  form: {
    price: number;
    qty: number;
  };
};

const SellFor = ({ setForm, form }: FormProps) => {
  const handleSubmit = useCallback(() => {
    setForm({ ...form });
  }, []);

  const handlePriceChange = useCallback(
    (value: string) => setForm({ ...form, price: Number(value) }),
    [],
  );

  return (
    <div className={styles.sellForWrapper} style={{ marginTop: "2.5rem" }}>
      <div className={styles.txt}>
        <Text as="p" variant="bodyMd">
          You sell for
        </Text>
        <Text as="p" variant="bodyXs" tone="magic">
          Recommended Price
        </Text>
      </div>
      <div className={styles.proFromaForm}>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={String(form.price)}
              onChange={handlePriceChange}
              label=""
              type="number"
              prefix="$"
              autoComplete="off"
            />
          </FormLayout>
        </Form>
      </div>
    </div>
  );
};

const DailyQuantity = ({ setForm, form }: FormProps) => {
  const handleSubmit = useCallback(() => {
    setForm({ ...form });
  }, []);

  const handelQtyChange = useCallback(
    (value: string) => setForm({ ...form, qty: Number(value) }),
    [],
  );

  return (
    <div className={styles.sellForWrapper} style={{ marginBottom: "2.5rem" }}>
      <div className={styles.txt}>
        <Text as="p" variant="bodyMd">
          Sales per Day
        </Text>
      </div>
      <div className={styles.proFromaForm}>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={String(form.qty)}
              onChange={handelQtyChange}
              label=""
              type="number"
              autoComplete="off"
            />
          </FormLayout>
        </Form>
      </div>
    </div>
  );
};
