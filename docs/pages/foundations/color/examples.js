// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import PrincipleItem from '../../../docs-components/PrincipleItem';
import SandpackExample from '../../../docs-components/SandpackExample';
import alternativeColors from '../../../examples/colors/alternativeColorsExample';
import alternativeColorTextExample from '../../../examples/colors/alternativeColorTextExample';
import alternativeColorTokensExample from '../../../examples/colors/alternativeColorTokensExample';
import appropriateColorTokensExample from '../../../examples/colors/appropriateColorTokensExample';
import communicateStatusExample from '../../../examples/colors/communicateStatusExample';
import distinctionExample from '../../../examples/colors/distinctionExample';
import establishedExample from '../../../examples/colors/establishedExample';
import extendedColors from '../../../examples/colors/extendedColorsExample';
import invalidElevationExample from '../../../examples/colors/invalidElevationExample';
import repurposeExample from '../../../examples/colors/repurposeExample';
import soleIndicatorExample from '../../../examples/colors/soleIndicatorExample';
import validElevationExample from '../../../examples/colors/validElevationExample';

export default function ColorExamplesPage(): ReactNode {
  return (
    <Page title="Color examples">
      <PageHeader
        name="Color examples"
        description="Color principles and best practices examples of applying color to product UI."
        type="guidelines"
      />
      <MainSection name="Color principles">
        <Flex gap={12} alignContent="between" wrap>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleItem
              heading="Ease of content"
              text={
                <Text>
                  Pinterest user content is varied; from rich pin boards featuring every color
                  imaginable to complex charts and graphs for our business and platform interfaces.
                  Having a limited range of colors supports consistency, making our product easier
                  to interact with. Keep in mind that continuous use of high-contrast and saturated
                  colors can create fatigue and eye strain. See our{' '}
                  <Link display="inlineBlock" href="/foundations/color/usage">
                    <Text underline>color usage guidelines</Text>
                  </Link>{' '}
                  for more information about our color choices.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={260}>
            <PrincipleItem
              heading="Consistency of visuals"
              text={
                <Text>
                  Colors should be applied purposefully, as they can convey meaning in numerous
                  ways. For example, colors often change between light and dark modes to help
                  portray elevation and hierarchy, while ensuring proper contrast and legibility.
                  Any colors used should be consistent with the full{' '}
                  <Link display="inlineBlock" href="/foundations/color/palette#Extended-palette">
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
            <PrincipleItem
              heading="Accessible information"
              text={
                <Text>
                  All color pairings must pass WCAG&apos;s AA color contrast standards. Using our
                  color tokens properly ensures our colors meet legibility standards. Check out our{' '}
                  <Link display="inlineBlock" href="/foundations/accessibility">
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
            description="Use extended colors to emphasize brand moments and reinforce Pinterest's style when appropriate to a specific use case without breaking an actual product UI pattern (e.g., onboarding, marketing announcements). Please reach out to the [Core Brand](https://brand.pinterest.com/) team for guidance."
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
            description="Apply alternative colors not specified in our color tokens when switching between themes. If a new color value is needed for a specific use case, [let the Gestalt team know](/team_support/get_help#Meetings-and-events) and we will evaluate."
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
            description="Apply colors and styles not available in our elevation tokens to elevate surfaces as it can create inconsistency, and eye strain. If a different color value is needed for a specific elevation use case, [let the Gestalt team know](/team_support/get_help#Meetings-and-events) and we will assist."
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
