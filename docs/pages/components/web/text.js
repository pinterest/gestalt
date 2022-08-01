// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import PageHeader from '../../../docs-components/PageHeader.js';
import Page from '../../../docs-components/Page.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import MainSection from '../../../docs-components/MainSection.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';

export default function TextPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`<Flex direction="column" gap={4}><Text size="500">This simple description uses the Text component.</Text><Badge text="Badge also uses it" /></Flex>`}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description={`
- Any time that text is needed in the UI as a label, paragraph or number display
`}
          />
          <MainSection.Card
            type="don't"
            description={`
- When you need to use a semantic H1–H6 heading to create a clear typographic hierarchy and page structure. Use [Heading](/components/web/heading) instead.
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Emphasize text inside of paragraphs by using a bold weight."
            defaultCode={`
<Text>For campaign optimization and delivery, <Text weight="bold" inline>set optimization and delivery at the campaign level</Text> so all ad groups have the same values.</Text>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Emphasize text inside of paragraphs by underlining it; this can be confused with [Link](/components/web/link)."
            defaultCode={`
 <Text>For campaign optimization and delivery, <Text underline inline>set optimization and delivery at the campaign level</Text> so all ad groups have the same values.</Text>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use size to emphasize things like numbers that don’t define a page structure."
            defaultCode={`
<Flex direction="column">
  <Text size={200}>Impressions</Text>
  <Text size={500} weight="bold">1.25M</Text>
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use as section, page or surface titles to create a logical hierarchy. Use [Heading](/components/web/heading) instead."
            defaultCode={`
<Flex direction="column" gap={2}>
  <Text size={300} weight="bold">Impressions</Text>
  <Text size={100}>1,250,000</Text>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a minimal amount of sizes and styles to keep the UI clean and readable."
            defaultCode={`
<Flex direction="column" gap={4}>
  <Text>Pinterest is building a positive online space for creators. That’s why we made the <Text weight="bold" inline>Creator Code: A commitment to kindness for everyone on Pinterest.</Text> We expect everyone to follow these guidelines and lead with kindness when you create new content or interact with other people on Pinterest.</Text>
  <Text>Great content should highlight you and your ideas. Put your original spin on something and don’t be afraid to let your own perspective shine. For example: <Text italic inline>Fashion inspiration to freshen up a wardrobe.</Text></Text>
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mix styles and alignment, as this can be hard to read and follow."
            defaultCode={`
<Flex direction="column" gap={4}>
  <Text size={100}>Pinterest is building a positive online space for creators. That’s why we made the <Text size={100} color="success" inline>Creator Code: A commitment to kindness for everyone on Pinterest.</Text> We expect everyone to follow these guidelines and lead with kindness when you create new content or interact with other people on Pinterest.</Text>
  <Text weight="bold" align="center">Great content should highlight you and your ideas. Put your original spin on something and don’t be afraid to let your own perspective shine. For example: <Text weight="bold" italic color="warning" inline>Fashion inspiration to freshen up a wardrobe.</Text></Text>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Start-align paragraph text."
            defaultCode={`
<Text>Our mission is to bring everyone the inspiration to create a life they love. To do that, we show you personalized content and ads we think you’ll be interested in based on information we collect from you and third parties. We only use that information where we have a proper legal basis for doing so.</Text>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Center-align paragraph text. This is hard to read, especially for users with dyslexia."
            defaultCode={`
<Text align="center">Our mission is to bring everyone the inspiration to create a life they love. To do that, we show you personalized content and ads we think you’ll be interested in based on information we collect from you and third parties. We only use that information where we have a proper legal basis for doing so.</Text>
`}
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
        <MainSection.Subsection
          title="Accessible sizing"
          description="A minimum text size of 16 px (12pt) is recommended for readability. Some short text labels, or secondary text can go lower than that, but smaller sizes should be kept to a minimum. Making text brief will also help with readability."
        />
        <MainSection.Subsection
          title="Accessible color"
          description="For low-vision users, text color contrast is very important. To insure accessible contrast, stick to our [standard text colors](/foundations/color/usage#Standard-text-colors). See our [accessibility](/foundations/accessibility) page for design considerations and handy accessibility tools for checking color contrast."
        />
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description="Keep text simple and short to avoid truncation or line wrapping in UI controls like buttons when translating languages that require more characters. Avoid overriding our line-height settings, as this can result in text clipping for scripts, like Hindi, that have taller ascenders and descenders."
      >
        <MainSection.Subsection
          title="Text-wrapping and hyphenation"
          description="Hyphenation on iOS is turned off by default to avoid incorrect word breaks when strings of text wrap to the next line. This is especially helpful for international languages where an incorrect word break can greatly change the meaning of a word or sentence."
        />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Alignment"
          description="Use `align` to adjust the positioning of text within wrapper elements."
        >
          <MainSection.Card
            defaultCode={`
<Flex direction="column" gap={4} width={200}>
  <Text align="start">Start (default)</Text>
  <Divider />
  <Text align="end">End</Text>
  <Divider />
  <Text align="center">Center</Text>
  <Divider />
  <Text align="justify">Justify</Text>
  <Divider />
  <Text align="forceLeft">Force left</Text>
  <Divider />
  <Text align="forceRight">Force right</Text>
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Block vs. inline"
          description={`
          The Text component allows you to specify whether you want \`block\` or \`inline\` text.
        `}
        >
          <MainSection.Card
            defaultCode={`
<Flex alignItems="start" direction="column" gap={4}>
  <Text>Some content in a default block element. (default)</Text>
  <Box>
    <Text inline>Inline text with the inline prop.</Text>
    {' '}
    <Text inline>More inline text.</Text>
  </Box>
</Flex>
          `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Colors"
          description={`
        You can specify which color you want for your text. Most colors change in dark mode, but \`light\` and \`dark\` are available when no switch is desired.

        `}
        >
          <MainSection.Card
            defaultCode={`
  <Flex alignItems="start" direction="column" gap={3}>
    <Box color="inverse" padding={1}>
      <Text color="inverse" size="400">Inverse</Text>
    </Box>
    <Text color="subtle" size="400">Subtle</Text>
    <Text color="default" size="400">Default</Text>
    <Text color="success" size="400">Success</Text>
    <Text color="warning" size="400">Warning</Text>
    <Text color="error" size="400">Error</Text>
    <Text color="shopping" size="400">Shopping</Text>
    <Box color="primary" padding={1}>
      <Text color="light" size="400">Light</Text>
    </Box>
    <Box color="infoWeak" padding={1}>
      <Text color="dark" size="400">Dark</Text>
    </Box>
  </Flex>
          `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Overflow & truncation"
          description="Gestalt provides utility options to deal with text overflow."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex maxWidth={200} direction="column" gap={8}>
  <Flex direction="column" gap={2}>
    <Text>breakWord (default):</Text>
    <Box color="secondary" padding={2} rounding={2}>
      <Text>
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      </Text>
    </Box>
  </Flex>

  <Flex direction="column" gap={2}>
    <Text>normal:</Text>
    <Box color="secondary" padding={2} rounding={2}>
      <Text overflow="normal">
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      </Text>
    </Box>
  </Flex>

  <Flex direction="column" gap={2}>
  <Text>lineClamp:</Text>
    <Box color="secondary" padding={2} rounding={2}>
      <Text lineClamp={2}>
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      </Text>
    </Box>
  </Flex>
</Flex>
        `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sizes"
          description={`
          You can apply \`size\` options to define the size of the text. These font sizes follow those available through our [Design Tokens](/foundations/design_tokens#Font-size). If your text needs to be a [semantic heading (H1-H6)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Heading](/components/web/heading) instead.

        `}
        >
          <MainSection.Card
            defaultCode={`
<Flex alignItems="start" direction="column" gap={2}>
  <Flex alignItems="center" gap={2}>
    <Text inline size="100">Size 100</Text>
    <span lang="ja">
      <Text inline size="100">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="200">Size 200</Text>
    <span lang="ja">
      <Text inline size="200">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="300">Size 300 (default size)</Text>
    <span lang="ja">
      <Text inline size="300">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="400">Size 400</Text>
    <span lang="ja">
      <Text inline size="400">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="500">Size 500</Text>
    <span lang="ja">
      <Text inline size="500">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="600">Size 600</Text>
    <span lang="ja">
      <Text inline size="600">
        こんにちは
      </Text>
    </span>
  </Flex>
</Flex>
          `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Styles"
          description="There are multiple styles, such as bold and italic, that we can attach to the Text component."
        >
          <MainSection.Card
            defaultCode={`
<Flex direction="column" gap={2}>
  <Text weight="bold">Bold</Text>
  <Text italic>Italic</Text>
  <Text underline>Underline</Text>
</Flex>
          `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Title"
          description={`The \`title\` attribute on a \`<div>\` can be used to show the full text of a truncated string on hover. That attribute is populated automatically when the text is truncated using \`lineClamp\`, as long as \`children\` is a string.
           If \`children\` is a \`React.Node\` (e.g. [when using Link](/components/web/link#Link-and-Text)), use the \`title\` prop to manually set the \`title\` attribute.`}
        >
          <MainSection.Card
            defaultCode={`
<Flex alignItems="center" direction="column" gap={2}>
  <Text size="200" weight="bold">
    Hover over the examples below for a few seconds to see the title text:
  </Text>

  <Box borderStyle="sm" maxWidth={400} padding={1}>
    <Flex direction="column" gap={3}>
      <Flex direction="column" gap={1}>
        <Text italic size="100">
          This title attribute is automatically added because lineClamp is used and children is a string.
        </Text>
        <Text lineClamp={1}>
          This is a long and Supercalifragilisticexpialidocious sentence.
          次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
        </Text>
      </Flex>

      <Flex direction="column" gap={1}>
        <Text italic size="100">
          This example uses lineClamp but has no title attribute, because children is a React.Node.
        </Text>
        <Text lineClamp={1}>
          <Link href="#">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </Link>
        </Text>
      </Flex>

      <Flex direction="column" gap={1}>
        <Text italic size="100">
          This example uses lineClamp and children is a React.Node, but uses the title prop.
        </Text>
        <Text
          lineClamp={1}
          title="This is a long and Supercalifragilisticexpialidocious sentence. 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉"
        >
          <Link href="#">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </Link>
        </Text>
      </Flex>
    </Flex>
  </Box>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection name="Writing">
          <MainSection.Subsection columns={2}>
            <MainSection.Card
              cardSize="md"
              type="do"
              description={`
- Keep text in UI components short and clear
- Use **Sentence case** for UI labels
`}
            />
            <MainSection.Card
              cardSize="md"
              type="don't"
              description={`
- Use long text labels that could end up truncating or causing space issues when translating to other languages
- Use **Title Case** or **ALL CAPS** in UI labels
- Use ALL CAPS for paragaph text unless referring to a product or other entity that uses that style
`}
            />
          </MainSection.Subsection>
        </MainSection>

        <MainSection name="Related">
          <MainSection.Subsection
            description={`
      **[Heading](/components/web/heading)**
      Heading allows you to add H1–H6 level text on a page. They are generally placed underneath a PageHeader, and provide you with a way to create a logical text hierarchy.
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
          <MainSection.Subsection
            description={`
      **[Link](/components/web/link)**
      Used as a text-only navigational element. Links usually appear within or directly following a paragraph or sentence.
    `}
          />
        </MainSection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Text' }) },
  };
}
