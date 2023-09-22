// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner, TapArea } from 'gestalt';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen, type DocType } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import compressBehavior from '../../examples/taparealink/compressBehavior.js';
import heightWidth from '../../examples/taparealink/heightWidth.js';
import inlineUsage from '../../examples/taparealink/inlineUsage.js';
import main from '../../examples/taparealink/main.js';
import mouseCursor from '../../examples/taparealink/mouseCursor.js';

export default function DocsPage({ generatedDocGen }: DocType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="TapAreaLink example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Localization" description="Localize the accessibilityLabel.">
        <SlimBanner
          iconAccessibilityLabel="Localize the default label"
          message="TapAreas with link role announce to assistive technologies that the link opens in a new tab when setting target to 'blank'. Localize the default label with DefaultLabelProvider."
          type="recommendationBare"
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about DefaultLabelProvider',
            href: '/web/utilities/defaultlabelprovider',
            onClick: () => {},
          }}
        />
      </MainSection>

      <MainSection name="Usage guidelines" description="See [TapArea](/web/taparea)." />

      <MainSection name="Variants" description="See [TapArea](/web/taparea) for more variants.">
        <MainSection.Subsection title="Compress behavior">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Compress Behavior Example"
                code={compressBehavior}
                layout="column"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Height & width">
          <MainSection.Card
            sandpackExample={<SandpackExample name="Height & Width Example" code={heightWidth} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Inline usage">
          <MainSection.Card
            description={`While TapArea doesn't provide an \`inline\` prop, this behavior can be achieved by wrapping with \`<Box display="inlineBlock">\`.`}
            sandpackExample={<SandpackExample name="Inline Usage Example" code={inlineUsage} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Mouse cursor">
          <MainSection.Card
            sandpackExample={<SandpackExample name="Mouse cursor" code={mouseCursor} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Rounding"
          description="In ordee to observe TapArea's border radius, focus on each component below navigating with the keyboard. `fullWidth={false}` might be required to wrap to the children component. Make the sure the children components match the rounding as well."
        >
          <CombinationNew cardSize="xs" rounding={[0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle', 'pill']}>
            {({ rounding }) => (
              <TapArea rounding={rounding} fullWidth={false}>
                <Box
                  borderStyle="lg"
                  width={rounding === 'pill' ? 120 : 70}
                  height={70}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  rounding={rounding}
                />
              </TapArea>
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          title="External handlers"
          description={`TapAreaLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when TapAreaLink is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
        />
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('TapAreaLink') },
  };
}
