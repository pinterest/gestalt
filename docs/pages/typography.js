// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Link, Table, Text } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import Markdown from '../components/Markdown.js';
import AlignmentStart from '../graphics/typography/alignmentStart.svg';
import AlignmentCenter from '../graphics/typography/alignmentCenter.svg';
import AlignmentEnd from '../graphics/typography/alignmentEnd.svg';
import Speedy from '../graphics/typography/speedy.svg';
import Inclusive from '../graphics/typography/inclusive.svg';
import Minimal from '../graphics/typography/minimal.svg';
import LineLength from '../graphics/typography/lineLength.svg';
import LineHeightLatin from '../graphics/typography/lineHeightLatin.svg';
import LineHeightCJK from '../graphics/typography/lineHeightCJK.svg';
import ParagraphSpacing from '../graphics/typography/paragraphSpacing.svg';
import HierarchyDo from '../graphics/typography/hierarchyDo.svg';
import HierarchyDont from '../graphics/typography/hierarchyDont.svg';

type PrincipleCardProps = {|
  color: string,
  image?: Node,
  text: string | Node,
  heading: string,
|};
function PrincipleLayout({ color, image, text, heading }: PrincipleCardProps): Node {
  return (
    <Flex direction="column" gap={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={160}
        width={260}
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: `var(--color-${color})`,
          },
        }}
      >
        {image}
      </Box>
      <Heading size="400">{heading}</Heading>
      <Box marginBottom={6}>
        <Text>{text}</Text>
      </Box>
    </Flex>
  );
}

