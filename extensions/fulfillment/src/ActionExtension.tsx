import {
  reactExtension,
  useApi,
  AdminAction,
  BlockStack,
  Button,
  Text,
} from "@shopify/ui-extensions-react/admin";
import { useOrderData } from "./hooks";
import { acceptRequestFulfillment, requestFulfillment } from "./util";

const TARGET = "admin.order-details.action.render";

export default reactExtension(TARGET, () => <App />);

function App() {
  const { i18n, close, data } = useApi(TARGET);
  const { fulfillment, loading, error } = useOrderData(data.selected[0].id);

  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error}</Text>;

  const handleRequestFulfillment = async () => {
    await requestFulfillment(fulfillment.id);
    setTimeout(async () => {
      await acceptRequestFulfillment(fulfillment.id);
    }, 3000);
    close();
  };

  const handleCloseModal = () => {
    close();
  };

  return (
    <AdminAction
      title="Request Fulfillment"
      primaryAction={
        fulfillment.id !== "" &&
        (fulfillment.request_status === "UNSUBMITTED" ||
          fulfillment.request_status === "CANCELLATION_ACCEPTED") ? (
          <RequestFulfillmentButton onClick={handleRequestFulfillment} />
        ) : null
      }
      secondaryAction={<CloseModalButton onClick={handleCloseModal} />}
    >
      <BlockStack gap="large large">
        <Text fontWeight="bold">
          Request Fulfillment{" "}
          {fulfillment.request_status == "ACCEPTED" && "- Accepted ✅"}{" "}
        </Text>
        <Text>
          At times, it may be required to manually request fulfillment from
          OnlyCaps Fulfillment.
        </Text>
        <Text fontStyle="italic" fontWeight="light">
          {fulfillment.request_status === "CANCELLATION_REQUESTED"
            ? "Awaiting Cancellations"
            : ""}
        </Text>
      </BlockStack>
    </AdminAction>
  );
}

/**
 * A button to close the modal.
 * @param {function} onClick - The function to call when the button is clicked.
 * @returns {JSX.Element} - The rendered button component.
 */
export const CloseModalButton = ({ onClick }) => (
  <Button onPress={onClick}>Close</Button>
);

/**
 * A button to request fulfillment for an order.
 * @param {function} onClick - The function to call when the button is clicked.
 * @returns {JSX.Element} - The rendered button component.
 */
export const RequestFulfillmentButton = ({ onClick }) => (
  <Button onPress={onClick}>Request Fulfillment</Button>
);
