import { BlockStack, InlineGrid, Text } from "@shopify/polaris";
import styles from "./Home.module.css";

export const HowTo = () => {
  return (
    <div className={styles.howToWrapper}>
      <BlockStack gap={"500"}>
        <Text as="h4" variant="heading3xl" alignment="center">
          How Only Caps Works
        </Text>
        <InlineGrid
          gap="400"
          alignItems="center"
          columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
        >
          <Step
            step="one"
            title="Generate A Product"
            text="Choose a style and generate a mockup with your image or AI— Magic"
          />
          <Step
            step="two"
            title="Customer Orders"
            text="The product is automatically created to your store and is ready for purchase"
          />
          <Step
            step="three"
            title="We Deliver"
            text="A customer places an order we receive and quickly prepare the hat for delivery."
          />
        </InlineGrid>
      </BlockStack>
    </div>
  );
};

const Step = ({
  title,
  text,
  step,
}: {
  title: string;
  text: string;
  step: "one" | "two" | "three";
}) => {
  const img =
    step == "one"
      ? "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/DALL_E_2024-07-29_12.03.16_-_A_modern_flat_illustration_representing_the_We_Deliver_section_of_a_Shopify_POD_app._The_image_should_show_the_process_of_a_customer_placing_an_orde.webp?v=1722265436"
      : step == "two"
        ? "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/DALL_E_2024-07-29_12.02.02_-_A_modern_flat_illustration_representing_the_Customer_Orders_section_of_a_Shopify_POD_app._The_image_should_depict_a_seamless_process_where_a_product.webp?v=1722265436"
        : "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/DALL_E_2024-07-29_12.00.40_-_A_modern_flat_illustration_showing_the_process_of_generating_a_product_in_a_Shopify_POD_app._The_image_should_depict_a_user_interface_with_options_for.webp?v=1722265436";
  return (
    <div className={styles.stepContainer}>
      <div>
        <img src={img} alt="" />
      </div>
      <div className={styles.textContainer}>
        <Text as="h4" variant="headingMd" alignment="center">
          {title}
        </Text>
        <Text as="p" variant="bodyMd" alignment="center">
          {text}
        </Text>
      </div>
    </div>
  );
};
