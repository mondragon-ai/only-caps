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
import { HatData } from "~/lib/data/mockups";
import { formatDateLong, formatToMoney } from "~/lib/formatters/numbers";
import { capitalizeEachWord } from "~/lib/formatters/text";
import { MockupDocument } from "~/lib/types/mockups";

type MockupListProps = {
  mockups: MockupDocument[];
  handleDelete: (ids: string[]) => Promise<void>;
};

export const MockupList = ({ mockups, handleDelete }: MockupListProps) => {
  const navigate = useNavigate();
  const resourceName = {
    singular: "Mockup",
    plural: "Mockups",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(mockups);

  const renderStatusBadge = (product_id: string) => {
    return product_id === "" ? (
      <Badge tone="critical" progress="incomplete">
        Not Created
      </Badge>
    ) : (
      <Badge tone="magic" progress="complete">
        Created
      </Badge>
    );
  };

  const renderRow = (mockup: MockupDocument, index: number) => {
    const { id, title, state, type, product_id, mockup_urls } = mockup;
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
            {capitalizeEachWord(type)}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{renderStatusBadge(product_id)}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {`$${formatToMoney(Number(HatData[type].cost))}`}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {formatDateLong(state)}
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
      onAction: () => handleDelete(selectedResources),
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
