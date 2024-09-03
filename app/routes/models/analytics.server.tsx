// loaders/analyticsLoader.ts
import { LoaderFunctionArgs, json, defer } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { SERVER_BASE_URL } from "~/lib/contants";
import { AnalyticsProps } from "~/lib/types/analytics";

/**
 * Loader function to fetch analytics data based on the selected time frame.
 * @param {LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} The response containing analytics data.
 */
export async function analyticsLoader({ request }: LoaderFunctionArgs) {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const timeFrame = url.searchParams.get("time_frame") || "seven_days";

  try {
    const shopResponse = await admin.graphql(`
      query {
        shop {
          name
          currencyCode
          billingAddress {
            address1
            city
            provinceCode
            zip
          }
        }
      }
    `);

    const responseJson = await shopResponse.json();

    const response = await fetch(
      `${SERVER_BASE_URL}/store/${session.shop}/analytics?time_frame=${timeFrame}&timezone=America/New_York`,
    );

    if (response.status == 201) {
      return defer({
        shop: session.shop,
        analytics: [],
      });
    }

    const data = (await response.json()) as {
      text: string;
      analytics: AnalyticsProps[];
    };

    return defer({
      shop: session.shop,
      analytics: data.analytics,
    });
  } catch (error) {
    console.error("Error loading analytics data:", error);
    throw new Response("Failed to load analytics data", { status: 500 });
  }
}
