import { useNavigate } from "@remix-run/react";
import {
  Badge,
  Card,
  IndexTable,
  Text,
  Thumbnail,
  useBreakpoints,
  useIndexResourceState,
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { formatToMoney } from "~/lib/formatters/numbers";
import { MockupProps } from "~/lib/types/mockups";

export const MockupList = ({ mockups }: { mockups: MockupProps[] }) => {
  const navigate = useNavigate();
  const resourceName = {
    singular: "Mockup",
    plural: "Mockups",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(mockups);

  const renderStatusBadge = (status: string) => {
    return status === "created" ? (
      <Badge tone="magic" progress="complete">
        Created
      </Badge>
    ) : (
      <Badge tone="attention" progress="incomplete">
        Not Created
      </Badge>
    );
  };

  const renderRow = (mockup: MockupProps, index: number) => {
    const { id, name, created, type, cost, status, image } = mockup;
    return (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        onClick={() => navigate(`/app/mockup/${id}`)}
      >
        <IndexTable.Cell>
          <Thumbnail source={image} alt={name} />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {type}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{renderStatusBadge(status)}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {`$${formatToMoney(Number(cost))}`}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {created}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  };

  const bulkActions = [
    {
      icon: DeleteIcon,
      destructive: true,
      content: "Delete Mockups",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  return (
    <Card padding="0">
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={mockups.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Image" },
          { title: "Type" },
          { title: "Title" },
          { title: "Status" },
          { title: "Cost", alignment: "end" },
          { title: "Created" },
        ]}
        bulkActions={bulkActions}
      >
        {mockups.map(renderRow)}
      </IndexTable>
    </Card>
  );
};
