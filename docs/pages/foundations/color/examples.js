// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Page from '../../../docs-components/Page.js';
import A11Y from '../../../graphics/home-page/accessibility.svg';
import ColorEase from '../../../graphics/color-examples/colorEase.svg';
import Consistency from '../../../graphics/color-examples/consistency.svg';

import alternativeColors from '../../../examples/colors/alternativeColorsExample.js';
import alternativeColorTextExample from '../../../examples/colors/alternativeColorTextExample.js';
import alternativeColorTokensExample from '../../../examples/colors/alternativeColorTokensExample.js';
import appropriateColorTokensExample from '../../../examples/colors/appropriateColorTokensExample.js';
import communicateStatusExample from '../../../examples/colors/communicateStatusExample.js';
import distinctionExample from '../../../examples/colors/distinctionExample.js';
import establishedExample from '../../../examples/colors/establishedExample.js';
import extendedColors from '../../../examples/colors/extendedColorsExample.js';
import invalidElevationExample from '../../../examples/colors/invalidElevationExample.js';
import repurposeExample from '../../../examples/colors/repurposeExample.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import soleIndicatorExample from '../../../examples/colors/soleIndicatorExample.js';
import validElevationExample from '../../../examples/colors/validElevationExample.js';

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
                  <Link inline href="/foundations/color/usage">
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
                    href="/foundations/color/palette#Extended-palette"
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
                  <Link inline href="/foundations/accessibility">
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
            sandpackExample={
              <SandpackExample
                code={distinctionExample}
                name="Color distinction example"
                hideEditor
                previewHeight={286}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use color as a sole indicator of information. Color-only changes do not work well for those who may be color blind or have low vision; always supply an icon or text label for context."
            sandpackExample={
              <SandpackExample
                code={soleIndicatorExample}
                name="Sole indicator example"
                hideEditor
                hideControls
                previewHeight={286}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use colors purposefully as it can convey meaning in multiple ways. Our extended color palette is used for communicating status or enhancing illustrations when needed. See [color usage](/foundations/color/usage) for reference."
            sandpackExample={
              <SandpackExample
                code={communicateStatusExample}
                name="Communicate status example"
                hideEditor
                previewHeight={286}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Repurpose colors. Using colors for their intended meaning supports good comprehension and avoids usability and accessibility issues."
            sandpackExample={
              <SandpackExample
                code={repurposeExample}
                name="Repurpose colors example"
                hideEditor
                hideControls
                previewHeight={286}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use extended colors to emphasize brand moments and reinforce Pinterest's style when appropriate to a specific use case without breaking an actual product UI pattern (e.g., onboarding, marketing announcements). Please reach out to the [Core Brand](BRAND_PINTEREST) team for guidance."
            sandpackExample={
              <SandpackExample
                code={extendedColors}
                name="Extended colors example"
                hideEditor
                previewHeight={400}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply alternative colors modifying Gestalt components or UI patterns as it can create inconsistency and cognitive issues."
            sandpackExample={
              <SandpackExample
                code={alternativeColors}
                name="Alternative colors example"
                hideEditor
                hideControls
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the established [typography](/foundations/color/usage#Typography-color) and [iconography](/foundations/color/usage#Iconography-color) color tokens so users can quickly scan and identify sentiment."
            sandpackExample={
              <SandpackExample
                code={establishedExample}
                name="Established colors example"
                hideEditor
                previewHeight={286}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply alternative colors to text and icons. Always refer to [color usage](/foundations/color/usage) for the appropriate color pattern. "
            sandpackExample={
              <SandpackExample
                code={alternativeColorTextExample}
                name="Alternative color text example"
                hideEditor
                hideControls
                previewHeight={286}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the appropriate [color tokens](/foundations/design_tokens) to switch between themes (light and dark mode). It ensures consistency and avoids accessibility issues."
            sandpackExample={
              <SandpackExample
                code={appropriateColorTokensExample}
                name="Appropriate color tokens example"
                hideEditor
                previewHeight={400}
              />
            }
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply alternative colors not specified in our color tokens when switching between themes. If a new color value is needed for a specific use case, [let the Gestalt team know](/get_started/how_to_work_with_us#Meetings-and-events) and we will evaluate."
            sandpackExample={
              <SandpackExample
                code={alternativeColorTokensExample}
                name="Alternative color tokens example"
                hideEditor
                hideControls
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use designated elevation color values and styles on light and dark mode themes. See [elevation guidelines](/foundations/elevation) for guidance."
            sandpackExample={
              <SandpackExample
                code={validElevationExample}
                name="Valid elevation example"
                hideEditor
                previewHeight={400}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Apply colors and styles not available in our elevation tokens to elevate surfaces as it can create inconsistency, and eye strain. If a different color value is needed for a specific elevation use case, [let the Gestalt team know](/get_started/how_to_work_with_us#Meetings-and-events) and we will assist."
            sandpackExample={
              <SandpackExample
                code={invalidElevationExample}
                name="Invalid elevation example"
                hideEditor
                hideControls
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
