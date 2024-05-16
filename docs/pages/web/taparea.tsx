import {ReactNode} from 'react';
import { Box, TapArea } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
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
import accessibility from '../../examples/taparea/accessibility';
import compressBehavior from '../../examples/taparea/compressBehavior';
import fullSpace from '../../examples/taparea/fullSpace';
import heightWidth from '../../examples/taparea/heightWidth';
import inlineUsage from '../../examples/taparea/inlineUsage';
import main from '../../examples/taparea/main';
import mouseCursor from '../../examples/taparea/mouseCursor';
import withLinkButton from '../../examples/taparea/withLinkButton';

export default function DocsPage(
  {
    generatedDocGen,
  }: DocType,
) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="TapArea example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection title="ARIA attributes">
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={accessibility} name="ARIA attributes examples" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection title="Link/Button within TapArea">
          <MainSection.Card
            description={`If you have a \`Link\` or \`Button\` inside of TapArea, you can apply \`e.stopPropagation()\` so the \`onTap\` doesn't get triggered.

TapArea with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
  `}
            sandpackExample={
              <SandpackExample code={withLinkButton} name="With Link Button Example" />
            }
          />
        </MainSection.Subsection>

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
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={fullSpace} name="Full space with no children" />
            }
            title="Full space with no children"
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Inline usage">
          <MainSection.Card
            description={`While TapArea doesn't provide an \`inline\` prop, this behavior can be achieved by wrapping with \`<Box display="inlineBlock">\`.`}
            sandpackExample={<SandpackExample code={inlineUsage} name="Inline Usage Example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Change the cursor on TapArea for different click interactions"
          title="Mouse cursor"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={mouseCursor} hideEditor name="Mouse cursor" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="In ordee to observe TapArea's border radius, focus on each component below navigating with the keyboard. `fullWidth={false}` might be required to wrap to the children component. Make the sure the children components match the rounding as well."
          title="Rounding"
        >
          <CombinationNew cardSize="xs" rounding={[0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle', 'pill']}>
            {({ rounding }) => (
              <TapArea
                accessibilityLabel={`rounding: ${rounding}`}
                fullWidth={false}
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
              </TapArea>
            )}
          </CombinationNew>
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-ads-logging-extension#ads-logging-extension',
            text: 'Ads logging extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[TapAreaLink](/web/taparealink)**
Use TapAreaLink when a link is needed instead of an action.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen
  }
}> {
  return {
    props: { generatedDocGen: await docGen('TapArea') },
  };
}
