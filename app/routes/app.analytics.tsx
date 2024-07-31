import {
  ActionList,
  Button,
  Icon,
  Layout,
  OptionList,
  Page,
  Popover,
  Text,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { HighlightStats } from "~/components/home/HighlightStats";
import { Footer } from "~/components/layout/Footer";
import { CheckSmallIcon } from "@shopify/polaris-icons";
import { TopAnalytics } from "~/components/analytics/TopAnalytics";
import { BottomAnalytics } from "~/components/analytics/BottomAnalytics";

export default function GeneratorPage() {
  return (
    <Page
      title={`Analytics`}
      subtitle={"View the performance of your designs"}
      secondaryActions={<TimeFrameOptions />}
    >
      <Layout>
        <Layout.Section>
          <HighlightStats />
        </Layout.Section>
        <Layout.Section>
          <TopAnalytics />
        </Layout.Section>
        <Layout.Section>
          <BottomAnalytics />
        </Layout.Section>
        <Layout.Section>
          <Footer />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function TimeFrameOptions() {
  const [selected, setSelected] = useState<TimeFrameProps>("seven_days");
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const selectOption = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );

  return (
    <div
      style={{
        height: "auto",
        minWidth: "150px",
        width: "150px",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        fluidContent={false}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              onAction: () => setSelected("seven_days"),
              active: selected == "seven_days" && true,
              content: "Last 7 Days",
              suffix: selected == "seven_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => setSelected("thirty_days"),
              active: selected == "thirty_days" && true,
              content: "Last 30 Days",
              suffix: selected == "thirty_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => setSelected("ninety_days"),
              active: selected == "ninety_days" && true,
              content: "Last 90 Days",
              suffix: selected == "ninety_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => setSelected("twelve_months"),
              active: selected == "twelve_months" && true,
              content: "Last 12 Months",
              suffix: selected == "twelve_months" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export type TimeFrameProps =
  | "seven_days"
  | "thirty_days"
  | "ninety_days"
  | "twelve_months";
