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
import { MockupDocument } from "~/lib/types/mockups";

type MockupListProps = {
  mockups: MockupDocument[];
  handleDelete: () => Promise<void>;
};

export const MockupList = ({ mockups, handleDelete }: MockupListProps) => {
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

  const renderRow = (mockup: MockupDocument, index: number) => {
    const { id, title, state, type, cost, status, mockup_urls } = mockup;
    return (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        onClick={() => navigate(`/app/mockup/${id}`)}
      >
        <IndexTable.Cell>
          <Thumbnail
            source={mockup_urls && mockup_urls[0] && mockup_urls[0].url}
            alt={mockup_urls && mockup_urls[0] && mockup_urls[0].alt}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {type}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {title}
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
            {state}
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
      onAction: handleDelete,
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
