import {
  BlockStack,
  Button,
  Card,
  Link,
  Text,
  TextField,
} from "@shopify/polaris";
import styles from "./Orders.module.css";
import { OrderDocument } from "~/lib/types/orders";
import { useAppBridge } from "@shopify/app-bridge-react";
import { EditIcon, SaveIcon } from "@shopify/polaris-icons";
import { useState } from "react";

type Address = {
  address1: string;
  city: string;
  country: string;
  zip: string;
};

export const Customer = ({
  order,
  handleAddressChange,
}: {
  order: OrderDocument;
  handleAddressChange: (address: Address) => void;
}) => {
  const shopify = useAppBridge();

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(order.customer.email);
      shopify.toast.show("Email Copied");
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <Card>
      <BlockStack gap="500">
        <RenderCustomerInfo order={order} />
        <RenderContactInfo order={order} copy={handleEmailClick} />
        <RenderShippingAddress
          changeAddress={handleAddressChange}
          order={order}
        />
      </BlockStack>
    </Card>
  );
};

const RenderCustomerInfo = ({ order }: { order: OrderDocument }) => (
  <div className={styles.info}>
    <header>
      <Text as="h2" variant="headingMd">
        Customer
      </Text>
    </header>
    <div className={styles.info}>
      <Text as="p" variant="bodyMd" tone="disabled">
        {`${order.shopify_order_payload.shipping_address.first_name} ${order.shopify_order_payload.shipping_address.last_name}`}
      </Text>
      <Text as="p" variant="bodyMd" tone="disabled">
        External ID:
        <Link url={`#`}>{order.customer.id}</Link>
      </Text>
    </div>
  </div>
);

const RenderContactInfo = ({
  order,
  copy,
}: {
  order: OrderDocument;
  copy: () => Promise<void>;
}) => (
  <div className={styles.info}>
    <Text as="h2" variant="headingMd">
      Contact Information
    </Text>
    <Link onClick={copy}>{order.customer.email}</Link>
  </div>
);

const RenderShippingAddress = ({
  order,
  changeAddress,
}: {
  order: OrderDocument;
  changeAddress: (address: Address) => void;
}) => {
  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState({
    address1: order.shopify_order_payload.shipping_address.address1 || "",
    city: order.shopify_order_payload.shipping_address.city || "",
    country: order.shopify_order_payload.shipping_address.country || "",
    zip: order.shopify_order_payload.shipping_address.zip || "",
  });

  const handleSaveAddress = () => {
    changeAddress(address);
    setEdit(false);
  };

  const handleAddressChange = (v: string, name: string) => {
    setAddress((p) => p && { ...p, [name]: v });
  };

  return (
    <div className={styles.info}>
      <Text as="h2" variant="headingMd">
        Shipping Address
      </Text>
      {!edit ? (
        <div>
          <Text as="p" variant="bodyMd" tone="disabled">
            {address.address1}
          </Text>
          <Text as="p" variant="bodyMd" tone="disabled">
            {address.city}
          </Text>
          <Text as="p" variant="bodyMd" tone="disabled">
            {`${address.country} ${address.zip}`}
          </Text>
          <div style={{ marginTop: "10px" }}></div>
          {!order.tracking_number && (
            <Button
              onClick={() => {
                setEdit(!edit);
              }}
              icon={EditIcon}
            >
              Edit Address
            </Button>
          )}
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div style={{ margin: "10px 0" }}>
            <TextField
              value={address.address1}
              onChange={(v: string) => handleAddressChange(v, "address1")}
              label=""
              name="address1"
              type="text"
              autoComplete="off"
            />
          </div>
          <div style={{ margin: "10px 0", width: "100%" }}>
            <TextField
              value={address.city}
              onChange={(v: string) => handleAddressChange(v, "city")}
              label=""
              name="city"
              type="text"
              autoComplete="off"
            />
          </div>
          <TextField
            value={address.zip}
            onChange={(v: string) => handleAddressChange(v, "zip")}
            label=""
            name="zip"
            type="text"
            autoComplete="off"
          />
          <div style={{ marginTop: "10px", width: "100%" }}></div>
          {!order.tracking_number && (
            <Button onClick={handleSaveAddress} icon={SaveIcon}>
              Save Address
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
