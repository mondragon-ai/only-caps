// loaders/indexLoader.ts
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { SERVER_BASE_URL } from "~/lib/contants";
import { AnalyticsProps } from "~/lib/types/analytics";
import { MockupResponseType } from "~/lib/types/mockups";
import { authenticate } from "~/shopify.server";

/**
 * Loader function to authenticate and fetch shop data.
 * @param {LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} The response containing the shop data.
 */
export async function generatorLoader({ request }: LoaderFunctionArgs) {
  try {
    const admin = await authenticate.admin(request);
    return json({ shop: admin.session.shop });
  } catch (error) {
    console.error("Error during authentication:", error);
    throw new Response("Failed to authenticate", { status: 401 });
  }
}

/**
 * Action function to handle mockup creation.
 * @param {ActionFunctionArgs} args - The action function arguments.
 * @returns {Promise<Response>} The response containing the mockup data or error.
 */
export async function generatorAction({
  request,
}: ActionFunctionArgs): Promise<Response> {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;

  try {
    const formData = await request.formData();
    const mockup = formData.get("mockup");

    const response = await fetch(
      `${SERVER_BASE_URL}/generate/${shop}/mockups/${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: mockup,
      },
    );

    if (!response.ok) {
      return json(
        {
          shop,
          mockup: null,
          error: "Failed to generate mockup. Please check the image format.",
        },
        { status: 400 },
      );
    }

    const data = (await response.json()) as MockupResponseType;
    return json({ shop, mockup: data, error: null });
  } catch (error) {
    console.error("Error creating mockup:", error);
    return json(
      { shop, mockup: null, error: `Server Error: ${(error as any).message}` },
      { status: 500 },
    );
  }
}
