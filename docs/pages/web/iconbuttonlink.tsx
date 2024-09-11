import focusOnDarkBackground from 'docs/examples/iconbuttonlink/focusOnDarkBackground';
import { BannerSlim, Icon, useDangerouslyInGestaltExperiment } from 'gestalt';
import docGen, { DocGen, DocType, overrideTypes } from '../../docs-components/docgen';
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

export default function DocsPage({ generatedDocGen }: DocType) {
  const isInExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        bannerSlim={
          <BannerSlim
            helperLink={{
              text: 'See IconButton documentation page',
              accessibilityLabel: 'View IconButton documentation page',
              href: '/web/iconbutton',
              onClick: () => {},
            }}
            iconAccessibilityLabel="Info"
            message="Complete documentation for IconButtonLink coming soon."
            type="info"
          />
        }
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="Main IconButtonLink example" />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection
        description="See [IconButton](/web/iconbutton) for usage guidelines."
        name="Usage guidelines"
      />

      <LocalizationSection code={localizationLabels} name={generatedDocGen?.displayName} />

      <MainSection
        description="See [IconButton](/web/iconbutton) for more variants."
        name="Variants"
      >
        <MainSection.Subsection
          description={`IconButtonLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when IconButtonLink is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
          title="External handlers"
        />
        {isInExperiment && (
          <MainSection.Subsection title="Focus ring on dark backgrounds">
            <MainSection.Card
              cardSize="lg"
              description="IconButtonLink can be used on dark backgrounds. The focus ring is visible on dark backgrounds to ensure accessibility."
              sandpackExample={
                <SandpackExample
                  code={focusOnDarkBackground}
                  name="Usage of focus ring on dark backgrounds"
                />
              }
            />
          </MainSection.Subsection>
        )}
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
  props: {
    generatedDocGen: DocGen;
  };
}> {
  const generatedDocGen = await docGen('IconButtonLink');
  const overriddenDocGen = overrideTypes(generatedDocGen, {
    icon: (Icon?.icons ?? []).map((icon) => `'${icon}'`).join(' | '),
  });

  return {
    props: { generatedDocGen: overriddenDocGen },
  };
}
