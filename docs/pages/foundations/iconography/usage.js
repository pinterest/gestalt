// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts.js';
import MainSection from '../../../docs-components/MainSection.js';
import Markdown from '../../../docs-components/Markdown.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import PrincipleItem from '../../../docs-components/PrincipleItem.js';
import CreditCards from '../../../graphics/iconography/creditCards.svg';
import Layout from '../../../graphics/iconography/layout.svg';
import OutlinedPincode from '../../../graphics/iconography/outlinedPincode.svg';
import ReactionLove from '../../../graphics/iconography/reactionLove.svg';

export default function IconographyPage(): Node {
  return (
    <Page title="Iconography usage">
      <PageHeader
        name="Iconography usage"
        description={`Our iconography system provides symbolic representations of key actions and elements within an interface.
    `}
        type="guidelines"
      />

      <MainSection name="Principles">
        <Flex gap={12} alignContent="between" wrap>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              heading="Obvious"
              text={
                <Text>
                  Simple, intuitive, and easily recognizable. Each icon is consolidated to its
                  minimal form, expressing fundamental aspects. Icons should feel balanced, and
                  align elements optically.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              heading="Intentional"
              text={
                <Text>
                  Icons should be used purposefully for their intended meaning of supporting good
                  comprehension. If questioning an icon’s use, it probably doesn’t need to be used
                  at all.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              heading="Accessible"
              text={
                <Text>
                  We aim to a shape that ensures readability and clearness, even at small sizes. Our
                  icons should be understandable by a global audience of users, regardless of
                  nationality or language.
                </Text>
              }
            />
          </Flex.Item>
        </Flex>
      </MainSection>

      <MainSection
        name="Iconography components"
        description={`
Some of our React components use icons as primary elements to call attention to a particular action or information.

- [Icon](/web/icon): The symbolic representation of an action or information, providing visual context and improving usability.
- [IconButton](/web/iconbutton): Uses icons instead of text to convey available actions on a screen.
- [Status](/web/status): A graphic indicator of an element’s state.
- [Link](/web/link): External links use the visit icon as an external domain indicator.
`}
      />

      <MainSection name="Characteristics">
        <MainSection.Subsection
          title="Appearance"
          description={`The majority of our icons present a filled style. [Usability studies](https://cdr.lib.unc.edu/concern/masters_papers/6w924g35w) demonstrated that solid icons are typically faster to recognize than outline icons and offer a simpler shape, making the icons more identifiable and providing better scalability. Theretofore, some of our icons have an outlined treatment to give a clear visual concept in certain instances where the filled style doesn't apply.

When choosing icons, we recommend sticking to a consistent style as much as possible to avoid usability issues. In addition, displaying two different aesthetics could confuse users regarding behaviors and interactions.

Get in touch with us if an aesthetic change is needed, and we will evaluate the case.`}
        >
          <Box color="infoWeak" paddingX={4} paddingY={12} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 8,
              }}
            >
              <Flex
                gap={{
                  row: 8,
                  column: 0,
                }}
                justifyContent="center"
              >
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="home" accessibilityLabel="home" size={24} color="default" />
                  <Text size="100">home</Text>
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="heart" accessibilityLabel="heart" size={24} color="default" />
                  <Text size="100">heart</Text>
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="lock" accessibilityLabel="lock" size={24} color="default" />
                  <Text size="100">lock</Text>
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="trash-can" accessibilityLabel="trash can" size={24} color="default" />
                  <Text size="100">trash-can</Text>
                </Flex>
              </Flex>
              <Flex
                gap={{
                  row: 8,
                  column: 0,
                }}
                justifyContent="center"
              >
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="search" accessibilityLabel="search" size={24} color="default" />
                  <Text size="100">search</Text>
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="calendar" accessibilityLabel="calendar" size={24} color="default" />
                  <Text size="100">calendar</Text>
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="visit" accessibilityLabel="visit" size={24} color="default" />
                  <Text size="100">visit</Text>
                </Flex>
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                  width={64}
                >
                  <Icon icon="globe" accessibilityLabel="globe" size={24} color="default" />
                  <Text size="100">globe</Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Markdown text="Check out our [Iconography collection](/foundations/iconography/library) to explore all of our available icons." />
          </Box>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Size"
          description="Our icons are pixel-snapped for each singular case. Using a size not available in our size scale can cause the proportions to be off-balance and create an unintentional hierarchy within the Pinner experience. Our icons are purposefully designed to scale proportionally. Icons should fit organically in your design and feel balanced and optical aligned. In addition, we must ensure that your users can use your icons without the need for zooming."
        >
          <Box color="infoWeak" paddingX={4} paddingY={12} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Flex
              gap={{
                row: 8,
                column: 0,
              }}
              justifyContent="center"
            >
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
                justifyContent="center"
              >
                <Flex alignItems="center" justifyContent="center" width={32} height={32}>
                  <Icon icon="bell" accessibilityLabel="bell" size={12} color="default" />
                </Flex>
                <Text size="100">12px</Text>
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
                justifyContent="center"
              >
                <Flex alignItems="center" justifyContent="center" width={32} height={32}>
                  <Icon icon="bell" accessibilityLabel="bell" size={14} color="default" />
                </Flex>
                <Text size="100">14px</Text>
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
                justifyContent="center"
              >
                <Flex alignItems="center" justifyContent="center" width={32} height={32}>
                  <Icon icon="bell" accessibilityLabel="bell" size={16} color="default" />
                </Flex>
                <Text size="100">16px</Text>
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
                justifyContent="center"
              >
                <Flex alignItems="center" justifyContent="center" width={32} height={32}>
                  <Icon icon="bell" accessibilityLabel="bell" size={24} color="default" />
                </Flex>
                <Text size="100">24px</Text>
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
              >
                <Flex alignItems="center" justifyContent="center" width={32} height={32}>
                  <Icon icon="bell" accessibilityLabel="bell" size={32} color="default" />
                </Flex>
                <Text size="100">32px </Text>
              </Flex>
            </Flex>
          </Box>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Markdown
              text={`
Icon sizes and guidelines (in px):

**12**
Used sparingly in tight spaces. When possible, use a text label next to the icon, as it can be hard to see for visually impaired people (this size applies only to Web)

**14**
Used often following body text content any time an icon is needed (this size applies only to Web)

**16**
Used often any time an icon is needed. Default icon size

**20**
Used only when paired with a 16pt text (this size applies only to iOS and Android)

**24**
Used frequently any time an icon is needed

**32**
Used occasionally, on more dense UI

**32+**
Should be used sparingly and only in places where the UI is very dense and a larger icon is required

Generally 16px and 24px icons should be used in mobile interfaces. When icons are interactive, they should use [IconButton](/web/iconbutton) with its built in 44 x 44px touch targets.
          `}
            />
          </Box>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Color"
          description="Icons can display all of our [color design tokens](/foundations/design_tokens) options. However, we advise using colors semantically to avoid usability issues."
        >
          <Box color="infoWeak" paddingX={4} paddingY={12} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Flex
              gap={{
                row: 8,
                column: 0,
              }}
              justifyContent="center"
            >
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
              >
                <Icon icon="heart" accessibilityLabel="heart" size={24} color="error" />
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
              >
                <Icon icon="heart" accessibilityLabel="heart" size={24} color="default" />
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
              >
                <Icon icon="heart" accessibilityLabel="heart" size={24} color="default" />
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
              >
                <Icon icon="heart" accessibilityLabel="heart" size={24} color="info" />
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
                alignItems="center"
              >
                <Icon icon="heart" accessibilityLabel="heart" size={24} color="success" />
              </Flex>
            </Flex>
          </Box>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Markdown text="Learn how to use colors by checking our [Iconography color guidelines](/foundations/color/usage#Iconography-color)." />
          </Box>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Platform-specific"
          description={`Our icons are used across multiple platforms, so we ensure that our icons are as similar as possible across all these platforms. However, some icons have already established conventions on specific platforms. In these cases, it's beneficial to follow the system's standards. Please note: We provide platform-specific icons (e.g., share, check, back).`}
        >
          <Flex
            gap={{
              row: 4,
              column: 0,
            }}
            wrap
          >
            <Box color="infoWeak" padding={8} width={240}>
              <Flex
                gap={{
                  row: 8,
                  column: 0,
                }}
                justifyContent="center"
              >
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                >
                  <Icon
                    icon="android-share"
                    accessibilityLabel="share for android"
                    size={24}
                    color="default"
                  />
                  <Text size="100">Android share</Text>
                </Flex>
              </Flex>
            </Box>
            <Box color="infoWeak" padding={8} width={240}>
              <Flex
                gap={{
                  row: 8,
                  column: 0,
                }}
                justifyContent="center"
              >
                <Flex
                  direction="column"
                  gap={{
                    row: 0,
                    column: 2,
                  }}
                  alignItems="center"
                >
                  <Icon icon="share" accessibilityLabel="share for iOS" size={24} color="default" />
                  <Text size="100">iOS share</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Markdown text="Please [get in touch](/team_support/get_help#Slack-channels) if you need specific iOS and Android icons guidelines." />
          </Box>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Layout"
          description="All Gestalt icons fit a 24px square grid template to create balance with rounded UI elements. We snap to the pixel and when not possible, we use lines and shapes measuring a maximum of 2 decimal points in increments of 0.25px, for example 2px, 2.25px, 2.5px, 2.75px. In addition, we use simple geometry and a minimum line weight of 2.5px to keep consistency across our surfaces. Our icon grid includes a safe area to ensure they feel balanced and align elements optically."
        >
          <Box color="infoWeak" padding={8} width={240}>
            <Flex justifyContent="center">
              <Layout />
            </Flex>
          </Box>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="A11y: Use icons semantically and provide meaningful text whenever it is possible."
            defaultCode={`
<Flex gap={{ row: 2, column: 0 }} alignItems="center">
  <Icon icon="sparkle" accessibilityLabel="sparkle" color="default" size={16} />
  <Text>Recommendation text</Text>
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use icons without labels for decoration or visual interest."
            defaultCode={`
<Icon icon="sparkle" accessibilityLabel="sparkle" color="default" size={16} />
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="A11y: Stick to our [design tokens](/foundations/color/usage#Iconography-color) and use color combinations with at least 3:1 contrast ratio between foreground and background."
            defaultCode={`
<Box color="infoWeak" padding={12} display="inlineBlock" rounding={4}>
  <Icon icon="shopping-bag" accessibilityLabel="shopping bag" color="default" size={24} />
</Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use colors that doesn’t pass 3:1 contrast ratio. Ensure the icon color is compliant with the Web Content Accessibility Guidelines [(WCAG) 2.1 AA standard](/foundations/accessibility#Visuals) color contrast ratio."
            defaultCode={`
<Box color="infoWeak" padding={12} display="inlineBlock" rounding={4}>
  <Icon icon="shopping-bag" accessibilityLabel="shopping bag" color="light" size={24} />
</Box>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Style: Use our icons following the Gestalt design specs."
            defaultCode={`
<Icon icon="pincode" accessibilityLabel="pin code" color="default" size={32} />
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Modify our icon's design specs. Changing an icon shape can make the icon hard to read for Pinners and feel like a different visual language."
          >
            <OutlinedPincode />
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Alignment: Center-align icons when they’re next to a text element."
          >
            <Flex
              gap={{
                row: 1,
                column: 0,
              }}
              alignItems="center"
            >
              <ReactionLove />
              <Text>2.8k</Text>
            </Flex>
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Baseline-align icons to the text element."
          >
            <Flex
              gap={{
                row: 1,
                column: 0,
              }}
            >
              <ReactionLove />
              <Text>2.8k</Text>
            </Flex>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection
          description="
- Icons must meet the [Non-Text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) requirement.
- Avoid using unfamiliar icons. Always refer to Gestalt available icons. A new icon needs to be user-tested to evaluate comprehension.
- Icons should be universal across cultures, regions, ages and backgrounds without need for translation. Be mindful of your audience and use symbols and labels that resonate with them.
- Some icons don't translate well in all cultures, so it's preferred to user-test each icon before it is added to Gestalt.
"
        />
      </MainSection>

      <MainSection name="Logos as icons">
        <MainSection.Subsection
          description={`Logos are third-party visual elements we only recommend setting as an icon when it is understandable by a global audience of users and meet our icon's principles and usage guidelines. For example, a payment credit card flag is required as an icon in a payment flow to support comprehension. In this case, aim for an internationally recognized logo in place of a locally recognized logo that may only apply to a specific background or culture.`}
        >
          <Box color="infoWeak" padding={8} width={240}>
            <Flex justifyContent="center">
              <CreditCards />
            </Flex>
          </Box>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Markdown text="If you need a new logo set as an icon, [reach out to us](/team_support/get_help#Meetings-and-events), and we will direct you." />
          </Box>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Future updates"
        description="Our guidelines primarily cover user interface use cases for iconography. However, we will improve the icons guidelines by evaluating our aesthetic standards, visual specs, and iconography search experience in the future."
      >
        <MainSection.Subsection
          title="Aesthetic styles and design specs"
          description="We plan to research and evaluate the need for two sets of icons: filled and hollow. In addition, we will address standards and guidelines for the icon design specs."
        />
        <MainSection.Subsection
          title="Iconography search experience"
          description="One of our goals is to enhance our search experience in our [Iconography and SVG page](/foundations/iconography/library), as well as establish guidelines for when to use each type of icon available in our collection."
        />
        <MainSection.Subsection
          title="Collaboration model"
          description="We are evaluating a collaboration model for icons and system of icons. Stay tuned."
        />
      </MainSection>
    </Page>
  );
}
