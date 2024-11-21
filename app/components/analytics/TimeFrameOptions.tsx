import { ActionList, Button, Icon, Popover } from "@shopify/polaris";
import { CheckSmallIcon } from "@shopify/polaris-icons";
import { TimeFrameProps } from "~/lib/types/analytics";
import { CalendarIcon } from "@shopify/polaris-icons";
import { useLocation, useNavigate } from "@remix-run/react";
import { useState, useCallback } from "react";

/**
 * Time frame selection component for analytics.
 * @returns {JSX.Element} The TimeFrameOptions component.
 */
export function TimeFrameOptions() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const timeFrame = searchParams.get("time_frame");
  const [selected, setSelected] = useState<TimeFrameProps>(
    (timeFrame as TimeFrameProps) || "seven_days",
  );
  const [popoverActive, setPopoverActive] = useState(false);
  const navigate = useNavigate();

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((popoverActive) => !popoverActive);
  }, []);

  const selectOption = useCallback(
    (type: TimeFrameProps) => {
      setSelected(type);
      navigate(`/app/analytics?time_frame=${type}`);
      setPopoverActive(false);
    },
    [navigate],
  );

  const options = [
    { label: "Last 7 Days", value: "seven_days" },
    { label: "Last 30 Days", value: "thirty_days" },
    { label: "Last 90 Days", value: "ninety_days" },
    { label: "Last 12 Months", value: "twelve_months" },
  ];

  const activator = (
    <Button onClick={togglePopoverActive} disclosure icon={CalendarIcon}>
      Choose Timeframe
    </Button>
  );

  return (
    <div
      style={{
        height: "auto",
        minWidth: "150px",
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
          items={options.map((option) => ({
            content: option.label,
            active: selected === option.value,
            onAction: () => selectOption(option.value as TimeFrameProps),
            suffix: selected === option.value && (
              <Icon source={CheckSmallIcon} />
            ),
          }))}
        />
      </Popover>
    </div>
  );
}
