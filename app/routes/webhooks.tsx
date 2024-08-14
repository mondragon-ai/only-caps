import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { SERVER_BASE_URL } from "~/lib/contants";

export const action = async ({ request }: ActionFunctionArgs) => {
  const webhook = await authenticate.webhook(request);

  if (!webhook.admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  // The topics handled here should be declared in the shopify.app.toml.
  // More info: https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration
  switch (webhook.topic) {
    case "APP_UNINSTALLED":
      if (webhook.session) {
        await db.session.deleteMany({ where: { shop: webhook.shop } });
      }

      break;
    case "APP_SUBSCRIPTIONS_UPDATE": {
      if (webhook.session) {
        console.log(webhook.webhookId);
        console.log(webhook.payload);
        console.log(webhook.session);
        const payload = webhook.payload as SubscriptionObject;
        const { status, capped_amount } = payload.app_subscription;
        const response = await fetch(
          `${SERVER_BASE_URL}/store/${webhook.session.shop}/billing`,
          {
            method: "PUT",
            body: JSON.stringify({
              payent_status: status,
              capped_limit: capped_amount,
            }),
          },
        );
        console.log({ response });
      }

      break;
    }
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
