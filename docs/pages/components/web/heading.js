// @flow strict
import { type Node } from 'react';
import { Box, Text, Table, SlimBanner } from 'gestalt';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import Markdown from '../../../docs-components/Markdown.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import MainSection from '../../../docs-components/MainSection.js';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import Page from '../../../docs-components/Page.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Heading">
      <PageHeader
        name="Heading"
        description={generatedDocGen?.description}
        defaultCode="<Heading size={500}>An H2 Heading example</Heading>"
      />

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
- To emphasize text. Use [Text](/components/web/text) with a bold or italic [style](/components/web/text#Styles) instead
- To provide an overall Page title. Use [PageHeader](/components/web/pageheader) instead
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
            defaultCode={`
  <Flex gap={2} direction="column">
    <Text weight="bold" size="500">(H1) The creator code</Text>
    <Text size="200">(p) Pinterest is building a positive online space for creators. That’s why we made the Creator Code: A commitment to kindness for everyone on Pinterest. We expect everyone to follow these guidelines and lead with kindness when you create new content or interact with other people on Pinterest.</Text>
    <Text weight="bold" size="400">(H2) Be kind</Text>
    <Text weight="bold" size="300">(H3) Express yourself</Text>
    <Text size="200">(p) Great content should highlight you and your ideas. Put your original spin on something and don’t be afraid to let your own perspective shine. For example: Fashion inspiration to freshen up a wardrobe.</Text>
  </Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use to emphasize text that you want users to read. Use a message component like [SlimBanner](/slimbanner), or [bold text](/components/web/text#Styles). You can also emphasize numbers by using [text sizes](/components/web/text#Sizes)."
            defaultCode={`
<Flex gap={2} direction="column">
  <Text weight="bold" size="500">(H2) The creator code</Text>
  <Text size="200">(p) Pinterest is building a positive online space for creators. That’s why we made the Creator Code: A commitment to kindness for everyone on Pinterest. We expect everyone to follow these guidelines and lead with kindness when you create new content or interact with other people on Pinterest.</Text>
  <Text weight="bold" size="600">(H1) Be kind!</Text>
  <Text size="200">(p) Great content should highlight you and your ideas. Put your original spin on something and don’t be afraid to let your own perspective shine. For example: Fashion inspiration to freshen up a wardrobe.</Text>
  <Text weight="bold" size="300">(H4) Express yourself</Text>
</Flex>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep headings short and glanceable."
            defaultCode={`
  <Flex gap={2} direction="column">
    <Text weight="bold" size="200">Analytics overview</Text>
    <Text size="200">Organic and paid metrics changed over the last 30 days. This includes impressions, saves and outbound clicks.</Text>
  </Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use overly long headings. If headings are dynamically generated (like a 3rd party app name), lineClamp will work after 2 lines, but be mindful of unintended changes in meaning."
            defaultCode={`
<Flex gap={2} direction="column">
  <Text weight="bold" size="200">Analytics overview of organic and paid metrics changed over the past 30 days against the previous 30 days</Text>
  <Text size="200">This includes impressions, saves and outbound clicks.</Text>
</Flex>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Clearly describe the section a Heading refers to."
            defaultCode={`
 <ActivationCard
    dismissButton={{
      accessibilityLabel: 'Dismiss card',
      onDismiss: () => {},
    }}
    link={{
      href: "https://pinterest.com",
      label:"Claim your website now",
      accessibilityLabel: ""
    }}
    message="Grow distribution and track Pins linked to your website"
    status="notStarted"
    statusMessage="Not started"
    title="Claim your website"
  />
  `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use vague language that doesn’t describe the section that a Heading refers to."
            defaultCode={`
<ActivationCard
  dismissButton={{
    accessibilityLabel: 'Dismiss card',
    onDismiss: () => {},
  }}
  link={{
    href: "https://pinterest.com",
    label:"Get started",
    accessibilityLabel: ""
  }}
  message="Grow distribution and track Pins linked to your website"
  status="notStarted"
  statusMessage="Not started"
  title="Claim it!"
/>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Start-align headings to make it faster for users to read text from the point where they naturally start reading. The exceptions are headings related to integers in [Table](/components/web/table)."
            defaultCode={`
<Flex gap={4} direction="column">
  <Text weight="bold" size="500">Start a conversation</Text>
  <Text size="200">Great content should highlight you and your ideas. Put your original spin on something and don’t be afraid to let your own perspective shine. For example: Fashion inspiration to freshen up a wardrobe.</Text>
</Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Center-align headings as it can make it harder for users with dyslexia who need a consistent stating edge. Paired with left-aligned paragraph text, it can make the typographic structure feel off-center and unbalanced."
            defaultCode={`
<Flex gap={4} direction="column">
  <Text weight="bold" size="500" align="center">Start a conversation</Text>
  <Text size="200">Great content should highlight you and your ideas. Put your original spin on something and don’t be afraid to let your own perspective shine. For example: Fashion inspiration to freshen up a wardrobe.</Text>
</Flex>`}
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
          description={`These font sizes follow those available through our [Design Tokens](/foundationsdesign_tokens#Font-size). If your text does not need to be a [semantic heading (H1-H6)](/https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Text](/components/web/text) instead.
`}
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex gap={4} direction="column">
  <Heading size="100">Heading size 100</Heading>
  <span lang="ja">
    <Heading size="100">こんにちは</Heading>
  </span>

  <span>
    <Heading size="200">Heading size 200</Heading>
  </span>
  <span lang="ja">
    <Heading size="200">こんにちは</Heading>
  </span>

  <Heading size="300">Heading size 300</Heading>
  <span lang="ja">
    <Heading size="300">こんにちは</Heading>
  </span>

  <Heading size="400">Heading size 400</Heading>
  <span lang="ja">
    <Heading size="400">こんにちは</Heading>
  </span>

  <Heading size="500">Heading size 500</Heading>
  <span lang="ja">
    <Heading size="500">こんにちは</Heading>
  </span>

  <Heading size="600">Heading size 600</Heading>
  <span lang="ja">
    <Heading size="600">こんにちは</Heading>
  </span>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Color">
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={4}>
  <Box color="gray" padding={1}>
    <Heading color="inverse" size="500">
      Inverse
    </Heading>
  </Box>

  <Heading size="500">
    Default
  </Heading>

  <Heading color="subtle" size="500">
    Subtle
  </Heading>

  <Heading color="success" size="500">
    Success
  </Heading>

  <Heading color="error" size="500">
    Error
  </Heading>

  <Heading color="warning" size="500">
    Warning
  </Heading>

  <Heading color="shopping" size="500">
    Shopping
  </Heading>

  <Box color="primary" padding={1}>
    <Heading color="light" size="500">
      Light
    </Heading>
  </Box>

  <Box color="infoWeak" padding={1}>
    <Heading color="dark" size="500">
      Dark
    </Heading>
  </Box>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Overflow & truncation">
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex maxWidth={240} direction="column" gap={8}>
  <Flex direction="column" gap={2}>
    <Text>breakWord (default):</Text>
    <Box color="secondary" padding={2} rounding={2}>
      <Heading size="400" overflow="breakWord">
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      </Heading>
    </Box>
  </Flex>

  <Flex direction="column" gap={2}>
    <Text>normal:</Text>
    <Box color="secondary" padding={2} rounding={2}>
      <Heading size="400" overflow="normal">
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      </Heading>
    </Box>
  </Flex>

  <Flex direction="column" gap={2}>
  <Text>lineClamp:</Text>
    <Box color="secondary" padding={2} rounding={2}>
      <Heading size="400" lineClamp={2}>
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      </Heading>
    </Box>
  </Flex>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Alignment"
          description={`Use \`align\` to adjust the positioning of text within container elements`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={4}>
  <Heading align="start" size="400">Start-aligned heading (default)</Heading>
  <Divider />
  <Heading align="end" size="400">End-aligned heading</Heading>
  <Divider />
  <Heading align="center" size="400">Center-aligned heading</Heading>
  <Divider />
  <Heading align="justify" size="400">Justify-aligned heading</Heading>
  <Divider />
  <Heading align="forceLeft" size="400">Forced-left-aligned heading</Heading>
  <Divider />
  <Heading align="forceRight" size="400">Forced-right-aligned heading</Heading>
</Flex>
`}
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
            defaultCode={`
<Flex direction="column" gap={4}>
  <Heading size="500" accessibilityLevel={2}>
    Medium heading level 2
  </Heading>
  <Heading size="400" accessibilityLevel={3}>
    Small heading level 3
  </Heading>
  <Heading size="400" accessibilityLevel="none">
    Small heading without a level
  </Heading>
</Flex>
`}
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
      **[Text](/components/web/text)**
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
    props: { generatedDocGen: await docgen({ componentName: 'Heading' }) },
  };
}
