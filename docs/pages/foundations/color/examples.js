// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Page from '../../../docs-components/Page.js';
import A11Y from '../../../graphics/home-page/accessibility.svg';
import ColorEase from '../../../graphics/color-examples/colorEase.svg';
import Consistency from '../../../graphics/color-examples/consistency.svg';

type PrincipleCardProps = {|
  color: string,
  image?: Node,
  text: string | Node,
  heading: string,
|};
function PrincipleLayout({ color, image, text, heading }: PrincipleCardProps): Node {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 4,
      }}
    >
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

export default function ColorExamplesPage(): Node {
  return (
    <Page title="Color examples">
      <PageHeader
        name="Color examples"
        description="Color principles and best practices examples of applying color to product UI."
        type="guidelines"
      />
      <MainSection name="Color principles">
        <Flex
          gap={{
            row: 12,
            column: 0,
          }}
          alignContent="between"
          wrap
        >
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleLayout
              color="teal-spabattical-500"
              image={<ColorEase />}
              heading="Ease of content"
              text={
                <Text>
                  Pinterest user content is varied; from rich pin boards featuring every color
                  imaginable to complex charts and graphs for our business and platform interfaces.
                  Having a limited range of colors supports consistency, making our product easier
                  to interact with. Keep in mind that continuous use of high-contrast and saturated
                  colors can create fatigue and eye strain. See our{' '}
                  <Link inline href="https://gestalt.pinterest.systems/foundations/color/usage">
                    <Text underline>color usage guidelines</Text>
                  </Link>{' '}
                  for more information about our color choices.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleLayout
              color="orange-firetini-500"
              image={<Consistency />}
              heading="Consistency of visuals"
              text={
                <Text>
                  Colors should be applied purposefully, as they can convey meaning in numerous
                  ways. For example, colors often change between light and dark modes to help
                  portray elevation and hierarchy, while ensuring proper contrast and legibility.
                  Any colors used should be consistent with the full{' '}
                  <Link
                    inline
                    href="https://gestalt.pinterest.systems/foundations/color/palette#Extended-palette"
                  >
                    <Text inline underline>
                      Pinterest color palette
                    </Text>
                  </Link>{' '}
                  and follow our color standards and guidelines.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleLayout
              color="blue-skycicle-500"
              image={<A11Y />}
              heading="Accessible information"
              text={
                <Text>
                  All color pairings must pass WCAG&apos;s AA color contrast standards. Using our
                  color tokens properly ensures our colors meet legibility standards. Check out our{' '}
                  <Link inline href="https://gestalt.pinterest.systems/foundations/accessibility">
                    <Text inline underline>
                      accessibility guidelines
                    </Text>
                  </Link>{' '}
                  for design guidance and color contrast tools information.
                </Text>
              }
            />
          </Flex.Item>
        </Flex>
      </MainSection>
      <MainSection name="Color best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use colors to support creating distinction between elements, such as define primary and secondary actions. See [color usage](/foundations/color/usage) for reference and appropriate tokens."
            defaultCode={`
            <Flex gap={{ row: 4, column: 0 }}>
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
            <Flex direction="column" gap={{ column: 2, row: 0 }}>
              <Label htmlFor={"solo-color"}><Text>Audience 1</Text></Label>
              <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
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
            description="Use colors purposefully as it can convey meaning in multiple ways. Our extended color palette is used for communicating status or enhancing illustrations when needed. See [color usage](/foundations/color/usage) for reference."
            defaultCode={`
            <Flex direction="column" gap={{ column: 3, row: 0 }}>
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
              <Flex direction="column" gap={{ column: 2, row: 0 }}>
                <Flex gap={{ column: 0, row: 2 }}>
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
            <Flex gap={{ column: 0, row: 2 }}>
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
            description="Use the established [typography](/foundations/color/usage#Typography-color) and [iconography](/foundations/color/usage#Iconography-color) color tokens so users can quickly scan and identify sentiment."
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
            description="Apply alternative colors to text and icons. Always refer to [color usage](/foundations/color/usage) for the appropriate color pattern. "
            defaultCode={`
            <Flex gap={{ row: 1, column: 0 }} alignItems="center">
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
            description="Use the appropriate [color tokens](/foundations/design_tokens) to switch between themes (light and dark mode). It ensures consistency and avoids accessibility issues."
            defaultCode={`
            <Flex direction="column" gap={{ column: 8, row: 0 }} alignItems="center">
              <Flex gap={{ column: 0, row: 4 }}>
                <IconButton icon="speech" accessibilityLabel="Comment" />
                <IconButton icon="share" iconColor="darkGray" accessibilityLabel="Share"/>
              </Flex>
              <Flex gap={{ column: 0, row: 4 }}>
                <Button color="red" text="Primary" />
                <Button color="gray" text="Secondary" />
                <Button color="blue" text="Shop" />
              </Flex>
              <Flex gap={{ column: 0, row: 4 }}>
                <SearchField
                  accessibilityLabel={'Search you Pins'}
                  id={'color-do-search'}
                  placeholder="Search your Pins"
                  onChange={() => {}}
                />
              </Flex>
              <Flex gap={{ column: 0, row: 8 }}>
                <Text>Default text</Text>
                <Text color="subtle">Subtle text</Text>
              </Flex>
            </Flex>
`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply alternative colors not specified in our color tokens when switching between themes. If a new color value is needed for a specific use case, [let the Gestalt team know](https://gestalt.pinterest.systems/get_started/how_to_work_with_us#Meetings-and-events) and we will evaluate."
            defaultCode={`
            <ColorSchemeProvider colorScheme="dark" id="dark-example-dont">
              <Box color="default" padding={10}>
                <Flex direction="column" gap={{ column: 8, row: 0 }} alignItems="center">
                  <Flex gap={{ column: 0, row: 4 }}>
                    <IconButton icon="speech" accessibilityLabel="Comment"/>
                    <IconButton icon="share" iconColor="darkGray" accessibilityLabel="Share" />
                  </Flex>
                  <Flex gap={{ column: 0, row: 4 }}>
                    <Button color="red" text="Primary" />
                      <Box color="warningWeak" rounding="pill" padding={3}>
                        <TapArea color="white">
                          <Text weight="bold" color="light">
                            Secondary
                          </Text>
                        </TapArea>
                      </Box>
                    <Button color="blue" text="Shop" />
                  </Flex>
                  <Flex gap={{ column: 0, row: 4 }}>
                    <SearchField
                      accessibilityLabel={'Search you Pins'}
                      id={'color-dont-search'}
                      placeholder="Search your Pins"
                      onChange={() => {}}
                    />
                  </Flex>
                  <Flex gap={{ column: 0, row: 8 }}>
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
            description="Use designated elevation color values and styles on light and dark mode themes. See [elevation guidelines](/foundations/elevation) for guidance."
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
            description="Apply colors and styles not available in our elevation tokens to elevate surfaces as it can create inconsistency, and eye strain. If a different color value is needed for a specific elevation use case, [let the Gestalt team know](https://gestalt.pinterest.systems/get_started/how_to_work_with_us#Meetings-and-events) and we will assist."
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
