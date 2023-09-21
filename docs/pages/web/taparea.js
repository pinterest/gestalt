// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner, TapArea, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Combination from '../../docs-components/Combination.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibilityLabelExample from '../../examples/taparea/accessibilityLabelExample.js';
import heightWidthExample from '../../examples/taparea/heightWidthExample.js';
import inlineUsageExample from '../../examples/taparea/inlineUsageExample.js';
import mainExample from '../../examples/taparea/mainExample.js';
import rolesCompressBehaviorExample from '../../examples/taparea/rolesCompressBehaviorExample.js';
import withLinkButtonExample from '../../examples/taparea/withLinkButtonExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={mainExample} name="Main TapAreaLink example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection title="ARIA attributes">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Accessibility: Label, Controls, Expanded, & Popup Example"
                code={accessibilityLabelExample}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Localization">
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

      <MainSection name="Variants">
        <MainSection.Subsection title="Basic TapArea">
          <MainSection.Card
            sandpackExample={<SandpackExample name="Main Example" code={mainExample} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="TapArea with Link/Button">
          <MainSection.Card
            description={`If you have a \`Link\` or \`Button\` inside of TapArea, you can apply \`e.stopPropagation()\` so the \`onTap\` doesn't get triggered.

TapArea with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
  `}
            sandpackExample={
              <SandpackExample name="With Link Button Example" code={withLinkButtonExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Roles & compress behavior">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Roles & Compress Behavior Example"
                code={rolesCompressBehaviorExample}
                layout="column"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Height & width">
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Height & Width Example" code={heightWidthExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Inline usage">
          <MainSection.Card
            description={`While TapArea doesn't provide an \`inline\` prop, this behavior can be achieved by wrapping with \`<Box display="inlineBlock">\`.`}
            sandpackExample={
              <SandpackExample name="Inline Usage Example" code={inlineUsageExample} />
            }
          />
        </MainSection.Subsection>

        <Combination
          id="mouseCursor"
          name="Mouse cursor"
          mouseCursor={[
            'copy',
            'grab',
            'grabbing',
            'move',
            'noDrop',
            'pointer',
            'zoomIn',
            'zoomOut',
          ]}
        >
          {(props, i) => (
            <TapArea id={`example-${i}`} {...props}>
              <Box borderStyle="lg" padding={3} color="default">
                {/* eslint-disable-next-line react/prop-types */}
                <Text>{props.mouseCursor}</Text>
              </Box>
            </TapArea>
          )}
        </Combination>

        <Combination
          id="rounding"
          name="Rounding"
          rounding={[0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle', 'pill']}
        >
          {(props, i) => (
            <TapArea id={`example-${i}`} {...props}>
              <Box
                color="default"
                borderStyle="lg"
                // eslint-disable-next-line react/prop-types
                width={props.rounding === 'pill' ? 120 : 70}
                height={70}
                display="flex"
                alignItems="center"
                justifyContent="center"
                {...props}
              >
                {/* eslint-disable-next-line react/prop-types */}
                <Text>{props.rounding}</Text>
              </Box>
            </TapArea>
          )}
        </Combination>

        <MainSection.Subsection
          title="External handlers"
          description={`TapArea consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when TapArea role="link" is clicked

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
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('TapArea') },
  };
}
