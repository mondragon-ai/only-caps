import { BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber, formatToMoney } from "~/lib/formatters/numbers";

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

export const TopAnalytics = () => {
  // // Find the maximum count in your data
  // const maxCount = Math.max(...data.map((item) => item.count));

  // // Calculate the upper limit for the y-axis
  // const yAxisUpperLimit = Math.ceil(maxCount) * 1.2;
  return (
    <InlineGrid gap={"400"} columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
      <Card>
        <BlockStack gap={"400"}>
          <Text as="h4" variant="headingXs" fontWeight="regular">
            Total Revenue
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
              ${formatNumber(114000)}
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
                  stroke="#0096C7"
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
            Items Sold
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
              {formatNumber(1200)}
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
              <BarChart
                data={data}
                margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
              >
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
                <Bar dataKey="pv" stackId="a" fill="#0096C7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BlockStack>
      </Card>
      <Card>
        <BlockStack gap={"400"}>
          <Text as="h4" variant="headingXs" fontWeight="regular">
            Top Seller
          </Text>
          <BlockStack gap={"1000"}>
            <TopSellar title={"Hawk Tuah"} amount={2100} width={80} />
            <TopSellar title={"The Don"} amount={1800} width={70} />
            <TopSellar title={"Mercaaa Fuck Yea"} amount={1650} width={60} />
            <TopSellar title={"Sandy Hook"} amount={1205} width={40} />
            <TopSellar title={"Go Team"} amount={300} width={20} />
          </BlockStack>
        </BlockStack>
      </Card>
    </InlineGrid>
  );
};

const TopSellar = ({
  title,
  amount,
  width = 80,
}: {
  title: string;
  amount: number;
  width: number;
}) => {
  return (
    <div style={{ width: "100%" }}>
      <Text as="p" variant="bodyXs" fontWeight="regular" tone="subdued">
        {title}
      </Text>
      <div
        style={{
          width: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            marginRight: "5px",
            height: "10px",
            borderRadius: "3px",
            background: "#48CAE4",
          }}
        ></div>
        <Text as="p" variant="bodyXs" fontWeight="regular" tone="disabled">
          {formatNumber(amount)}
        </Text>
      </div>
    </div>
  );
};
