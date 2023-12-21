// @flow strict
import { type Node as ReactNode } from 'react';
import { Icon, SlimBanner } from 'gestalt';
import docGen, { type DocGen, type DocType, overrideTypes } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import localizationLabels from '../../examples/iconbuttonlink/localizationLabels';
import main from '../../examples/iconbuttonlink/main';

export default function DocsPage({ generatedDocGen }: DocType): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        packageFileLocation={generatedDocGen?.packageFileLocation}
        description={generatedDocGen?.description}
        pdocsLink
        slimBanner={
          <SlimBanner
            type="info"
            iconAccessibilityLabel="Info"
            message="Complete documentation for IconButtonLink coming soon."
            helperLink={{
              text: 'See IconButton documentation page',
              accessibilityLabel: 'View IconButton documentation page',
              href: '/web/iconbutton',
              onClick: () => {},
            }}
          />
        }
      >
        <SandpackExample code={main} name="Main IconButtonLink example" hideEditor />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection
        name="Usage guidelines"
        description="See [IconButton](/web/iconbutton) for usage guidelines."
      />

      <LocalizationSection name={generatedDocGen?.displayName} code={localizationLabels} />

      <MainSection
        name="Variants"
        description="See [IconButton](/web/iconbutton) for more variants."
      >
        <MainSection.Subsection
          title="External handlers"
          description={`IconButtonLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when IconButtonLink is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/link-navigation',
            text: 'Link navigation',
          },
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-ads-logging-extension#ads-logging-extension',
            text: 'Ads logging extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)**
GlobalEventsHandlerProvider allows external link navigation control across all children components with link behavior.
See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  const generatedDocGen = await docGen('IconButtonLink');
  const overriddenDocGen = overrideTypes(generatedDocGen, {
    icon: (Icon?.icons ?? []).map((icon) => `'${icon}'`).join(' | '),
  });

  return {
    props: { generatedDocGen: overriddenDocGen },
  };
}
