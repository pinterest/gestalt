// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function MessagingComponentsPage(): Node {
  return (
    <Page title="Color fills">
      <PageHeader
        name="Color fills"
        type="guidelines"
        description={`Pinterest product UI should be comprised of our hero and neutrals colors. We should continue to use our baseline color palette to allow photography, actions, and content to stand out. However, there are situations where color fills can help to express brand moments on product surfaces.

We recommend using the [extended color palette](https://gestalt.pinterest.systems/foundations/color/palette#Colors) to bring attention to a specific brand or marketing moment, such as celebratory news, a new feature announcement, or educational flows. However, be mindful of color choices when applying color fills to UI elements next to status messages, as they use semantic colors to convey a specific meaning. See [background color usage](https://gestalt.pinterest.systems/foundations/color/usage#Base-background-colors) for reference.

The Core brand team created a [baseline brand palette](https://www.figma.com/file/xjnifcms6gq4TVuHpbUSju/?node-id=2%3A13134) with some of our extended colors; you can enable it as a library in your Figma file.`}
      />
      <Image
        src="https://i.pinimg.com/originals/6d/5d/f1/6d5df1699ff6d7f176302f94dc28306e.png"
        naturalHeight={1036}
        naturalWidth={1798}
        alt="screenshot of brand color swatches in Figma"
      />
      <Text align="center" size="100">
        Brand color swatches available in Figma (Baseline brand colors library)
      </Text>
      <Text>
        See below an example of brand expression in the product UI using color fill combined with
        other visual assets.{' '}
      </Text>
      <Image
        src="https://i.pinimg.com/originals/5d/cf/95/5dcf95eb3addf436c1404daf4874d580.png"
        naturalHeight={1216}
        naturalWidth={1792}
        alt="three examples of brand expression in the product using appropriate colors"
      />
      <Text align="center" size="100">
        Idea Pin tips - Using color fills to bring brand expression{' '}
      </Text>
      <Text>
        Reach out to Core Brand for photography guidance, imagery and other types of visual assets.{' '}
      </Text>
      <MainSection name="Color usage">
        <MainSection.Subsection
          title="Color fills and dark-mode"
          description={`Aim for sufficient color contrast in all appearances, no matter the color theme (light or dark mode). Our colors were defined to support you in achieving a reasonable contrast ratio between your foreground and background content in both appearances. At a minimum, ensure the contrast ratio between colors is no lower than 4.5:1, as this ratio ensures that your foreground content stands out from the background and helps your content meet recommended [WCAG 2.1 AA accessibility standards](https://www.w3.org/TR/WCAG21/).

We suggest checking [Brand color expression + accessibility](https://brand.pinterest.com/color/) for references on color combination considering both themes. You can also use [color pairing Figma plugin](https://www.figma.com/proto/WojVVmZpVP1aJcWPekckkP/Pinterest-Brand-Figma-Plugins?page-id=0%3A1&node-id=3%3A454&viewport=311%2C48%2C0.65&scaling=contain&starting-point-node-id=10%3A179) to test your color contrast level.
When using images or icons over color fills, ensure they look good in both themes. For icons, use the appropriate color tokens for each theme to provide readability and a great usability experience. For images, we suggest using the same asset if it looks good in both light and dark appearances. Consider softening the image treatment to avoid eye strain or to improve visibility; use your best judgment.

For more information about colors, check out our [color documentation](/foundations/color/palette).
`}
        />

        <MainSection.Subsection
          title="Color fills and typography"
          description={`
#### Headings
Avoid using extended colors to text elements, as changing colors could lead to usability and cognitive issues due to their semantic meaning and required contrast level. Refer to our [text color tokens](/foundations/design_tokens#Text-color) for guidance.

#### Body
Body should always be $color-text-default (default color), $color-text-inverse (text over a dark-colored background), or $color-text-subtle (secondary color), with the exception of [status text colors](/foundations/color/usage#Background-color), as they are needed to convey a certain meaning for specific cases. Avoid using alternative colors on body content, which could lead to [accessibility](/foundations/accessibility#Visuals) issues.

**Please note:** It only applies to product UI elements. For marketing websites, materials or promotional landing pages [reach out to Core Brand](https://brand.pinterest.com/) for text color guidance.

See below examples of UI elements using the appropriate text colors over color fills.
        `}
        >
          <Flex gap={12} direction="column">
            <Flex gap={12} wrap alignItems="end">
              <Flex.Item minWidth={320} flex="grow">
                <Flex direction="column" gap={4}>
                  <Image
                    src="https://i.pinimg.com/originals/6e/f3/5c/6ef35ce8021c2aa5502c18f50f2ef966.png"
                    naturalHeight={480}
                    naturalWidth={718}
                    alt="example of using a green background with white text"
                  />
                  <Text align="center" size="100">
                    Matchacado-green-500 + $color-text-inverse
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item minWidth={320} flex="grow">
                <Flex direction="column" gap={4}>
                  <Image
                    src="https://i.pinimg.com/originals/e8/49/7c/e8497ce56cdab39f1af97864e31d5a99.png"
                    naturalHeight={416}
                    naturalWidth={686}
                    alt="example of a using light orange background with dark text"
                  />
                  <Text align="center" size="100">
                    Firetine-orange-100 + $color-text-default
                  </Text>
                </Flex>
              </Flex.Item>
            </Flex>
            <Flex gap={12} wrap alignItems="end">
              <Flex.Item minWidth={320} flex="grow">
                <Flex direction="column" gap={4}>
                  <Image
                    src="https://i.pinimg.com/originals/b2/f4/a4/b2f4a4bb96fa7579d13be3c6b1a60874.png"
                    naturalHeight={410}
                    naturalWidth={694}
                    alt="example of a using dark teal background with white text and button"
                  />
                  <Text align="center" size="100">
                    Spabattical-teal-700 + $color-text-inverse
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item minWidth={320} flex="grow">
                <Flex direction="column" gap={4}>
                  <Image
                    src="https://i.pinimg.com/originals/c6/3a/6e/c63a6e92a920f4b25698e64c4648b004.png"
                    naturalHeight={358}
                    naturalWidth={686}
                    alt="example of using a light teal background with dark text"
                  />
                  <Text align="center" size="100">
                    Spabattical-teal-100 + $color-text-default
                  </Text>
                </Flex>
              </Flex.Item>
            </Flex>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Color fills and iconography"
          description={`Gestalt icons should always use established colors, as our color props are semantically aligned with our [iconography principles](/foundations/iconography/usage#Principles).

If colors are needed to express a brand moment on the product, consider adding a colored background to the icon instead of adding alternative colors to the icon component. Ensure it meets the [WCAG 2.1 AA accessibility standard](https://www.w3.org/TR/WCAG21/) with the proper contrast between foreground and background. See the examples below.`}
        >
          <Box gap={8} wrap alignItems="center" mdDisplay="flex" lgDisplay="flex" smDisplay="block">
            <Box mdColumn={6} lgColumn={2} smColumn={12}>
              <Image
                src="https://i.pinimg.com/originals/01/1c/d3/011cd3c155d18d68e5c66ab8a5dcee81.png"
                naturalWidth={261}
                naturalHeight={242}
                alt="example of using a colored background with an icon as a light brand moment"
              />
            </Box>
            <Box mdColumn={6} lgColumn={2} smColumn={12}>
              <Image
                src="https://i.pinimg.com/originals/56/70/3b/56703b409d6b0b89f6d585e180771dde.png"
                naturalWidth={262}
                naturalHeight={242}
                alt="example of using a colored background with an icon as a light brand moment"
              />
            </Box>
            <Box mdColumn={6} lgColumn={2} smColumn={12}>
              <Image
                src="https://i.pinimg.com/originals/e2/2e/af/e22eaf06ab4771f4aa295d8a63ffbcb7.png"
                naturalWidth={261}
                naturalHeight={242}
                alt="example of using a colored background with an icon as a light brand moment"
              />
            </Box>
            <Box mdColumn={6} lgColumn={6} smColumn={12}>
              <Image
                src="https://i.pinimg.com/originals/15/cc/dc/15ccdc0c40829fbfc48622f886f16a93.png"
                naturalWidth={718}
                naturalHeight={332}
                alt="example of using a colored background with a colored icon as a light brand moment"
              />
            </Box>
          </Box>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
        <MainSection.Subsection
          description={`When playing with color fills, we recommend using a tool like [aremycolorsaccessible.com](https://www.aremycolorsaccessible.com/) to check the foreground color against the background color. In Figma, you can use the [Able](https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility) or [Pinterest brand color palettes](https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes) plugins to check color contrast in your designs.

[Section 508](https://webaim.org/standards/508/checklist), which aligns with [WCAG 2.0 Level AA](https://www.w3.org/TR/WCAG21/), establishes a legal standard for the contrast level essential between text and its background. The baseline AA contrast standard is 4.5:1 for most text and 3:1 for large text.

Make sure your color fills have great contrast in our light and dark mode color themes.

Don’t use color exclusively to convey meaning. Color should only be used as an enhancement — if color is the only cue, that cue won’t get through as intended to everyone.`}
        />
        <MainSection.Subsection
          title="Extended color palette"
          description={`The extended color palette displays all the available shades and tints of each color in the palette. The colors are named and numbered for easy reference. The usage of these colors come in handy for brand moments. In order to ensure accessible contrast for color pairings, we require our darkGray [Text](/web/text) color to be used for any colors 400 and below. For 500 and above, we recommend using white. Learn more by checking our [color palette documentation](https://gestalt.pinterest.systems/foundations/color/palette#Extended-palette).

The 450 colors are primarily reserved for Brand usage as they are among the least accessible colors. This set works best within larger brand moments, and is not commonly used for functional color pairings.`}
        />
      </MainSection>
    </Page>
  );
}
