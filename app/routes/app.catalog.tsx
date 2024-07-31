import { Layout, Page, Text } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { CatalogCard } from "~/components/mockups/CatalogCard";
import { HatData, MockupTypeList } from "~/lib/data/mockups";
import { MockupTypes } from "~/lib/types/mockups";

export default function GeneratorPage() {
  return (
    <Page title={`Catalog`} subtitle={"Select a style and start creating"}>
      <Layout>
        {MockupTypeList.map((t) => (
          <Layout.Section key={t}>
            <CatalogCard type={t as MockupTypes} />
          </Layout.Section>
        ))}
        <Layout.Section>
          <Footer />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
