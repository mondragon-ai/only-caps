import {
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
} from "@shopify/polaris";

export function LoadingSkeleton() {
  return (
    <SkeletonPage primaryAction title="Welcome Back, loading">
      <Layout>
        <Layout.Section>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </Layout.Section>
        <Layout.Section>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </Layout.Section>
        <Layout.Section>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
