// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        type="utility"
        badge="deprecated"
        slimBanner={
          <SlimBanner
            type="error"
            iconAccessibilityLabel="Info"
            message="OnLinkNavigationProvider is soon to be deprecated, use GlobalEventsHandlerProvider's `linkHandlers.onNavigation` instead."
            helperLink={{
              text: 'View GlobalEventsHandlerProvider',
              accessibilityLabel: 'View GlobalEventsHandlerProvider documentation',
              href: '/web/utilities/globaleventshandlerprovider#Link-handlers',
              onClick: () => {},
            }}
          />
        }
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'OnLinkNavigationProvider',
      }),
    },
  };
}
