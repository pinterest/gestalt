// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import ColorTile from '../../../docs-components/ColorTile.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

type ColorCardProps = {|
  children: Node,
|};
function ColorSchemeLayout({ children }: ColorCardProps): Node {
  return (
    <Flex gap={4} wrap>
      {['light', 'dark'].map((scheme) => (
        <ColorSchemeProvider key={scheme} colorScheme={scheme} id={scheme}>
          <Box padding={4} color="default">
            <Flex
              gap={{
                row: 0,
                column: 4,
              }}
              direction="column"
            >
              <Text weight="bold" size="400" color="default">
                {scheme === 'light' ? 'Light mode' : 'Dark mode'}
              </Text>
              {children}
            </Flex>
          </Box>
        </ColorSchemeProvider>
      ))}
    </Flex>
  );
}

export default function ColorUsagePage(): Node {
  return (
    <Page title="Color usage">
      <PageHeader
        name="Color usage"
        description={`
    Our color palettes are shared between Brand and Gestalt, and represent our full range of options. Please refer to the [Color Palette page](/foundations/color/palette) for all the shades and tints available.

    On this page, you will find guidance on how to use our color tokens for:

    - Primary and secondary elements
    - Additional UI elements, including colors for shopping, messages, typography, and iconography
    - Accessibility and inclusive design
    `}
        type="guidelines"
      />
      <MainSection
        name="Applying color to UI"
        description={`
        When designing a product interface, you can choose between any color swatch available in our [design tokens documentation](/foundations/design_tokens). The color tokens represent the values used within Gestalt to construct layouts and components.

        Colors available in our extended palette and not listed on the Gestalt Foundations library are reserved for larger brand moments, and they should not be applied to components.

        By limiting the range of colors, the areas that receive color gain more attention, such as text, images, and components. Pinterest content is multicolored, and having a limited range of colors is a great way to keep consistency, making our product more visible and engaging.

        If there is a need for a color not available in our design tokens, please reach out to the Core Brand team for guidance on using color to propose a brand moment within the product UI.
        `}
      />
      <MainSection
        name="Primary color"
        description={`
        A primary color is the color displayed most frequently across screens and components, used to convey high-emphasis actions. Our primary color related tokens are:
        **$color-background-primary-base** - Use when conveying a primary action.
        **$color-background-brand** - Use when a background color is needed to signify the Pinterest brand.        `}
      >
        <Flex gap={2}>
          <ColorSchemeLayout>
            <ColorTile
              description="Primary base"
              textColor="light"
              fullTokenName="color-background-primary-base"
            />
            <ColorTile
              description="Brand"
              textColor="light"
              fullTokenName="color-background-brand"
            />
          </ColorSchemeLayout>
        </Flex>
      </MainSection>
      <MainSection
        name="Secondary color"
        description={`
        A secondary color highlights medium to low-emphasis actions, creating a balance with the primary color. Our secondary color related token is:
        **$color-background-secondary-base** - Use for secondary, medium to low-emphasis actions.
        `}
      >
        <ColorSchemeLayout>
          <ColorTile
            description="Secondary base"
            fullTokenName="color-background-secondary-base"
            textColor="default"
          />
        </ColorSchemeLayout>
      </MainSection>
      <MainSection
        name="Accent gray color"
        description={`
        Our tertiary color offers ways to accent the UI when the primary color doesn't work well on the proposed layout. Our accent gray related token is:
        **$color-background-tertiary-base** - Use on medium to low-emphasis actions.
        `}
      >
        <ColorSchemeLayout>
          <ColorTile
            description="Tertiary base"
            textColor="inverse"
            fullTokenName="color-background-tertiary-base"
          />
        </ColorSchemeLayout>
      </MainSection>
      <MainSection
        name="Shopping color"
        description={`
        Instead of the Pushpin 450, the Skycicle 500 (blue) is the primary color to indicate shopping-related features. The related token is:
        **$color-background-shopping** - Use when conveying a primary action on shopping experiences.
        `}
      >
        <ColorSchemeLayout>
          <ColorTile
            description="Shopping"
            fullTokenName="color-background-shopping"
            textColor="inverse"
            number={500}
          />
        </ColorSchemeLayout>
      </MainSection>
      <MainSection
        name="Background color"
        description="Background colors are used behind text or applied to other elements to deliver specific messages or meanings, such as information, success, warning, and error. They are divided into two categories: base colors and weak colors. "
      >
        <MainSection.Subsection
          title="Base background colors"
          description={`
          Use on UI elements to convey a specific status or message. Usually, they aren't used behind default text.
          **$color-background-info-base** - Use to indicate neutral information.
          **$color-background-success-base** - Use to indicate success.
          **$color-background-warning-base** - Use to indicate warning alerts.
          **$color-background-error-base** -  Use to indicate errors.
        `}
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Info base"
              textColor="inverse"
              fullTokenName="color-background-info-base"
            />
            <ColorTile
              description="Recommendation base"
              textColor="inverse"
              fullTokenName="color-background-recommendation-base"
            />
            <ColorTile
              description="Success base"
              textColor="inverse"
              fullTokenName="color-background-success-base"
            />
            <ColorTile
              description="Warning base"
              textColor="inverse"
              fullTokenName="color-background-warning-base"
            />
            <ColorTile
              description="Error base"
              textColor="inverse"
              fullTokenName="color-background-error-base"
            />
            <ColorTile
              description="Neutral (tertiary base)"
              textColor="inverse"
              fullTokenName="color-background-tertiary-base"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Weak background colors"
          description={`
          Since they have a light tint, these colors can be used behind text.
          **$color-background-info-weak** - Use as a background for neutral information.
          **$color-background-success-weak** - Use as a background for success information.
          **$color-background-warning-weak** - Use as a background for warning alerts.
          **$color-background-error-weak** -  Uses as a background for errors.
        `}
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Info weak"
              fullTokenName="color-background-info-weak"
              textColor="default"
            />
            <ColorTile
              description="Recommendation weak"
              textColor="default"
              fullTokenName="color-background-recommendation-weak"
            />
            <ColorTile
              description="Success weak"
              fullTokenName="color-background-success-weak"
              textColor="default"
            />
            <ColorTile
              description="Warning weak"
              fullTokenName="color-background-warning-weak"
              textColor="default"
            />
            <ColorTile
              description="Error weak"
              fullTokenName="color-background-error-weak"
              textColor="default"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Inverse background color"
          description={`
          Color used to indicate an inverted background.
          **$color-background-inverse-base** - Use to create an inverted background.
          `}
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Inverse base"
              textColor="inverse"
              fullTokenName="color-background-inverse-base"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Typography color">
        <MainSection.Subsection
          title="Standard text colors"
          description={`
          Typography colors are used on text elements such as headings and body.
          Use the tokens:
          **$color-text-default** - The default text color, such as headings and body text.
          **$color-text-subtle** - For secondary, subtle text color, such as additional info or sub-header.
          **$color-text-shopping** - For text related to shopping products or surfaces.

          `}
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Default"
              textColor="inverse"
              fullTokenName="color-text-default"
            />
            <ColorTile description="Subtle" textColor="inverse" fullTokenName="color-text-subtle" />
            <ColorTile
              description="Shopping"
              textColor="inverse"
              fullTokenName="color-text-shopping"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Status text colors"
          description={`
          Text colors used to indicate status. Each color has a purposeful meaning. Use the tokens:
          **$color-text-success** - Use as text color to indicate success.
          **$color-text-warning** - Use as text color to indicate a warning or caution.
          **$color-text-error** - Use as text color to indicate an error.
          `}
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Success"
              textColor="inverse"
              fullTokenName="color-text-success"
            />
            <ColorTile
              description="Warning"
              textColor="inverse"
              fullTokenName="color-text-warning"
            />
            <ColorTile description="Error" textColor="inverse" fullTokenName="color-text-error" />
          </ColorSchemeLayout>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Inverse text color"
          description={`
          Color used on top of inverted backgrounds.
          **$color-text-inverse** - Use this token for text layered on top of inverted backgrounds.
          `}
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Inverse"
              fullTokenName="color-text-inverse"
              textColor="default"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Iconography color"
        description={`
      The icon colors available indicate status and match the messaging text colors for consistency. For icon colors purposes, use the tokens:

      **$color-text-icon-default** - Use as the default color for icons.
      **$color-text-icon-subtle** - Use as the secondary color for icons.
      **$color-text-icon-info** - Use for info icons.
      **$color-text-icon-recommendation** - Use for recommendation icons.
      **$color-text-icon-success** - Use for success icons.
      **$color-text-icon-warning** - Use for warning icons.
      **$color-text-icon-error** - Use for error icons.
      **$color-text-icon-inverse** - Use for icons paired with inverted backgrounds.
      `}
      >
        <ColorSchemeLayout>
          <ColorTile
            description="Default"
            textColor="inverse"
            fullTokenName="color-text-icon-default"
          />
          <ColorTile
            description="Subtle"
            textColor="inverse"
            fullTokenName="color-text-icon-subtle"
          />
          <ColorTile description="Info" textColor="inverse" fullTokenName="color-text-icon-info" />
          <ColorTile
            description="Recommendation"
            textColor="inverse"
            fullTokenName="color-text-icon-recommendation"
          />
          <ColorTile
            description="Success"
            textColor="inverse"
            fullTokenName="color-text-icon-success"
          />
          <ColorTile
            description="Warning"
            textColor="inverse"
            fullTokenName="color-text-icon-warning"
          />
          <ColorTile
            description="Error"
            textColor="inverse"
            fullTokenName="color-text-icon-error"
          />
          <ColorTile
            description="Inverse"
            fullTokenName="color-text-icon-inverse"
            textColor="default"
          />
        </ColorSchemeLayout>
      </MainSection>
      <MainSection
        name="Color and accessibility"
        description={`
      Please consider accessibility when using colors, as it is our responsibility to deliver an inclusive product that inspires everyone.

      [Section 508](https://webaim.org/standards/508/checklist), which aligns with [WCAG 2.0 Level AA](https://www.w3.org/TR/WCAG21/), establishes a legal standard for the contrast level essential between text and its background. The baseline AA contrast standard is 4.5:1 for most text and 3:1 for large text. We also recommend avoiding pure black text on white helps dyslexia, Irlen Syndrome, light sensitivity, and autism.

      Don’t use color exclusively to convey meaning. Color should only be used as an enhancement — if color is the only cue, that cue won’t get through as intended to everyone. Learn more about [Accessibility Design considerations](/foundations/accessibility).

      Other resources for reference:
        - [About color and contrast](https://accessibility.digital.gov/visual-design/color-and-contrast/)
        - [About color and readability](https://www.w3.org/WAI/RD/2012/text-customization/r11)
        - [Improving accessibility for colorblind users](https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/)
        - [Accessibility and dyslexia](https://www.figma.com/exit?url=https%3A%2F%2Fwww.dyslexic.com%2Fblog%2Fquick-guide-making-content-accessible%2F)
        - [W3C: Accessibility requirements for low vision needs](https://www.w3.org/TR/low-vision-needs/)
        - [The Irlen Syndrome](https://irlen.com/what-is-irlen-syndrome/)
      `}
      />
    </Page>
  );
}
