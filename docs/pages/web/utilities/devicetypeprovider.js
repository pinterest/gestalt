// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim } from 'gestalt';
import docGen, { type DocGen } from '../../../docs-components/docgen';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../../docs-components/InternalDocumentationSection';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import implementation from '../../../examples/devicetypeprovider/implementation';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        type="utility"
      />

      <BannerSlim
        iconAccessibilityLabel="Recommendation"
        message="Gestalt components that require DeviceTypeProvider to enable their mobile user interfaces have a Mobile variant section in their documentation page. Check each example to learn more about their particular implementations."
        type="info"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection
        description={`Gestalt components can have different interfaces depending on the user's device. We currently support "desktop" and "mobile".

Components default to a responsive "desktop" UI. DeviceTypeProvider is required to enable mobile-specific variants where available.

This provider should be implemented at the top level of your app. Any additional nested DeviceTypeProviders will override the top-level configuration.

While device detection can (for now) be performed using the [user-agent string](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent), this is [not generally recommended](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent). Thankfully, there are [better solutions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#avoiding_user_agent_detection)!

The example shows a component with different desktop and mobile UIs.`}
        name="Implementation"
      >
        <MainSection.Card
          sandpackExample={
            <SandpackExample
              code={implementation}
              layout="column"
              name="Implementation example"
              previewHeight={500}
            />
          }
        />
      </MainSection>

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-providers#devicetypeprovider',
            text: 'Gestalt Providers in Pinboard',
          },
        ]}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: {
      generatedDocGen: await docGen('DeviceTypeProvider'),
    },
  };
}
