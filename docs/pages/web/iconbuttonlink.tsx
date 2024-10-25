import focusOnDarkBackground from 'docs/examples/iconbuttonlink/focusOnDarkBackground';
import { BannerSlim, Icon } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen, DocType, overrideTypes } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import active from '../../examples/iconbuttonlink/active';
import disabled from '../../examples/iconbuttonlink/disabled';
import enabled from '../../examples/iconbuttonlink/enabled';
import localizationLabels from '../../examples/iconbuttonlink/localizationLabels';
import main from '../../examples/iconbuttonlink/main';

export default function DocsPage({ generatedDocGen }: DocType) {
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

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`IconButtonLink has an "active" state that visually identifies it. To set them to "active" set 'active="page"' (page redirect) or 'active="section"'. Use routing hooks from React.Router or other frameworks to identify the current route. For example, if the current pathname matches the IconButtonLink href, set IconButtonLink to "page". Use the example below as a reference.`}
          title="Active state"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={active} name="Active" />} />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection code={localizationLabels} name={generatedDocGen?.displayName} />

      <MainSection
        description="See [IconButton](/web/iconbutton) for more variants."
        name="Variants"
      >
        <MainSection.Subsection
          description={`IconButton's appearance can be modified by the following states:

1. \`enabled\`
2. \`active\`
3. \`disabled\`
    Disabled state, used to indicate that the button is not currently available for interaction.
`}
          title="States"
        >
          <SandpackExample code={enabled} name="Enabled state example" />
          <SandpackExample code={active} name="Selected state example" />
          <SandpackExample code={disabled} name="Disabled state example" />
        </MainSection.Subsection>
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
        <MainSection.Subsection
          description={`IconButtonLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when IconButtonLink is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
          title="External handlers"
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