export default function TypographyPage(): Node {
  return (
    <Page title="Typography">
      <PageHeader
        name="Typography"
        description={`Our typographic system creates a content hierarchy that is scannable and efficient.
    `}
        showSourceLink={false}
      />
      <MainSection name="Principles">
        <Flex gap={12} alignContent="between" wrap>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleLayout
              color="teal-spabattical-100"
              image={<Speedy />}
              heading="Speedy"
              text={
                <Text>
                  Native system font families are used so that products load quickly and can be read
                  efficiently across all devices.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleLayout
              color="pink-flaminglow-100"
              image={<Inclusive />}
              heading="Inclusive"
              text={
                <Text>
                  We stick to standard line-spacing defaults or percentagesto ensure text can be
                  read regardless of a user’s preferred language or font size.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleLayout
              color="orange-firetini-100"
              image={<Minimal />}
              heading="Minimal"
              text={
                <Text>
                  Gestalt uses a limited amount of weights and sizes to keep our interfaces focused
                  on our customers’ rich content.
                </Text>
              }
            />
          </Flex.Item>
        </Flex>
      </MainSection>
      <MainSection
        name="Typography components"
        description={`
We have numerous React components that use typography as the primary element.

- [Text](/text): Used for all text on a surface
- [Heading](/heading): Allows you to show headings on a surface
- [Link](/link): For both in-line and stand-alone
`}
      />
      <MainSection name="Font families">
        <MainSection.Subsection
          title="Product"
          description="For our product interfaces, we default to *system fonts*. See our [font family design tokens](/design_tokens#Font-family) for more information."
        />
        <MainSection.Subsection
          title="Brand"
          description="Pinterest Sans can be used occasionally for branded graphics in our products, but never for UI. For more info, consult our [brand guidelines](https://brand.pinterest.com/typography)."
        />
      </MainSection>
      <MainSection name="Scale">
        <MainSection.Subsection
          title="Font sizes"
          description="In order to keep our content hierarchy clean and simple, we have a limited amount of font sizes. These should cover all current use cases for minimal product UI, where our customers’ content is the primary focus of a surface or page."
        >
          <Table accessibilityLabel="Font sizes">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Size
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Web value
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    iOS value
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Android value
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Example
                  </Text>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">100</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">12px</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">12pt</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">12sp</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="100">Gestalt</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">200</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">14px</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">14pt</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">14sp</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">means</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">300</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">16px</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">16pt</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">16sp</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="300">whole</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">400</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">20px</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">20pt</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">20sp</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="400">and so</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">500</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">28px</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">28pt</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">28sp</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="500">are</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">600</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">28px</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">28pt</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">28sp</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="600">you</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Line length"
          description="For long-form, multi-line paragraphs set at our default font size, use a maximum width of 664 to allow for a max of about 90 characters. Otherwise, it can get hard for users to scan and read text."
        >
          <Box width="100%" color="infoWeak">
            <LineLength />
          </Box>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Spacing">
        <MainSection.Subsection
          title="Line height"
          description="Proper line spacing line height (or leading) is important for readability. If lines of text get too close together, it can be hard to read them; if they are too far apart it can make it difficult to sense a clear hierarchy and group related text blocks. Given that we use system fonts, we rely on percentages on web and system defaults on mobile to ensure blocks are text are still readable for internationalization and dynamic sizing."
        />
        <MainSection.Subsection
          title="Web"
          description="We currently use browser defaults on web UIs so that lines of text are readable in all
            languages and scripts. For example, scripts like Hindi have larger ascenders and
            descenders than Latin scripts. Setting a fixed line height can make scripts like Hindi
            hard to read."
        >
          <Box maxWidth={572}>
            <Heading size="300" accessibilityLevel={4}>
              Web
            </Heading>
            <Markdown
              text={`
We currently use browser defaults on web UIs so that lines of text are readable in all languages and scripts. For example, scripts like Hindi have larger ascenders and descenders than Latin scripts. Setting a fixed line height can make scripts like Hindi hard to read.
            `}
            />
          </Box>
          <Flex gap={4} width={504}>
            <Flex.Item flex="shrink">
              <Box color="infoWeak">
                <LineHeightLatin />
              </Box>
              <Text size="100">
                Latin script in Chrome with line-height set to “normal”, which is about 120% of font
                size.
              </Text>
            </Flex.Item>
            <Flex.Item flex="shrink">
              <Box color="infoWeak">
                <LineHeightCJK />
              </Box>
              <Text size="100">
                Myanmar script in Chrome with line-heigh set to normal, which is about 200% of font
                size.
              </Text>
            </Flex.Item>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection>
          <Heading size="300" accessibilityLevel={4}>
            iOS
          </Heading>
          <Markdown
            text={`
iOS Leading is automatically determined by a font’s size. Below is a breakdown based on Gestalt’s current font sizes. For more info, refer to Apple’s [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/).
            `}
          />
          <Table accessibilityLabel="Font weight treatements">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Font size (pt)
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Leading
                  </Text>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">12</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">16</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">16</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">21</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">20</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">25</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">28</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">34</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">36</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">43</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </MainSection.Subsection>
        <MainSection.Subsection>
          <Heading size="300" accessibilityLevel={4}>
            Android
          </Heading>
          <Markdown
            text={`
Line height is automatically determined by a font’s size. For more info, refer to [Material Design](https://material.io/design/typography/the-type-system.html#type-scale).
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Paragraph spacing"
          description="Spacing after a paragraph in body copy should be 75% of the body copy font size."
        >
          <Box color="infoWeak">
            <ParagraphSpacing />
          </Box>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Character spacing"
          description="Character spacing is set to system defaults across all devices and platforms"
        />
      </MainSection>
      <MainSection name="Alignment">
        <MainSection.Subsection title="Default">
          <Flex gap={4}>
            <Flex.Item>
              <Box color="infoWeak">
                <AlignmentStart />
              </Box>
            </Flex.Item>
            <Box>
              <Heading size="300" accessibilityLevel={4}>
                Start-aligned
              </Heading>
              <Text>
                Our default alignment is start-aligned. There are a couple of reasons to default to
                start-aligned text:
              </Text>
              <Text>
                <ul>
                  <li>
                    Users tend to read in “F” patterns, so placing text in a similar pattern helps
                    with users absorbing all the information they need for a good experience
                  </li>
                  <li>
                    Since the starting edge of centered text moves around, it’s harder for users to
                    read; this can be especially difficult for people with dyslexia
                    (https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide).
                  </li>
                </ul>
              </Text>
            </Box>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="Exceptions">
          <Flex gap={4}>
            <Flex.Item>
              <Box color="infoWeak">
                <AlignmentCenter />
              </Box>
            </Flex.Item>
            <Box>
              <Heading size="300" accessibilityLevel={4}>
                Centered
              </Heading>
              <Text>
                Use center-aligned text for very short blocks of content, like text inside of
                buttons or tabs.
              </Text>
            </Box>
          </Flex>
          <Flex gap={4}>
            <Flex.Item>
              <Box color="infoWeak">
                <AlignmentEnd />
              </Box>
            </Flex.Item>
            <Box>
              <Heading size="300" accessibilityLevel={4}>
                End-aligned
              </Heading>
              <Text>End-align integers in tables so that they are easy to compare.</Text>
            </Box>
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Formatting">
        <MainSection.Subsection
          title="Font weight"
          description="In Pinner surfaces, the main focus is a user’s visual content. On business surfaces, visuals are supported by denser text content and data visualization. Therefore, typographic weight shouldn’t be so heavy that it causes visual noise, nor should it be too light to read. Use the following guidelines for choosing font weight:

"
        >
          <Table accessibilityLabel="Font weight treatements">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Use case
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Web weight
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    iOS weight
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Android weight
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size="200" weight="bold">
                    Example
                  </Text>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">Body copy</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Regular</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Regular</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Regular</Text>
                </Table.Cell>
                <Table.Cell>
                  <Box color="darkGray" rounding={2} padding={2} display="inlineBlock">
                    <Text color="inverse" size="100">
                      This is text in a tooltip
                    </Text>
                  </Box>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">Emphasis for in-line text</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Bold</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Semibold</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Medium</Text>
                </Table.Cell>
                <Table.Cell>
                  <Box color="darkGray" rounding={2} padding={2} display="inlineBlock">
                    <Text color="inverse" size="100" overflow="noWrap" inline>
                      Figma is{' '}
                      <Text weight="bold" color="inverse" size="100" overflow="noWrap" inline>
                        not a design system
                      </Text>
                    </Text>
                  </Box>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">Stand-alone links</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Bold</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Semibold</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Medium</Text>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap={8}>
                    <Text weight="bold">
                      <Link href="https://pinterest.com">Pinterest</Link>
                    </Text>
                    <Text weight="bold">
                      <Link href="https://gestalt.pinterest.systems">Gestalt</Link>
                    </Text>
                  </Flex>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Text size="200">Headlines</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Bold</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Semibold</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="200">Medium</Text>
                </Table.Cell>
                <Table.Cell>
                  <Heading>Page title</Heading>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Text decoration"
          description="Underline links when shown in-line, inside of a text block or line of text.

"
        >
          <Box color="infoWeak" paddingX={6} paddingY={8}>
            <Text color="dark">
              This is a paragraph with an{' '}
              <Link href="https://gestalt.pinterest.systems" underline="always" inline>
                link
              </Link>{' '}
              inside of it. Remember, the whole is different from the sum of its parts.
            </Text>
          </Box>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Hierarchy"
        description="Font size and weight, along with line-height, spacing, and width allow us to create a scannable and readable hierarchy that guides a user through a product experience."
      >
        <Table accessibilityLabel="Typgraphic hierarchy">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Role
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Size
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Weight
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Line spacing
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="200" weight="bold">
                  Context
                </Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Text size="100" overflow="noWrap">
                  Help text
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">100</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Regular</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">150%</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Form fields, metadata, secondary info</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text size="200" overflow="noWrap">
                  Body, dense
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">200</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Regular</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">150%</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">
                  Tables, internal tools, and body copy for dense business interfaces
                </Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text size="300" overflow="noWrap">
                  Body, default
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">300</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Regular</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">150%</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Default body copy for multi-line, paragraph text</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text size="400" weight="bold" overflow="noWrap">
                  Heading, sm
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>400</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200" weight="bold">
                  Bold
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>125%</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Small headings, usually an H3</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text size="500" weight="bold" overflow="noWrap">
                  Heading, md
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>500</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200" weight="bold">
                  Bold
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>125%</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>PageHeaders, medium-headlines</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text size="600" weight="bold" overflow="noWrap">
                  Heading, lg
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>600</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200" weight="bold">
                  Bold
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>125%</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Large headlines, usually an H1</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </MainSection>
      <MainSection name="Best practices">
        <Heading size="400" accessibilityLevel={3}>
          Accessibility
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="To ensure that all of our customers, including users with low-vision, use a font-size of 14–16px and above for most use cases, especially long-form text. Smaller fonts are ok for less important information, and should be used sparingly."
            defaultCode={`
            <Text>We are all here together in freedom, for perhaps the last time! I know, dear; I know that you will always be with me to the end.</Text>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use font sizes below 14px for body copy and UI controls, unless the text is very brief and secondary."
            defaultCode={`
            <Text size="100">We are all here together in freedom, for perhaps the last time! I know, dear; I know that you will always be with me to the end.</Text>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="For SEO and users with screen readers, follow a logical hierarchy by using headings based on a numerical order, not on font size."
          >
            <HierarchyDo />
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use font sizes below 14px for body copy and UI controls, unless the text is very brief and secondary."
          >
            <HierarchyDont />
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Stick to our [design tokens](/design_tokens) and use color combinations with a 4.5:1 contrast ratio between foreground and background."
            defaultCode={`
<Box rounding={2} padding={2} color="infoWeak"><Text>This has enough contrast</Text></Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use text that doesn’t pass 4.5:1 contrast ratio when testing with Figma accessibility plugins."
            defaultCode={`
<Box rounding={2} padding={2} color="infoWeak"><Text color="inverse">This does not have enough contrast</Text></Box>
`}
          />
        </MainSection.Subsection>
        <Heading size="400" accessibilityLevel={3}>
          Localization
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
Use standards that will make it easier to translate to other languages:
- Since character heights vary from font family to font family, keep line-heights to percentages or system defaults so that text doesn’t get cut off or lines get too-close together.
- Use system fonts and defaults to ensure broad language support
- Avoid ALL CAPS for special emphasis, as certain languages, like Arabic, do not support it
`}
            defaultCode={`
<Text>TBD</Text>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Set line height to specific sizes, use fonts that don’t have broad language support, and use ALL CAPS."
            defaultCode={`
<Text>TBD</Text>
`}
          />
        </MainSection.Subsection>
        <Heading size="400" accessibilityLevel={3}>
          Style
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Align, space and style text so that a user can easily read it and understand what actions to take."
            defaultCode={`
<Box>
  <Heading accessibilityLevel={4} size="400">Shopify Marketing would like permission to:</Heading>
  <Text>
    <ul>
      <li>See your account settings</li>
      <li>Create new Pins for you</li>
      <li>Send messages on behalf of you</li>
      <li>Follow things for you</li>
      <li>See your secret Pins</li>
      <li>See your secret boards</li>
    </ul>
  </Text>
</Box>
`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Center-align text with tight leading and underlined text that can be mistaken for links while using colors that are too light to read."
            defaultCode={`
<Flex direction="column" gap={2} alignItems="center" >
  <Heading align="center" accessibilityLevel={4} size="400">Shopify Marketing would like permission to:</Heading>
  <Text>See your account settings</Text>
  <Text>Create new Pins for you</Text>
  <Text>Send messages on behalf of you</Text>
  <Text>Follow things for you</Text>
  <Text> See your secret Pins</Text>
  <Text>See your secret boards</Text>
</Flex>
`}
          />
        </MainSection.Subsection>
        <Heading size="400" accessibilityLevel={3}>
          Text-wrapping and truncation
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Wrap text to multiple lines when a user needs to see the full text to understand what is expected. This is likely to happen when translated to languages with longer line-lengths."
            defaultCode={`
<Box width={150}><Button color="red" text="Go to the latest updates" /></Box>
`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncate text in UI controls like buttons and menus where it can make it hard for a user to understand what is expected. On touch surfaces, a user won’t have a tooltip on hover."
            defaultCode={`
<Box width={100}><Button color="red" text="Go to..." /></Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Truncate text for secondary text that isn’t essential to a user’s comprehension of steps to take. Examples include dynamic data ad IDs in tables, lists of user names, and Pin titles that come from outside sources. Use an ellipses or a link that indicates that there is more content available."
            defaultCode={`
<Table accessibilityLabel="Font sizes">
<Table.Header>
  <Table.Row>
    <Table.HeaderCell>
      <Text size="200" weight="bold">
        Name
      </Text>
    </Table.HeaderCell>
    <Table.HeaderCell>
      <Text size="200" weight="bold">
        Rate
      </Text>
    </Table.HeaderCell>
    <Table.HeaderCell>
      <Text size="200" weight="bold">
        Tags
      </Text>
    </Table.HeaderCell>
  </Table.Row>
</Table.Header>
<Table.Body>
  <Table.Row>
    <Table.Cell>
      <Text size="200" lineClamp={1}>AD-225-DB-RFUYS-2398</Text>
    </Table.Cell>
    <Table.Cell>
      <Text size="200">100</Text>
    </Table.Cell>
    <Table.Cell>
    <Text size="200" inline overflow="noWrap">lifestyle, gaming</Text>
    <Text inline weight="bold" size="200" ><Link href="#" underline="always">3 more</Link></Text>
    </Table.Cell>
  </Table.Row>
  <Table.Row>
    <Table.Cell>
      <Text size="200" lineClamp={1}>AD-225-Dd-224-AKD-290</Text>
    </Table.Cell>
    <Table.Cell>
      <Text size="200">5,000</Text>
    </Table.Cell>
    <Table.Cell>
      <Text size="200" inline overflow="noWrap">bargain, gaming</Text>
      <Text inline weight="bold" size="200"><Link href="#" underline="always">7 more</Link></Text>
    </Table.Cell>
  </Table.Row>
</Table.Body>
</Table>
`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncating paragraph text, as that can be misread and change the original meaning of the text."
            defaultCode={`
<Flex direction="column" gap={2} maxWidth={250}>
  <Heading accessibilityLevel={4} size="400">Cheesy chicken sandwich</Heading>
  <Text lineClamp={3}>An updated twist to a grilled classic. This is a delicious treat, especially if you are a chicken lover. Make sure to try this out!</Text>
</Flex>
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Future updates"
        description={`
Our guidelines and components primarily cover user interface use cases for typography. We will improve upon this by adding guidelines and components for long-form text in the future.

Long-form text components and guidelines [Exploration badge]

Components and guidelines for long-form text that will include better line-height  and line-length for headings, paragraph blocks

iOS and Android Figma updates [Exploration badge]

Updates to mobile components that match Apple HIG and Android Material values for line-height.
      `}
      />
    </Page>
  );
}
