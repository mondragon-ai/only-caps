import { DescriptionList, Text } from "@shopify/polaris";
import { HatData } from "~/lib/data/mockups";
import { MockupDocument } from "~/lib/types/mockups";

export const MockupInfo = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <DescriptionList
      gap="tight"
      items={[
        {
          term: "Details",
          description: HatData[mockup.type].details,
        },
        {
          term: "Features",
          description: (
            <Text as="p" variant="bodyMd">
              {HatData[mockup.type].features}
            </Text>
          ),
        },
        {
          term: "Materials",
          description: HatData[mockup.type].material,
        },
      ]}
    />
  );
};
