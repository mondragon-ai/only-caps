import { formatDate, getDifferenceInDays } from "../formatters/numbers";
import {
  AnalyticsProps,
  DataProps,
  OrderAnalyticsProps,
  TopSellerProps,
  TopSellersProps,
} from "../types/analytics";

/**
 * Handles and aggregates analytics data.
 *
 * @param {AnalyticsProps[]} data - Array of analytics data.
 * @returns {object} Aggregated analytics data including total orders, items, revenue, charts, and top sellers/types.
 */
export const handleAnalytics = (data: AnalyticsProps[]) => {
  let analytics = {
    total_orders: 0,
    total_items: 0,
    total_revenue: 0,
    top_sellers: {} as TopSellersProps,
    top_types: [] as TopSellerProps[],
    orders: [] as OrderAnalyticsProps[],

    revenue_chart: [] as DataProps[],
    sold_chart: [] as DataProps[],
    fulfillment_chart: [] as DataProps[],
    shipping_chart: [] as DataProps[],

    total_shipping_cost: 0,
    total_fulfillment_time: 0,
  };

  let top_types = {} as Record<string, number>;

  if (data.length == 0) {
    return analytics;
  }

  for (const day of data) {
    analytics.total_items += day.total_items;
    analytics.total_revenue += day.total_revenue;

    // Aggregate top sellers
    for (const [ts, value] of Object.entries(day.top_sellers)) {
      if (analytics.top_sellers[ts]) {
        analytics.top_sellers[ts] += value;
      } else {
        analytics.top_sellers[ts] = value;
      }
    }

    // Aggregate top types
    for (const [tt, value] of Object.entries(day.top_types)) {
      if (top_types[tt]) {
        top_types[tt] += value;
      } else {
        top_types[tt] = value;
      }
    }

    analytics.orders.push(...day.orders);

    let total_fulfillment_time = 0;
    let daily_orders = 0;
    let total_shipping_cost = 0;

    for (const order of day.orders) {
      analytics.total_shipping_cost += order.shipping_cost;
      total_shipping_cost += order.shipping_cost;

      if (order.fulfilled_date && Number(order.fulfilled_date) !== 0) {
        total_fulfillment_time += getDifferenceInDays(
          Number(order.fulfilled_date),
          Number(order.created_at),
        );
      }
      daily_orders += 1;
    }

    // Push data to charts
    analytics.revenue_chart.push({
      date: formatDate(Number(day.id)),
      value: day.total_revenue,
    });
    analytics.sold_chart.push({
      date: formatDate(Number(day.id)),
      value: day.total_items,
    });
    analytics.fulfillment_chart.push({
      date: formatDate(Number(day.id)),
      value: Math.round(total_fulfillment_time / daily_orders),
    });
    analytics.shipping_chart.push({
      date: formatDate(Number(day.id)),
      value: Math.round(total_shipping_cost / daily_orders),
    });

    analytics.total_orders += daily_orders;
  }

  analytics.top_types = Object.entries(top_types).map(([key, value]) => ({
    name: key,
    value,
  }));

  return analytics;
};
