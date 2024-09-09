import { Layout, Page } from "@shopify/polaris";
import { VideoCard } from "~/components/home";
import { Footer } from "~/components/layout/Footer";
import { CatalogCard } from "~/components/mockups/CatalogCard";
import { MockupTypeList } from "~/lib/data/mockups";
import { MockupTypes } from "~/lib/types/mockups";

export default function GeneratorPage() {
  return (
    <Page title={`Catalog`} subtitle={"Select a style and start creating"}>
      <Layout>
        {MockupTypeList.map((t, i) => {
          if (i == 2) {
            return (
              <>
                <Layout.Section key={t}>
                  <VideoCard
                    url={
                      "https://player.vimeo.com/video/1007707240?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    }
                  />
                </Layout.Section>
                <Layout.Section key={t}>
                  <CatalogCard type={t as MockupTypes} />
                </Layout.Section>
              </>
            );
          }
          return (
            <Layout.Section key={t}>
              <CatalogCard type={t as MockupTypes} />
            </Layout.Section>
          );
        })}
        <Layout.Section>
          <Footer />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
