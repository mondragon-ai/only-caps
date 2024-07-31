import { BlockStack, Box, Card, InlineGrid, Text } from "@shopify/polaris";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ActiveShape } from "recharts/types/util/types";
import { formatToMoney } from "~/lib/formatters/numbers";
import { MockupTypes } from "~/lib/types/mockups";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export const BottomAnalytics = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  return (
    <InlineGrid gap={"400"} columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
      <Card>
        <BlockStack gap={"400"}>
          <Text as="h4" variant="headingXs" fontWeight="regular">
            Avg. Time To Ship
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "baseline",
            }}
          >
            <Text as="h1" variant="heading2xl" fontWeight="regular">
              8.5
            </Text>
            <div style={{ marginLeft: "2px" }}>
              <Text as="p" variant="bodyXs" fontWeight="regular">
                days
              </Text>
            </div>
          </div>

          <div
            style={{
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0077B6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid horizontal={false} vertical={false} />

                <XAxis
                  interval={"equidistantPreserveStart"}
                  angle={0}
                  dataKey="name"
                  // tickFormatter={formatDate}
                  padding={{ left: 10, right: 10 }}
                  axisLine={false}
                  tickSize={0}
                />

                <YAxis
                  // domain={[0, yAxisUpperLimit]}
                  axisLine={false}
                  padding={{ top: 0, bottom: 10 }}
                  tickSize={0}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#0077B6"
                  stackId="1"
                  activeDot={{ stroke: "#fff", strokeWidth: 1, r: 2 }}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BlockStack>
      </Card>

      <Card>
        <BlockStack gap={"400"}>
          <Text as="h4" variant="headingXs" fontWeight="regular">
            Type of Hats Sold
          </Text>

          <div
            style={{
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                width={400}
                height={200}
              >
                <Pie
                  data={pie_data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="value"
                  // label
                  activeIndex={activeIndex}
                  onMouseEnter={onPieEnter}
                  activeShape={renderActiveShape}
                >
                  {pie_data.map((entry, index) => {
                    return <Cell key={`cell-${index}`} fill={COLORS[index]} />;
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </BlockStack>
      </Card>

      <Card>
        <BlockStack gap={"400"}>
          <Text as="h4" variant="headingXs" fontWeight="regular">
            Avg. Shipping Cost
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "baseline",
            }}
          >
            <Text as="h1" variant="heading2xl" fontWeight="regular">
              ${formatToMoney(9.97)}
            </Text>
          </div>
          <div
            style={{
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0096C7" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid horizontal={false} vertical={false} />

                <XAxis
                  interval={"equidistantPreserveStart"}
                  angle={0}
                  dataKey="name"
                  // tickFormatter={formatDate}
                  padding={{ left: 10, right: 10 }}
                  axisLine={false}
                  tickSize={0}
                />

                <YAxis
                  // domain={[0, yAxisUpperLimit]}
                  axisLine={false}
                  padding={{ top: 0, bottom: 10 }}
                  tickSize={0}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#0077B6"
                  stackId="1"
                  activeDot={{ stroke: "#fff", strokeWidth: 1, r: 2 }}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BlockStack>
      </Card>
    </InlineGrid>
  );
};

const pie_data = [
  { name: "Trucker", value: 400 },
  { name: "Flat", value: 350 },
  { name: "Snapback", value: 340 },
  { name: "Foam", value: 200 },
  { name: "Low", value: 500 },
  { name: "Mid", value: 100 },
  { name: "High", value: 100 },
  { name: "Retro", value: 900 },
  { name: "Struct", value: 300 },
];
const COLORS = [
  "#03045E",
  "#023E8A",
  "#0077B6",
  "#0096C7",
  "#00B4D8",
  "#48CAE4",
  "#90E0EF",
  "#ADE8F4",
  "#CAF0F8",
];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 13} dy={10} textAnchor="middle" fill={fill}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const PieLabel = ({
  type,
  color = "black",
}: {
  type: MockupTypes;
  color: string;
}) => {
  return (
    <Box
      borderColor="border"
      borderWidth="025"
      borderRadius="100"
      padding="100"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            background: color,
            height: "10px",
            width: "10px",
            borderRadius: "2px",
          }}
        ></div>
        <Text
          truncate={true}
          alignment="end"
          as="p"
          variant="bodyXs"
          tone="subdued"
        >
          {type
            .split("_")
            .map((l, i) => {
              if (i == 0) return l.toLocaleUpperCase();
              else l;
            })
            .join("_")
            .replaceAll("_", " ")}
        </Text>
      </div>
    </Box>
  );
};
