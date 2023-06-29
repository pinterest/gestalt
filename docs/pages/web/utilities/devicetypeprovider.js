// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import docGen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import implementation from '../../../examples/devicetypeprovider/implementation.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        type="utility"
      />

      <SlimBanner
        type="info"
        iconAccessibilityLabel="Recommendation"
        message="Gestalt components that require DeviceTypeProvider to enable their mobile user interfaces have a Mobile variant section in their documentation page. Check each example to learn more about their particular implementations."
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection
        name="Implementation"
        description={`Gestalt components can have different interfaces depending on the user's device. We currently support "desktop" and "mobile".

Components default to a responsive "desktop" UI. DeviceTypeProvider is required to enable mobile-specific variants where available.

This provider should be implemented at the top level of your app. Any additional nested DeviceTypeProviders will override the top-level configuration.

While device detection can (for now) be performed using the [user-agent string](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent), this is [not generally recommended](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent). Thankfully, there are [better solutions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#avoiding_user_agent_detection)!

The example shows a component with different desktop and mobile UIs.`}
      >
        <MainSection.Card
          sandpackExample={
            <SandpackExample
              code={implementation}
              name="Implementation example"
              previewHeight={500}
              layout="column"
            />
          }
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docGen('DeviceTypeProvider'),
    },
  };
}
