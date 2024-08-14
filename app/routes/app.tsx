import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { authenticate, USAGE_PLAN } from "../shopify.server";
import { SERVER_BASE_URL } from "~/lib/contants";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const admin = await authenticate.admin(request);

  const billingCheck = await admin.billing.require({
    plans: [USAGE_PLAN],
    isTest: true,
    onFailure: async () => admin.billing.request({ plan: USAGE_PLAN }),
  });

  const subscription = billingCheck.appSubscriptions[0];
  console.log(`Shop is on ${subscription.name} (id ${subscription.id})`);

  const response = await fetch(
    `${SERVER_BASE_URL}/store/${admin.session.shop}/install/${admin.session.accessToken}`,
    {
      method: "POST",
    },
  );

  // console.log(response);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        {/* <Link to="/app/settings">Settings</Link> */}
        <Link to="/app/orders">Orders</Link>
        <Link to="/app/mockups">Mockups</Link>
        <Link to="/app/catalog">Catalog</Link>
        <Link to="/app/analytics">Analytics</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
