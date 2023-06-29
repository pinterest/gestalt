// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner, Table, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Markdown from '../../docs-components/Markdown.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibilityLevelExample from '../../examples/heading/accessibilityLevelExample.js';
import alignmentExample from '../../examples/heading/alignmentExample.js';
import clearlyDescribeTheSection from '../../examples/heading/clearlyDescribeTheSection.js';
import colorsExample from '../../examples/heading/colorsExample.js';
import dontCenterAlign from '../../examples/heading/dontCenterAlign.js';
import dontOverlyLongHeadings from '../../examples/heading/dontOverlyLongHeadings.js';
import dontUseToEmphasizeText from '../../examples/heading/dontUseToEmphasizeText.js';
import dontUseVagueLanguage from '../../examples/heading/dontUseVagueLanguage.js';
import groupTextIntoSections from '../../examples/heading/groupTextIntoSections.js';
import keepHeadingShort from '../../examples/heading/keepHeadingShort.js';
import mainExample from '../../examples/heading/mainExample.js';
import overflowAndTruncationExample from '../../examples/heading/overflowAndTruncationExample.js';
import startAlignHeadings from '../../examples/heading/startAlignHeadings.js';
import variantsExample from '../../examples/heading/variantsExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          name="Use to help group text and items into sections in a logical order."
          code={mainExample}
          layout="column"
          hideEditor
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description={`
- When you need to use a semantic H1–H6 heading to create a clear typographic hierarchy and page structure
`}
          />
          <MainSection.Card
            type="don't"
            description={`
- To emphasize text. Use [Text](/web/text) with a bold or italic [style](/web/text#Styles) instead
- To provide an overall Page title. Use [PageHeader](/web/pageheader) instead
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use to help group text and items into sections in a logical order."
            sandpackExample={
              <SandpackExample
                name="Do - Use to help group text and items into sections in a logical order."
                code={groupTextIntoSections}
                hideEditor
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use to emphasize text that you want users to read. Use a message component like [SlimBanner](/web/slimbanner), or [bold text](/web/text#Styles). You can also emphasize numbers by using [text sizes](/web/text#Sizes)."
            sandpackExample={
              <SandpackExample
                name="Don't - Use to emphasize text that you want users to read."
                code={dontUseToEmphasizeText}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep headings short and glanceable."
            sandpackExample={
              <SandpackExample
                name="Do - Keep headings short and glanceable."
                code={keepHeadingShort}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use overly long headings. If headings are dynamically generated (like a 3rd party app name), lineClamp will work after 2 lines, but be mindful of unintended changes in meaning."
            sandpackExample={
              <SandpackExample
                name="Don't - Use overly long headings."
                code={dontOverlyLongHeadings}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Clearly describe the section a Heading refers to."
            sandpackExample={
              <SandpackExample
                name="Do - Clearly describe the section a Heading refers to."
                code={clearlyDescribeTheSection}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use vague language that doesn’t describe the section that a Heading refers to."
            sandpackExample={
              <SandpackExample
                name="Don't - Use vague language that doesn’t describe the section that a Heading refers to."
                code={dontUseVagueLanguage}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Start-align headings to make it faster for users to read text from the point where they naturally start reading. The exceptions are headings related to integers in [Table](/web/table)."
            sandpackExample={
              <SandpackExample
                name="Do - Start-align headings to make it faster for users to read text from the point where they naturally start reading."
                code={startAlignHeadings}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Center-align headings as it can make it harder for users with dyslexia who need a consistent stating edge. Paired with left-aligned paragraph text, it can make the typographic structure feel off-center and unbalanced."
            sandpackExample={
              <SandpackExample
                name="Don't - Center-align headings."
                code={dontCenterAlign}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <SlimBanner
          type="info"
          iconAccessibilityLabel="Info"
          message="Gestalt's typography guidelines contain additional best practices around sizing, style and hierarchy."
          helperLink={{
            text: 'View Typography guidelines',
            accessibilityLabel: 'View Typography guidelines',
            href: '/foundations/typography/guidelines',
            onClick: () => {},
          }}
        />
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection title="Logical order">
          <Markdown text="Users will find a logical heading order and structure very helpful, especially if they have difficulty with reading and language, or if they use assistive devices such as a screen reader. A clear structure will help a screen reader user navigate the app without getting confused. Our headings default to a heading level based on size. For example:" />
          <Box maxWidth={360}>
            <Table accessibilityLabel="Heading order">
              <Table.Header>
                <Table.Row>
                  {['Level', 'Size'].map((item) => (
                    <Table.HeaderCell key={item}>
                      <Text size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  {['H1', '600'].map((item) => (
                    <Table.Cell key={item}>
                      <Text size="200">{item}</Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  {['H2', '500'].map((item) => (
                    <Table.Cell key={item}>
                      <Text size="200">{item}</Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  {['H3', '400'].map((item) => (
                    <Table.Cell key={item}>
                      <Text size="200">{item}</Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  {['H4', '300'].map((item) => (
                    <Table.Cell key={item}>
                      <Text size="200">{item}</Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  {['H5', '200'].map((item) => (
                    <Table.Cell key={item}>
                      <Text size="200">{item}</Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
                <Table.Row>
                  {['H6', '100'].map((item) => (
                    <Table.Cell key={item}>
                      <Text size="200">{item}</Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>

          <Markdown
            text={`In some cases, you may need to start a section with a smaller heading size, but keep an H2 structure. An example is a section heading for a card or sidebar. Use the \`accessibilityLevel\` prop to override the default heading level and set the appropriate level.`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Accessible sizing"
          description="A minimum text size of 16 px (12pt) is recommended for readability. Headings can go lower than that, but smaller sizes should be kept to a minimum. Making text brief will also help with readability."
        />
        <MainSection.Subsection
          title="Accessible color"
          description="For low-vision users, text color contrast is very important. To insure accessible contrast, stick to our [standard text colors](/foundations/color/usage#Standard-text-colors). See our [accessibility](/foundations/accessibility) page for design considerations and handy accessibility tools for checking color contrast."
        />
      </AccessibilitySection>
      <MainSection name="Localization">
        <MainSection.Subsection description="Keep text simple and short to avoid truncation or line wrapping in UI controls like buttons when translating languages that require more characters. Avoid overriding our line-height settings, as this can result in text clipping for scripts, like Hindi, that have taller ascenders and descenders." />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`These font sizes follow those available through our [Design Tokens](/foundations/design_tokens#Font-size). If your text does not need to be a [semantic heading (H1-H6)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Text](/web/text) instead.
`}
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Heading variants"
                code={variantsExample}
                layout="column"
                previewHeight={560}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Color">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Colors example"
                code={colorsExample}
                layout="column"
                previewHeight={520}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Overflow & truncation">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Overflow & truncation example"
                code={overflowAndTruncationExample}
                layout="column"
                previewHeight={660}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Alignment"
          description={`Use \`align\` to adjust the positioning of text within container elements`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Aligment example" code={alignmentExample} layout="column" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Accessibility level"
          description={`
For accessibility purposes, we allow you to override the heading level.

For certain specific situations, it is possible to use Heading without an accessibility level; however, we recommend against using this if possible.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Accessibility level example"
                code={accessibilityLevelExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Keep headings short and clear
- Use **Sentence case** for headings per our Pinterest writing standards to keep the tone conversational and make headings easier to scan`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Punctuate headings unless they are posing a question or making an exclamation
- Use **Title Case** or **ALL CAPS**`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Text](/web/text)**
      A component to use for all text on a page or in UI components.
`}
        />
        <MainSection.Subsection
          description={`
      **[Typography guidelines](/foundations/typography/guidelines)**
      A run-down on our typographic foundations, with some guidelines for using Heading and Text components together in products.
`}
        />
        <MainSection.Subsection
          description={`
      **[Design tokens](/foundations/design_tokens)**
      Values for text sizes, weights, families and colors.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Heading') },
  };
}
