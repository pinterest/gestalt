import {ReactNode} from 'react';
import { Box, Flex, Heading, Link, Table, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../docs-components/consts';
import MainSection from '../../docs-components/MainSection';
import Markdown from '../../docs-components/Markdown';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import alignAndSpaceTextForReadability from '../../examples/typography/alignAndSpaceTextForReadability';
import dontCenterTextWithTightLeading from '../../examples/typography/dontCenterTextWithTightLeading';
import dontTruncateParagraphText from '../../examples/typography/dontTruncateParagraphText';
import dontTruncateTextInControls from '../../examples/typography/dontTruncateTextInControls';
import dontUseFixedSizeLineHeightAndCaps from '../../examples/typography/dontUseFixedSizeLineHeightAndCaps';
import dontUseSmallSizes from '../../examples/typography/dontUseSmallSizes';
import truncateForSecondaryText from '../../examples/typography/truncateForSecondaryText';
import useProperFontSize from '../../examples/typography/useProperFontSize';
import useStandardsForLanguageTranslation from '../../examples/typography/useStandardsForLanguageTranslation';
import wrapTextWhenNeeded from '../../examples/typography/wrapTextWhenNeeded';
import AlignmentCenter from '../../graphics/typography/alignmentCenter.svg';
import AlignmentEnd from '../../graphics/typography/alignmentEnd.svg';
import AlignmentStart from '../../graphics/typography/alignmentStart.svg';
import ContrastHigh from '../../graphics/typography/contrastHigh.svg';
import ContrastLow from '../../graphics/typography/contrastLow.svg';
import HierarchyDo from '../../graphics/typography/hierarchyDo.svg';
import HierarchyDont from '../../graphics/typography/hierarchyDont.svg';
import LineHeightCJK from '../../graphics/typography/lineHeightCJK.svg';
import LineHeightLatin from '../../graphics/typography/lineHeightLatin.svg';
import LineLength from '../../graphics/typography/lineLength.svg';
import ParagraphSpacing from '../../graphics/typography/paragraphSpacing.svg';

export default function TypographyPage() {
  return (
    <Page title="Typography">
      <PageHeader
        description={`Our typographic system creates a content hierarchy that is scannable and efficient.
    `}
        name="Typography"
        type="guidelines"
      />

      <MainSection name="Principles">
        <MainSection.Subsection
          description={`Native system font families are used so that products load quickly and can be read efficiently across all devices.
`}
          title="Speedy"
        />
        <MainSection.Subsection
          description={`We stick to standard line-spacing defaults or percentages to ensure text can be read regardless of a user’s preferred language or font size.
`}
          title="Inclusive"
        />
        <MainSection.Subsection
          description={`Gestalt uses a limited number of weights and sizes to keep our interfaces focusedon our customers’ rich content.
`}
          title="Minimal"
        />
      </MainSection>

      <MainSection
        description={`
We have several React components that use typography as the primary element.

- [Text](/web/text): Used for all text on a surface.
- [Heading](/web/heading): Used for [semantic headings](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) on a surface.
- [Link](/web/link): For both inline and standalone hyperlinks.
`}
        name="Typography components"
      />

      <MainSection name="Font families">
        <MainSection.Subsection
          description="For our product interfaces, we default to *system fonts*. See our [font family design tokens](/foundations/design_tokens/overview#Font-family) for more information."
          title="Product"
        />
        <MainSection.Subsection
          description="Our custom typeface, Pinterest Sans, can be used occasionally for branded graphics in our products, but never for UI. For more info, consult our [brand guidelines](https://brand.pinterest.com/typography)."
          title="Brand"
        />
      </MainSection>

      <MainSection name="Scale">
        <MainSection.Subsection
          description="In order to keep our content hierarchy clean and simple, we have a limited number of font sizes. These should cover all current use cases for minimal product UI, where our customers’ content is the primary focus of a surface or page."
          title="Font sizes"
        >
          <Table accessibilityLabel="Font sizes">
            <Table.Header>
              <Table.Row>
                {['Size', 'Web value', 'iOS value', 'Android value', 'Example'].map((item) => (
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
                {['100', '12px', '12pt', '12sp'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Text size="100">Gestalt</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {['200', '14px', '14pt', '14sp'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Text size="200">means</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {['300', '16px', '16pt', '16sp'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Text size="300">whole</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {['400', '20px', '20pt', '20sp'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Text size="400">and so</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {['500', '28px', '28pt', '28sp'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Text size="500">are</Text>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {['600', '36px', '36pt', '36sp'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Text size="600">you</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </MainSection.Subsection>

        <MainSection.Subsection
          description="For long-form, multi-line paragraphs set at our default font size, use a maximum width of 664 to allow for a max of about 90 characters. Otherwise, it can get hard for users to scan and read text."
          title="Line length"
        >
          <Box color="infoWeak" overflow="hidden" width="100%">
            <LineLength />
          </Box>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Spacing">
        <MainSection.Subsection
          description="Proper line spacing line height (or leading) is important for readability. If lines of text get too close together, it can be hard to read them; if they are too far apart it can make it difficult to sense a clear hierarchy and group related text blocks. Given that we use system fonts, we rely on percentages on web and system defaults on mobile to ensure blocks are text are still readable for internationalization and dynamic sizing."
          title="Line height"
        />
        <MainSection.Subsection>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Heading accessibilityLevel={4} size="300">
              Web
            </Heading>
            <Markdown
              text={`
We use browser defaults on web UIs so that lines of text are readable in all languages and scripts. For example, scripts like Hindi have larger ascenders and descenders than Latin scripts. Setting a fixed line height can make scripts like Hindi hard to read.
            `}
            />
          </Box>
          <Flex
            gap={{
              row: 4,
              column: 8,
            }}
            width="100%"
            wrap
          >
            <Flex.Item flex="shrink" flexBasis={244}>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
              >
                <Box color="infoWeak">
                  <LineHeightLatin />
                </Box>
                <Text size="100">
                  Latin script in Chrome with line-height set to “normal”, which is about 120% of
                  font size.
                </Text>
              </Flex>
            </Flex.Item>
            <Flex.Item flex="shrink" flexBasis={244}>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
              >
                <Box color="infoWeak">
                  <LineHeightCJK />
                </Box>
                <Text size="100">
                  Myanmar script in Chrome with line-height set to “normal”, which is about 200% of
                  font size.
                </Text>
              </Flex>
            </Flex.Item>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Heading accessibilityLevel={4} size="300">
              iOS
            </Heading>
            <Markdown
              text={`
iOS leading is automatically determined by a font’s size. Below is a breakdown based on Gestalt’s current font sizes. For more info, refer to Apple’s [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/).
            `}
            />
          </Box>
          <Table accessibilityLabel="Font weight treatments">
            <Table.Header>
              <Table.Row>
                {['Font size (pt)', 'Leading'].map((item) => (
                  <Table.HeaderCell key={item}>
                    <Text size="200" weight="bold">
                      {item}
                    </Text>
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {[
                [12, 16],
                [16, 21],
                [20, 25],
                [28, 34],
                [36, 43],
              ].map((rowData) => (
                <Table.Row key={rowData.join()}>
                  {rowData.map((item) => (
                    <Table.Cell key={item}>
                      <Text size="200">{item}</Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </MainSection.Subsection>

        <MainSection.Subsection>
          <Box marginBottom={6} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Heading accessibilityLevel={4} size="300">
              Android
            </Heading>
            <Markdown
              text={`
Line height is automatically determined by a font’s size. For more info, refer to [Material Design](https://material.io/design/typography/the-type-system.html#type-scale).
`}
            />
          </Box>
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Spacing after a paragraph in body copy should be 75% of the body copy font size."
          title="Paragraph spacing"
        >
          <Box color="infoWeak" overflow="hidden">
            <ParagraphSpacing />
          </Box>
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Character spacing is set to system defaults across all devices and platforms"
          title="Character spacing"
        />
      </MainSection>

      <MainSection name="Alignment">
        <MainSection.Subsection title="Default">
          <Flex
            gap={{
              row: 4,
              column: 0,
            }}
            wrap
          >
            <Flex.Item flex="shrink" flexBasis={244}>
              <Box color="infoWeak" marginBottom={4}>
                <AlignmentStart />
              </Box>
            </Flex.Item>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 2,
              }}
              maxWidth={420}
            >
              <Heading accessibilityLevel={4} size="300">
                Start-aligned
              </Heading>
              <Markdown
                text={`
              Our default alignment is start-aligned. There are a couple of reasons to default to start-aligned text:
              - Users tend to read in “F” patterns, so placing text in a similar pattern helps with users absorbing all the information they need for a good experience.
              - Since the starting edge of centered text moves around, it’s harder for users to read; this can be especially difficult for [people with dyslexia](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide).
              `}
              />
            </Flex>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Exceptions">
          <Flex
            gap={{
              row: 4,
              column: 10,
            }}
            wrap
          >
            <Flex
              gap={{
                row: 4,
                column: 0,
              }}
              wrap
            >
              <Flex.Item flex="shrink" flexBasis={244}>
                <Box color="infoWeak" marginBottom={4}>
                  <AlignmentCenter />
                </Box>
              </Flex.Item>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                maxWidth={420}
              >
                <Heading accessibilityLevel={4} size="300">
                  Centered
                </Heading>
                <Markdown text="Use center-aligned text for very short blocks of content, like text inside of buttons or tabs." />
              </Flex>
            </Flex>
            <Flex
              gap={{
                row: 4,
                column: 0,
              }}
              wrap
            >
              <Flex.Item flex="shrink" flexBasis={244}>
                <Box color="infoWeak" marginBottom={4}>
                  <AlignmentEnd />
                </Box>
              </Flex.Item>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                maxWidth={420}
              >
                <Heading accessibilityLevel={4} size="300">
                  End-aligned
                </Heading>
                <Markdown text="End-align integers in tables so that they are easy to compare." />
              </Flex>
            </Flex>
          </Flex>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Formatting">
        <MainSection.Subsection
          description="On Pinner surfaces, the main focus is a user’s visual content. On business surfaces, visuals are supported by denser text content and data visualization. Therefore, typographic weight shouldn’t be so heavy that it causes visual noise, nor should it be too light to read. Use the following guidelines for choosing font weight:"
          title="Font weight"
        >
          <Table accessibilityLabel="Font weight treatments">
            <Table.Header>
              <Table.Row>
                {['Use case', 'Web weight', 'iOS weight', 'Android weight', 'Example'].map(
                  (item) => (
                    <Table.HeaderCell key={item}>
                      <Text size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ),
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {['Body copy', 'Regular', 'Regular', 'Regular'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Box color="selected" display="inlineBlock" padding={2} rounding={2}>
                    <Text color="inverse" size="100">
                      This is text in a tooltip
                    </Text>
                  </Box>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {['Emphasis for inline text', 'Semibold', 'Semibold', 'Medium'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Box color="selected" display="inlineBlock" padding={2} rounding={2}>
                    <Text color="inverse" inline overflow="noWrap" size="100">
                      Figma is{' '}
                      <Text color="inverse" inline overflow="noWrap" size="100" weight="bold">
                        not a design system
                      </Text>
                    </Text>
                  </Box>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                {['Standalone links', 'Semibold', 'Semibold', 'Medium'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Flex
                    gap={{
                      row: 8,
                      column: 0,
                    }}
                  >
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
                {['Headlines', 'Semibold', 'Semibold', 'Medium'].map((item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Text size="600" weight="bold">
                    Page title
                  </Text>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Underline links when shown inline, inside of a text block or line of text."
          title="Text decoration"
        >
          <Box color="infoWeak" paddingX={6} paddingY={8}>
            <Text color="dark">
              This is a paragraph with a{' '}
              <Link
                display="inlineBlock"
                href="https://gestalt.pinterest.systems"
                underline="always"
              >
                link
              </Link>{' '}
              inside of it. Remember, the whole is different from the sum of its parts.
            </Text>
          </Box>
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        description="Font size and weight, along with line height, spacing, and width allow us to create a scannable and readable hierarchy that guides a user through a product experience."
        name="Hierarchy"
      >
        <Table accessibilityLabel="Typographic hierarchy">
          <Table.Header>
            <Table.Row>
              {['Role', 'Size', 'Weight', 'Context'].map((item) => (
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
              <Table.Cell>
                <Text overflow="noWrap" size="100">
                  Help text
                </Text>
              </Table.Cell>
              {['100', 'Regular', 'Form fields, metadata, secondary info'].map((item) => (
                <Table.Cell key={item}>
                  <Text size="200">{item}</Text>
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text overflow="noWrap" size="200">
                  Body, dense
                </Text>
              </Table.Cell>
              {[
                '200',
                'Regular',
                'Tables, internal tools, and body copy for dense business interfaces',
              ].map((item) => (
                <Table.Cell key={item}>
                  <Text size="200">{item}</Text>
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text overflow="noWrap" size="300">
                  Body, default
                </Text>
              </Table.Cell>
              {['300', 'Regular', 'Default body copy for multi-line, paragraph text'].map(
                (item) => (
                  <Table.Cell key={item}>
                    <Text size="200">{item}</Text>
                  </Table.Cell>
                ),
              )}
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text overflow="noWrap" size="400" weight="bold">
                  Heading, sm
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">400</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200" weight="bold">
                  Semibold
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Small headings, usually an H3</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text overflow="noWrap" size="500" weight="bold">
                  Heading, md
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">500</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200" weight="bold">
                  Semibold
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">PageHeaders, medium-headlines</Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text overflow="noWrap" size="600" weight="bold">
                  Heading, lg
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">600</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200" weight="bold">
                  Semibold
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="200">Large headlines, usually an H1</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </MainSection>

      <MainSection name="Best practices">
        <Heading accessibilityLevel={3} size="400">
          Accessibility
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use a font size of 14–16px and above for most use cases, especially long-form text. Smaller fonts are ok for less important information, but should be used sparingly. This ensures that content is accessible to all of our customers, including users with low vision."
            sandpackExample={
              <SandpackExample
                code={useProperFontSize}
                hideControls
                hideEditor
                layout="column"
                name="Use proper font size for most cases"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use font sizes below 14px for body copy and UI controls, unless the text is very brief and secondary."
            sandpackExample={
              <SandpackExample
                code={dontUseSmallSizes}
                hideControls
                hideEditor
                layout="column"
                name="Don't use small sizes for UI and body"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Follow a logical hierarchy by using headings based on a numerical order, not on font size. This makes our content more accessible for SEO and screen readers."
            type="do"
          >
            <HierarchyDo />
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            description="Use headings in an illogical order, since this will confuse screen readers. For example, don’t start a section with an H2 or H3, and place an H1 further down in the hierarchy."
            type="don't"
          >
            <HierarchyDont />
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Stick to our [design tokens](/foundations/design_tokens) and use color combinations with a 4.5:1 contrast ratio between foreground and background."
            type="do"
          >
            <ContrastHigh />
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            description="Use text that doesn’t pass 4.5:1 contrast ratio when testing with Figma accessibility plugins."
            type="don't"
          >
            <ContrastLow />
          </MainSection.Card>
        </MainSection.Subsection>

        <Heading accessibilityLevel={3} size="400">
          Localization
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
Use standards that will make it easier to translate to other languages:
- Since character heights vary between font families, keep line heights to percentages or system defaults so that text isn’t cut off and lines aren’t too close together.
- Use system fonts and defaults to ensure broad language support.
- Avoid ALL CAPS for special emphasis. Certain languages, such as Arabic, do not support it.
`}
            sandpackExample={
              <SandpackExample
                code={useStandardsForLanguageTranslation}
                hideControls
                hideEditor
                layout="column"
                name="Use standards for language translation"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Set line height to specific sizes, use fonts that don’t have broad language support, or use ALL CAPS."
            sandpackExample={
              <SandpackExample
                code={dontUseFixedSizeLineHeightAndCaps}
                hideControls
                hideEditor
                layout="column"
                name="Don't use fixed size line height and caps"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <Heading accessibilityLevel={3} size="400">
          Style
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Align, space and style text so that a user can easily read it and understand what actions to take."
            sandpackExample={
              <SandpackExample
                code={alignAndSpaceTextForReadability}
                hideControls
                hideEditor
                layout="column"
                name="Align and space text for readability"
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Center-align text with tight leading and underlined text that can be mistaken for links while using colors that are too light to read."
            sandpackExample={
              <SandpackExample
                code={dontCenterTextWithTightLeading}
                hideControls
                hideEditor
                layout="column"
                name="Don't center text with tight leading"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <Heading accessibilityLevel={3} size="400">
          Text wrapping and truncation
        </Heading>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Wrap text to multiple lines when a user needs to see the full text to understand what is expected. This is likely to happen when translated to languages with longer line lengths."
            sandpackExample={
              <SandpackExample
                code={wrapTextWhenNeeded}
                hideControls
                hideEditor
                layout="column"
                name="Wrap text when needed"
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Truncate text in UI controls like buttons and menus where it can make it hard for a user to understand what is expected. On touch surfaces, a user won’t have a tooltip on hover."
            sandpackExample={
              <SandpackExample
                code={dontTruncateTextInControls}
                hideControls
                hideEditor
                layout="column"
                name="Don't truncate text in UI controls"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Truncate for secondary text that isn’t essential to a user’s comprehension of steps to take. Examples include dynamic data ad IDs in tables, lists of user names, and Pin titles that come from outside sources. Use an ellipsis or a link that indicates there is more content available."
            sandpackExample={
              <SandpackExample
                code={truncateForSecondaryText}
                hideControls
                hideEditor
                layout="column"
                name="Truncate for non-essential secondary text"
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Truncate paragraph text, which can be misread and change the original meaning of the text."
            sandpackExample={
              <SandpackExample
                code={dontTruncateParagraphText}
                hideControls
                hideEditor
                layout="column"
                name="Don't truncate paragraph text"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
