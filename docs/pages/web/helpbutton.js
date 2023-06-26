// @flow strict
import { type Node } from 'react';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import endGuideElement from '../../examples/helpbutton/endGuideElement.js';
import intermixedBlocks from '../../examples/helpbutton/intermixedBlocks.js';
import main from '../../examples/helpbutton/main.js';
import withLink from '../../examples/helpbutton/withLink.js';
import withText from '../../examples/helpbutton/withText.js';

type DocsType = {|
  generatedDocGen: DocGen,
|};

export default function DocsPage({ generatedDocGen }: DocsType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            title="When to use"
            description={`
- To offer simple, bite-sized assistive information about an element or section on the screen.
- To provide information or links to information that enhances a user's understanding of the feature.
        `}
          />

          <MainSection.Card
            cardSize="sm"
            type="don't"
            title="When not to use"
            description={`
- To provide extensive information that is longer than a short sentence. Use [SlimBanner](/web/slimbanner) instead.
- To display recommendations for how to improve a user's experience. Use [SlimBanner](/web/slimbanner) instead.
- To display time-sensitive information to a user. Use [Callout](/web/callout) or [SlimBanner](/web/slimbanner) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Place HelpButton to the end of the element you wish to add guidance to."
            sandpackExample={
              <SandpackExample code={endGuideElement} name="End of guide element" hideEditor />
            }
          />

          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Include HelpButton within blocks of content."
            sandpackExample={
              <SandpackExample
                code={intermixedBlocks}
                name="Intermixed guide element blocks"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection
          description={`HelpButton's tooltip text is \`static\`, defined as \`Click to learn more\`. Use the required \`accessibilityLabel\` prop to give the user more details, using the format "Click to learn more about {the associated element}". \`accessibilityPopoverLabel\` should be similar, but using the format "Expanded information about {the associated element}".`}
        />
      </MainSection>

      <MainSection name="Localization">
        <MainSection.Subsection description="Be sure to localize `text`, `accessibilityLabel`, `accessibilityPopoverLabel`, `link.text` and `link.accessibilityLabel` within HelpButton. Note that localization can lengthen text by 20 to 30 percent." />
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Link"
          description="HelpButton's popover content can contain a link to additional information. If needed, this interaction can be paired with [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)."
        >
          <MainSection.Card
            cardSize="sm"
            sandpackExample={<SandpackExample code={withLink} name="Link component" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Text"
          description="The `text` prop accepts either a string or [Text](/web/text). Use a string for simple text without any visual style. HelpButton will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional [Text](/web/text) or [Link](/web/link) components contained within."
        >
          <MainSection.Card
            cardSize="sm"
            sandpackExample={<SandpackExample code={withText} name="Text component" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Tooltip](/web/tooltip)**
Tooltip describes the function of an interactive element, typically [IconButton](/web/iconbutton), on hover. However, adding links, buttons or any clickable element within Tooltip is not advisable due to accessibility concerns. Adding Tooltip to HelpButton is not necessary as it's already built in.

**[IconButton](/web/iconbutton)**
HelpButton is a more specific component than IconButton. IconButton is preferable for more general uses of interactive icons whereas HelpButton is the preferred solution for providing short-form guidance for an element.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: DocsType |}> {
  return {
    props: { generatedDocGen: await docGen('HelpButton') },
  };
}
