// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Link, Table, Text } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import A11Y from '../graphics/accessibility.svg';
import ColorEase from '../graphics/color-examples/colorEase.svg';
import Consistency from '../graphics/color-examples/consistency.svg';
import DefaultAlignment from '../graphics/typography/defaultAlignment.svg';

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
              color="teal-spabattical-500"
              image={<ColorEase />}
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
              color="orange-firetini-500"
              image={<Consistency />}
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
              color="blue-skycicle-500"
              image={<A11Y />}
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
          TBD
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Spacing">
        <MainSection.Subsection
          title="Line height"
          description="Line-height refers to the space between lines of text. We use default settings across all platforms."
        />
        <MainSection.Subsection>
          <Heading size="300">Web</Heading>
          <Text>
            We currently use browser defaults on web UIs so that lines of text are readable in all
            languages and scripts. For example, scripts like Hindi have larger ascenders and
            descenders than Latin scripts. Setting a fixed line height can make scripts like Hindi
            hard to read.
          </Text>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Latin script in Chrome with line-height set to “normal”, which is about 120% of font size"
            type="do"
            defaultCode={`
            <Flex direction="column" gap={2}>
            <Label htmlFor={"solo-color"}><Text>Audience 1</Text></Label>
            <Flex alignItems="center" gap={2}>
              <Box rounding="circle" color="infoBase" width={12} height={12}/>
              <SelectList
                id={"solo-color"}
                onChange={() => {}}
                options={[
                  {label: 'Your total audience', value: '5'},
                  {label: 'Active in the last week', value: '7'},
                  {label: 'Active in the last month', value: '30'},
                ]}
              />
            </Flex>
          </Flex>
`}
          />

          <MainSection.Card
            cardSize="md"
            description="Myanmar script in Chrome with line-heigh set to normal, which is about 200% of font size"
            type="do"
            defaultCode={`
            <Flex direction="column" gap={2}>
            <Label htmlFor={"solo-color"}><Text>Audience 1</Text></Label>
            <Flex alignItems="center" gap={2}>
              <Box rounding="circle" color="infoBase" width={12} height={12}/>
              <SelectList
                id={"solo-color"}
                onChange={() => {}}
                options={[
                  {label: 'Your total audience', value: '5'},
                  {label: 'Active in the last week', value: '7'},
                  {label: 'Active in the last month', value: '30'},
                ]}
              />
            </Flex>
          </Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <Heading size="300">iOS</Heading>
          <Text>
            iOS Leading is automatically determined by a font’s size. Below is a breakdown based on
            Gestalt’s current font sizes. For more info, refer to Apple’s{' '}
            <Link
              inline
              href="https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/"
            >
              Human Interface Guidelines
            </Link>
          </Text>
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
          <Heading size="300">Android</Heading>
          <Text>
            Line height is automatically determined by a font’s size. For more info, refer to{' '}
            <Link
              inline
              href="https://material.io/design/typography/the-type-system.html#type-scale"
            >
              Material Design
            </Link>
          </Text>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Paragraph spacing"
          description="Spacing after a paragraph in body copy should be 75% of the body copy font size."
        >
          TBD
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Character spacing"
          description="Character spacing is set to system defaults across all devices and platforms"
        />
      </MainSection>
      <MainSection name="Alignment">
        <MainSection.Subsection title="Default">
          <Flex>
            <Flex.Item>
              <DefaultAlignment />
            </Flex.Item>
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
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="Exceptions">TBD</MainSection.Subsection>
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
                  <Text size="200">TBD</Text>
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
                  <Text size="200">TBD</Text>
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
                  <Text size="200">TBD</Text>
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
                  <Text size="200">TBD</Text>
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
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use colors to support creating distinction between elements, such as define primary and secondary actions. See [color usage](/color_usage) for reference and appropriate tokens."
            defaultCode={`
            <Flex gap={4}>
              <IconButton
                icon="speech"
                iconColor="darkGray"
                accessibilityLabel="Comment"
              />
              <Button
                color="gray"
                text="Visit"
              />
              <Button
                color="red"
                text="Save"
              />
              <IconButton
                icon="share"
                iconColor="darkGray"
                accessibilityLabel="Share"
              />
            </Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use color as a sole indicator of information. Color-only changes do not work well for those who may be color blind or have low vision; always supply an icon or text label for context."
            defaultCode={`
            <Flex direction="column" gap={2}>
              <Label htmlFor={"solo-color"}><Text>Audience 1</Text></Label>
              <Flex alignItems="center" gap={2}>
                <Box rounding="circle" color="infoBase" width={12} height={12}/>
                <SelectList
                  id={"solo-color"}
                  onChange={() => {}}
                  options={[
                    {label: 'Your total audience', value: '5'},
                    {label: 'Active in the last week', value: '7'},
                    {label: 'Active in the last month', value: '30'},
                  ]}
                />
              </Flex>
            </Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use colors purposefully as it can convey meaning in multiple ways. Our extended color palette is used for communicating status or enhancing illustrations when needed. See [color usage](/color_usage) for reference."
            defaultCode={`
            <Flex direction="column" gap={3}>
              <Badge type="info" text="Info"/>
              <Badge type="success" text="Success" />
              <Badge type="warning" text="Warning"/>
              <Badge type="error" text="Error" />
              <Badge type="neutral" text="Neutral" />
            </Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Repurpose colors. Using colors for their intended meaning supports good comprehension and avoids usability and accessibility issues."
            defaultCode={`
            <Flex>
              <Flex direction="column" gap={2}>
                <Flex gap={2}>
                  <Label htmlFor="dont-01">
                    <Text weight="bold"> Search privacy</Text>
                  </Label>
                  <Badge inline type="error" text="New"/>
                </Flex>
                <Text color="subtle">Hide your profile from search engines</Text>
              </Flex>
              <Switch
                id={"dont-01"}
                onChange={() => {}}
              />
            </Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use extended colors to emphasize brand moments and reinforce Pinterest's style when appropriate to a specific use case without breaking an actual product UI pattern (e.g., onboarding, marketing announcements). Please reach out to the [Core Brand](https://brand.pinterest.com/) team for guidance."
            defaultCode={`
            <Box width={200} height={305}>
              <Image
                naturalWidth={"200"}
                naturalHeight={"350"}
                src="https://i.ibb.co/7yLs8qG/Brand.png"
                alt="An example of brand colors used in the Pinterest app."
              />
            </Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply alternative colors modifying Gestalt components or UI patterns as it can create inconsistency and cognitive issues."
            defaultCode={`
            <Flex gap={2}>
              <Box
                dangerouslySetInlineStyle={{
                  __style: {backgroundColor: 'gold'}
                }}
                rounding="pill"
                padding={3}
              >
                  <Text weight="bold">
                    Button
                  </Text>
              </Box>
              <Box
                dangerouslySetInlineStyle={{
                  __style: {backgroundColor: 'green'}
                }}
                rounding="circle"
                padding={3}
              >
                <Icon icon="add" color="inverse" accessibilityLabel="Create"/>
              </Box>
            </Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the established [typography](/color_usage#Typography-color) and [iconography](/color_usage#Iconography-color) color tokens so users can quickly scan and identify sentiment."
            defaultCode={`
            <Status
              type="ok"
              title="Campaign complete"
            />
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply alternative colors to text and icons. Always refer to [color usage](/color_usage) for the appropriate color pattern. "
            defaultCode={`
            <Flex gap={1} alignItems="center">
              <Icon icon="eye" accessibilityLabel="views"/>
              <Text weight="bold">
                <Box dangerouslySetInlineStyle={{
                  __style: {color: 'darkmagenta'}
                }}>
                  views
                </Box>
              </Text>
            </Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the appropriate [color tokens](/design_tokens) to switch between themes (light and dark mode). It ensures consistency and avoids accessibility issues."
            defaultCode={`
            <Flex direction="column" gap={8} alignItems="center">
              <Flex gap={4}>
                <IconButton icon="speech" accessibilityLabel="Comment" />
                <IconButton icon="share" iconColor="darkGray" accessibilityLabel="Share"/>
              </Flex>
              <Flex gap={4}>
                <Button color="red" text="Primary" />
                <Button color="gray" text="Secondary" />
                <Button color="blue" text="Shop" />
              </Flex>
              <Flex gap={4}>
                <SearchField
                  accessibilityLabel={'Search you Pins'}
                  id={'color-do-search'}
                  placeholder="Search your Pins"
                  onChange={() => {}}
                />
              </Flex>
              <Flex gap={8}>
                <Text>Default text</Text>
                <Text color="subtle">Subtle text</Text>
              </Flex>
            </Flex>
`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply alternative colors not specified in our color tokens when switching between themes. If a new color value is needed for a specific use case, [let the Gestalt team know](https://gestalt.netlify.app/how_to_work_with_us#Meetings-and-events) and we will evaluate."
            defaultCode={`
            <ColorSchemeProvider colorScheme="dark" id="dark-example-dont">
              <Box color="white" padding={10}>
                <Flex direction="column" gap={8} alignItems="center">
                  <Flex gap={4}>
                    <IconButton icon="speech" accessibilityLabel="Comment"/>
                    <IconButton icon="share" iconColor="darkGray" accessibilityLabel="Share" />
                  </Flex>
                  <Flex gap={4}>
                    <Button color="red" text="Primary" />
                      <Box color="warningWeak" rounding="pill" padding={3}>
                        <TapArea color="white">
                          <Text weight="bold" color="inverse">
                            Secondary
                          </Text>
                        </TapArea>
                      </Box>
                    <Button color="blue" text="Shop" />
                  </Flex>
                  <Flex gap={4}>
                    <SearchField
                      accessibilityLabel={'Search you Pins'}
                      id={'color-dont-search'}
                      placeholder="Search your Pins"
                      onChange={() => {}}
                    />
                  </Flex>
                  <Flex gap={8}>
                    <Text>Default text</Text>
                    <Text color="subtle">Subtle text</Text>
                  </Flex>
                </Flex>
              </Box>
            </ColorSchemeProvider>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use designated elevation color values and styles on light and dark mode themes. See [elevation guidelines](/elevation) for guidance."
            defaultCode={`
            <Box width={200} height={305}>
              <Image
                fit="contain"
                naturalWidth={"200"}
                naturalHeight={"350"}
                src="https://i.ibb.co/5rQQnDR/screen-sample-01.png"
                alt="Example showing mobile dark mode on the Pinterest app."
              />
            </Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply colors and styles not available in our elevation tokens to elevate surfaces as it can create inconsistency, and eye strain. If a different color value is needed for a specific elevation use case, [let the Gestalt team know](https://gestalt.netlify.app/how_to_work_with_us#Meetings-and-events) and we will assist."
            defaultCode={`
            <Box width={200} height={305}>
              <Image
                fit="contain"
                naturalWidth={"200"}
                naturalHeight={"350"}
                src="https://i.ibb.co/FqM70HS/screen-sample-02.png"
                alt="Example showing an incorrect mobile dark mode on the Pinterest app."
              />
            </Box>
`}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
