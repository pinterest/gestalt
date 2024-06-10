import { BannerSlimExperiment } from '../docs-components/BannerSlimExperiment';
import Page from '../docs-components/Page';
import PageHeader from '../docs-components/PageHeader';

export default function DesignTokensPage() {
  return (
    <Page hideEditLink hideSideNav title="Visual refresh experimentation">
      <PageHeader
        bannerSlimExperiment={
          <BannerSlimExperiment
            componentName="Tokens"
            description="enable a visual refresh in Gestalt. Typography and icons are also under the experiment"
            pullRequest={3616}
          />
        }
        name="Visual refresh experimentation"
        type="guidelines"
      />
    </Page>
  );
}
