// @flow strict
import { type Node } from 'react';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import MainSection from '../../docs-components/MainSection.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/infobutton/main.js';
import endGuideElement from '../../examples/infobutton/endGuideElement.js';
import intermixedBlocks from '../../examples/infobutton/intermixedBlocks.js';

type DocsType = {|
  generatedDocGen: DocGen,
|};

export default function DocsPage({ generatedDocGen }: DocsType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <Example
          id="no-final-version"
          description="Example to component validation"
          name="IconButton"
          defaultCode={`
<Flex height="100%" justifyContent="center" alignItems="center">
  <InfoButton
    text="Informational context that's displayed on hover"
    accessibilityLabel="Popover context description"
  />
</Flex>
`}
        />
        <SandpackExample code={main} name="Main example" hideEditor />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- To offer simple, bit-sized information about an element or section on the screen.
- To provide a non-critical information or links to information about an element on the screen.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- To provide help/guidance for anything that's longer than a sentence. Use SlimBanner instead.
- To share important and/or time-sensitive information to a user. Use Callout or SlimBanner instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <Example
            id="no-final-version-do"
            description="Example to component validation - DO"
            name="IconButton"
            defaultCode={`
<Flex height="100%" justifyContent="center" alignItems="center" gap={{ row: 1, column: 1 }}>
  <Text>This is a Gestalt</Text>
  <InfoButton
    text="Is Pinterest's design system"
    accessibilityLabel="Gestalt meaning description"
  />
</Flex>
`}
          />
          <Example
            id="no-final-version-dont"
            description="Example to component validation - DONT"
            name="IconButton"
            defaultCode={`
<Flex height="100%" justifyContent="center" alignItems="center" gap={{ row: 1, column: 1 }}>
  <Text>This is a Gestalt</Text>
  <InfoButton
    text="Is Pinterest's design system"
    accessibilityLabel="Gestalt meaning description"
  />
  <Text>don't do best practices</Text>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place InfoButton to the end of the element you wish to add guidance to."
            sandpackExample={
              <SandpackExample code={endGuideElement} name="End of guide element" hideEditor />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Do not intermix InfoButton within blocks of content"
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
        <MainSection.Subsection description="To Do" />
      </MainSection>
      <MainSection name="Localization">
        <MainSection.Subsection description="Be sure to localize any text elements within InfoButton. Note that localization can lengthen text by 20 to 30 percent." />
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Tooltip](/web/tooltip)**
Tooltip describes the function of an interactive element, typically IconButton, on hover. However, adding links, buttons or any clickable element within Tooltip is not advisable due to accessibility concerns.

**[Popover](/web/popover)**
Popover displays a lightweight task related to the content on screen. Popover is less purpose-built than InfoButton and thus would be an ideal candidate for more general needs to reveal content upon interacting with an element.

**[Link](/web/link)**
Link is mainly used as navigational element and usually appear within or directly following a paragraph or sentence.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: DocsType |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'InfoButton' }) },
  };
}
