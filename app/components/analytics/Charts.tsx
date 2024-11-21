import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "~/lib/data/analytics";
import { formatNumber } from "~/lib/formatters/numbers";
import { capitalizeEachWord } from "~/lib/formatters/text";
import { DataProps, TopSellerProps } from "~/lib/types/analytics";

type CustomToolTipPrps = {
  date: string;
  value: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  suffix,
  fixed,
  prefix,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <>
        <style>
          {`
                .toolWrapper {
                    background-color: #fff;
                    padding: 5px 7px;
                    background: var(--p-color-bg-surface);
                    border-radius: var(--p-border-radius-300);
                    border: 2px solid var(--p-color-bg-surface-tertiary-hover);
                    border-radius: 6px;
                    box-shadow: var(--p-shadow-100);
                }
                
                .toolWrapper p {
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 20px;
                    color: black;
                    margin-left: 3px;
                }
            `}
        </style>
        <div className={"toolWrapper"}>
          <p className="label">
            {`${label}: `}
            <span
              style={{ fontWeight: 550 }}
            >{`${prefix}${Number(payload[0].value).toFixed(fixed)}${suffix}`}</span>
          </p>
        </div>
      </>
    );
  }
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload, suffix, fixed, prefix } = props;

  return (
    <text
      x={x}
      y={y}
      dy={0}
      textAnchor="end"
      fill="rgb(112, 112, 123)"
      transform="rotate(0)"
      fontSize={"11px"}
    >
      {`${prefix}${Number(payload.value).toFixed(fixed)}${suffix ? suffix : ""}`}{" "}
    </text>
  );
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <text
      x={x}
      y={y + 15}
      dy={0}
      textAnchor="middle"
      fill="rgb(112, 112, 123)"
      transform="rotate(0)"
      fontSize={"11px"}
      alignmentBaseline="central"
    >
      {`${payload.value}`}
    </text>
  );
};

export const LineChartStats = ({
  data,
  suffix = "",
  fixed = 1,
  prefix = "",
}: {
  data: DataProps[];
  suffix?: "%" | "d" | "";
  prefix?: "" | "$";
  fixed?: number;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        // margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
        // width={"100%"}
        margin={{ left: 0, right: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0096C7" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          interval="preserveStartEnd"
          dataKey="date"
          padding={{ left: 10, right: 10 }}
          axisLine={false}
          tickSize={0}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          padding={{ top: 0, bottom: 5 }}
          tickSize={0}
          tick={
            <CustomYAxisTick suffix={suffix} prefix={prefix} fixed={fixed} />
          }
        />
        <Tooltip
          content={
            <CustomTooltip suffix={suffix} prefix={prefix} fixed={fixed} />
          }
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#0096C7"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const RoundedBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  if (width <= 0 || height <= 0) {
    return null;
  }

  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} rx={6} ry={6} />
  );
};

export const BarChartStats = ({
  data,
  suffix,
  fixed = 1,
  prefix = "",
  color = "#a1a5f4",
}: {
  data: any[];
  suffix: "%" | "h" | "";
  prefix?: "" | "$";
  fixed?: number;
  color?: string;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          interval="preserveStartEnd"
          dataKey="date"
          padding={{ left: 10, right: 10 }}
          axisLine={false}
          tickSize={0}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          padding={{ top: 10, bottom: 0 }}
          type="number"
          tickSize={0}
          tick={
            <CustomYAxisTick suffix={suffix} prefix={prefix} fixed={fixed} />
          }
        />
        {/* <Tooltip /> */}
        <Tooltip
          content={
            <CustomTooltip suffix={suffix} prefix={prefix} fixed={fixed} />
          }
        />
        <Bar dataKey="value" fill={color} shape={<RoundedBar />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const PieChartStats = ({ data }: { data: TopSellerProps[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 25, right: 0, left: 0, bottom: 5 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

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
        {capitalizeEachWord(payload.name)}
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
