import {
  Card,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
} from "@shopify/polaris";

export function LoadingSkeleton() {
  return (
    <SkeletonPage title="Loading mockup details...">
      <Layout>
        <Layout.Section>
          <Card>
            <SkeletonDisplayText size="large" />
            <SkeletonBodyText />
          </Card>
          <Card>
            <SkeletonDisplayText size="large" />
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <SkeletonDisplayText size="large" />
            <SkeletonBodyText />
          </Card>
          <Card>
            <SkeletonDisplayText size="large" />
            <SkeletonBodyText />
          </Card>
          <Card>
            <SkeletonDisplayText size="large" />
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
