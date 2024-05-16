import { ReactNode } from 'react';
import { Box, TapAreaLink } from 'gestalt';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen, DocType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import compressBehavior from '../../examples/taparealink/compressBehavior';
import heightWidth from '../../examples/taparealink/heightWidth';
import inlineUsage from '../../examples/taparealink/inlineUsage';
import localizationLabels from '../../examples/taparealink/localizationLabels';
import main from '../../examples/taparealink/main';
import mouseCursor from '../../examples/taparealink/mouseCursor';

export default function DocsPage({ generatedDocGen }: DocType) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="TapAreaLink example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection description="See [TapArea](/web/taparea)." name="Usage guidelines" />

      <LocalizationSection code={localizationLabels} name={generatedDocGen?.displayName} />

      <MainSection description="See [TapArea](/web/taparea) for more variants." name="Variants">
        <MainSection.Subsection title="Compress behavior">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={compressBehavior}
                layout="column"
                name="Compress Behavior Example"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Height & width">
          <MainSection.Card
            sandpackExample={<SandpackExample code={heightWidth} name="Height & Width Example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Inline usage">
          <MainSection.Card
            description={`While TapArea doesn't provide an \`inline\` prop, this behavior can be achieved by wrapping with \`<Box display="inlineBlock">\`.`}
            sandpackExample={<SandpackExample code={inlineUsage} name="Inline Usage Example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Mouse cursor">
          <MainSection.Card
            sandpackExample={<SandpackExample code={mouseCursor} name="Mouse cursor" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="In ordee to observe TapArea's border radius, focus on each component below navigating with the keyboard. `fullWidth={false}` might be required to wrap to the children component. Make the sure the children components match the rounding as well."
          title="Rounding"
        >
          <CombinationNew cardSize="xs" rounding={[0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle', 'pill']}>
            {({ rounding }) => (
              <TapAreaLink
                accessibilityLabel={`rounding: ${rounding}`}
                fullWidth={false}
                href="#"
                rounding={rounding}
              >
                <Box
                  alignItems="center"
                  borderStyle="lg"
                  display="flex"
                  height={70}
                  justifyContent="center"
                  rounding={rounding}
                  width={rounding === 'pill' ? 120 : 70}
                />
              </TapAreaLink>
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`TapAreaLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when TapAreaLink is clicked

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
  return {
    props: { generatedDocGen: await docGen('TapAreaLink') },
  };
}
