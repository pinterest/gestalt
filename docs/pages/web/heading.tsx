import { BannerSlim, Box, Table, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Markdown from '../../docs-components/Markdown';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import accessibilityLevelExample from '../../examples/heading/accessibilityLevelExample';
import alignmentExample from '../../examples/heading/alignmentExample';
import clearlyDescribeTheSection from '../../examples/heading/clearlyDescribeTheSection';
import colorsExample from '../../examples/heading/colorsExample';
import dontCenterAlign from '../../examples/heading/dontCenterAlign';
import dontOverlyLongHeadings from '../../examples/heading/dontOverlyLongHeadings';
import dontUseToEmphasizeText from '../../examples/heading/dontUseToEmphasizeText';
import dontUseVagueLanguage from '../../examples/heading/dontUseVagueLanguage';
import groupTextIntoSections from '../../examples/heading/groupTextIntoSections';
import keepHeadingShort from '../../examples/heading/keepHeadingShort';
import languageTokens from '../../examples/heading/languageTokens';
import mainExample from '../../examples/heading/mainExample';
import overflowAndTruncationExample from '../../examples/heading/overflowAndTruncationExample';
import startAlignHeadings from '../../examples/heading/startAlignHeadings';
import variantsExample from '../../examples/heading/variantsExample';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Use to help group text and items into sections in a logical order."
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description={`
- When you need to use a semantic H1–H6 heading to create a clear typographic hierarchy and page structure
`}
            type="do"
          />
          <MainSection.Card
            description={`
- To emphasize text. Use [Text](/web/text) with a bold or italic [style](/web/text#Styles) instead
- To provide an overall Page title. Use [PageHeader](/web/pageheader) instead
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use to help group text and items into sections in a logical order."
            sandpackExample={
              <SandpackExample
                code={groupTextIntoSections}
                hideEditor
                layout="column"
                name="Do - Use to help group text and items into sections in a logical order."
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use to emphasize text that you want users to read. Use a message component like [BannerSlim](/web/bannerslim), or [bold text](/web/text#Styles). You can also emphasize numbers by using [text sizes](/web/text#Sizes)."
            sandpackExample={
              <SandpackExample
                code={dontUseToEmphasizeText}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Use to emphasize text that you want users to read."
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Keep headings short and glanceable."
            sandpackExample={
              <SandpackExample
                code={keepHeadingShort}
                hideEditor
                layout="column"
                name="Do - Keep headings short and glanceable."
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use overly long headings. If headings are dynamically generated (like a 3rd party app name), lineClamp will work after 2 lines, but be mindful of unintended changes in meaning."
            sandpackExample={
              <SandpackExample
                code={dontOverlyLongHeadings}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Use overly long headings."
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Clearly describe the section a Heading refers to."
            sandpackExample={
              <SandpackExample
                code={clearlyDescribeTheSection}
                hideEditor
                layout="column"
                name="Do - Clearly describe the section a Heading refers to."
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use vague language that doesn’t describe the section that a Heading refers to."
            sandpackExample={
              <SandpackExample
                code={dontUseVagueLanguage}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Use vague language that doesn’t describe the section that a Heading refers to."
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Start-align headings to make it faster for users to read text from the point where they naturally start reading. The exceptions are headings related to integers in [Table](/web/table)."
            sandpackExample={
              <SandpackExample
                code={startAlignHeadings}
                hideEditor
                layout="column"
                name="Do - Start-align headings to make it faster for users to read text from the point where they naturally start reading."
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Center-align headings as it can make it harder for users with dyslexia who need a consistent stating edge. Paired with left-aligned paragraph text, it can make the typographic structure feel off-center and unbalanced."
            sandpackExample={
              <SandpackExample
                code={dontCenterAlign}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Center-align headings."
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <BannerSlim
          helperLink={{
            text: 'View Typography guidelines',
            accessibilityLabel: 'View Typography guidelines',
            href: '/foundations/typography',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Gestalt's typography guidelines contain additional best practices around sizing, style and hierarchy."
          type="info"
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
          description="A minimum text size of 16 px (12pt) is recommended for readability. Headings can go lower than that, but smaller sizes should be kept to a minimum. Making text brief will also help with readability."
          title="Accessible sizing"
        />
        <MainSection.Subsection
          description="For low-vision users, text color contrast is very important. To insure accessible contrast, stick to our [standard text colors](/foundations/color/usage#Standard-text-colors). See our [accessibility](/foundations/accessibility) page for design considerations and handy accessibility tools for checking color contrast."
          title="Accessible color"
        />
      </AccessibilitySection>

      <LocalizationSection
        code={languageTokens}
        layout="column"
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes="Keep text simple and short to avoid truncation or line wrapping when translating languages that require more characters."
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`These font sizes follow those available through our [Design Tokens](/foundations/design_tokens/overview#Font-size). If your text does not need to be a [semantic heading (H1-H6)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Text](/web/text) instead.
`}
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsExample}
                layout="column"
                name="Heading variants"
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
                code={colorsExample}
                layout="column"
                name="Colors example"
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
                code={overflowAndTruncationExample}
                layout="column"
                name="Overflow & truncation example"
                previewHeight={660}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Use \`align\` to adjust the positioning of text within container elements`}
          title="Alignment"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={alignmentExample} layout="column" name="Aligment example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
For accessibility purposes, we allow you to override the heading level.

For certain specific situations, it is possible to use Heading without an accessibility level; however, we recommend against using this if possible.`}
          title="Accessibility level"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={accessibilityLevelExample}
                layout="column"
                name="Accessibility level example"
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
            description={`
- Keep headings short and clear
- Use **Sentence case** for headings per our Pinterest writing standards to keep the tone conversational and make headings easier to scan`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Punctuate headings unless they are posing a question or making an exclamation
- Use **Title Case** or **ALL CAPS**`}
            type="don't"
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
      **[Typography guidelines](/foundations/typography)**
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Heading') },
  };
}
