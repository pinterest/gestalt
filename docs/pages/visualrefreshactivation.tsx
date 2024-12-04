import { Fragment } from 'react';
import { BannerSlimExperiment } from '../docs-components/BannerSlimExperiment';
import Page from '../docs-components/Page';
import PageHeader from '../docs-components/PageHeader';

export default function DesignTokensPage() {
  return (
    <Page hideEditLink hideSideNav title="Visual refresh experimentation">
      <PageHeader
        bannerSlimExperiment={
          <Fragment>
            <BannerSlimExperiment
              componentName="VR1"
              description="enable a visual refresh in Gestalt. Typography and icons are also under the experiment"
              pullRequest={3616}
            />
            <BannerSlimExperiment
              componentName="Tokens"
              description="enable a visual refresh in Gestalt. Typography and icons are also under the experiment"
              pullRequest={3616}
            />
          </Fragment>
        }
        name="Visual refresh experimentation"
        type="guidelines"
      />
    </Page>
  );
}
