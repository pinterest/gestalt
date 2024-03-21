// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import ColorTile from '../../../docs-components/ColorTile';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

type ColorCardProps = {
  children: ReactNode,
};
function ColorSchemeLayout({ children }: ColorCardProps): ReactNode {
  return (
    <Flex gap={4} wrap>
      {['light', 'dark'].map((scheme) => (
        <ColorSchemeProvider key={scheme} colorScheme={scheme} id={scheme}>
          <Box color="default" padding={4}>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 4,
              }}
            >
              <Text color="default" size="400" weight="bold">
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

export default function ColorUsagePage(): ReactNode {
  return (
    <Page title="Color usage">
      <PageHeader
        description={`
    Our color palettes are shared between Brand and Gestalt, and represent our full range of options. Please refer to the [Color Palette page](/foundations/color/palette) for all the shades and tints available.

    On this page, you will find guidance on how to use our color tokens for:

    - Primary and secondary elements
    - Additional UI elements, including colors for shopping, messages, typography, and iconography
    - Accessibility and inclusive design
    `}
        name="Color usage"
        type="guidelines"
      />
      <MainSection
        description={`
        When designing a product interface, you can choose between any color swatch available in our [design tokens documentation](/foundations/design_tokens). The color tokens represent the values used within Gestalt to construct layouts and components.

        Colors available in our extended palette and not listed on the Gestalt Foundations library are reserved for larger brand moments, and they should not be applied to components.

        By limiting the range of colors, the areas that receive color gain more attention, such as text, images, and components. Pinterest content is multicolored, and having a limited range of colors is a great way to keep consistency, making our product more visible and engaging.

        If there is a need for a color not available in our design tokens, please reach out to the Core Brand team for guidance on using color to propose a brand moment within the product UI.
        `}
        name="Applying color to UI"
      />
      <MainSection
        description={`
        A primary color is the color displayed most frequently across screens and components, used to convey high-emphasis actions. Our primary color related tokens are:
        **$color-background-primary-base** - Use when conveying a primary action.
        **$color-background-brand** - Use when a background color is needed to signify the Pinterest brand.        `}
        name="Primary color"
      >
        <Flex gap={2}>
          <ColorSchemeLayout>
            <ColorTile
              description="Primary base"
              fullTokenName="color-background-primary-base"
              textColor="light"
            />
            <ColorTile
              description="Brand"
              fullTokenName="color-background-brand"
              textColor="light"
            />
          </ColorSchemeLayout>
        </Flex>
      </MainSection>
      <MainSection
        description={`
        A secondary color highlights medium to low-emphasis actions, creating a balance with the primary color. Our secondary color related token is:
        **$color-background-secondary-base** - Use for secondary, medium to low-emphasis actions.
        `}
        name="Secondary color"
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
        description={`
        Our tertiary color offers ways to accent the UI when the primary color doesn't work well on the proposed layout. Our accent gray related token is:
        **$color-background-tertiary-base** - Use on medium to low-emphasis actions.
        `}
        name="Accent gray color"
      >
        <ColorSchemeLayout>
          <ColorTile
            description="Tertiary base"
            fullTokenName="color-background-tertiary-base"
            textColor="inverse"
          />
        </ColorSchemeLayout>
      </MainSection>
      <MainSection
        description={`
        Instead of the Pushpin 450, the Skycicle 500 (blue) is the primary color to indicate shopping-related features. The related token is:
        **$color-background-shopping** - Use when conveying a primary action on shopping experiences.
        `}
        name="Shopping color"
      >
        <ColorSchemeLayout>
          <ColorTile
            description="Shopping"
            fullTokenName="color-background-shopping"
            number={500}
            textColor="inverse"
          />
        </ColorSchemeLayout>
      </MainSection>
      <MainSection
        description="Background colors are used behind text or applied to other elements to deliver specific messages or meanings, such as information, success, warning, and error. They are divided into two categories: base colors and weak colors. "
        name="Background color"
      >
        <MainSection.Subsection
          description={`
          Use on UI elements to convey a specific status or message. Usually, they aren't used behind default text.
          **$color-background-info-base** - Use to indicate neutral information.
          **$color-background-success-base** - Use to indicate success.
          **$color-background-warning-base** - Use to indicate warning alerts.
          **$color-background-error-base** -  Use to indicate errors.
        `}
          title="Base background colors"
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Info base"
              fullTokenName="color-background-info-base"
              textColor="inverse"
            />
            <ColorTile
              description="Recommendation base"
              fullTokenName="color-background-recommendation-base"
              textColor="inverse"
            />
            <ColorTile
              description="Success base"
              fullTokenName="color-background-success-base"
              textColor="inverse"
            />
            <ColorTile
              description="Warning base"
              fullTokenName="color-background-warning-base"
              textColor="inverse"
            />
            <ColorTile
              description="Error base"
              fullTokenName="color-background-error-base"
              textColor="inverse"
            />
            <ColorTile
              description="Neutral (tertiary base)"
              fullTokenName="color-background-tertiary-base"
              textColor="inverse"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
          Since they have a light tint, these colors can be used behind text.
          **$color-background-info-weak** - Use as a background for neutral information.
          **$color-background-success-weak** - Use as a background for success information.
          **$color-background-warning-weak** - Use as a background for warning alerts.
          **$color-background-error-weak** -  Uses as a background for errors.
        `}
          title="Weak background colors"
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Info weak"
              fullTokenName="color-background-info-weak"
              textColor="default"
            />
            <ColorTile
              description="Recommendation weak"
              fullTokenName="color-background-recommendation-weak"
              textColor="default"
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
          description={`
          Color used to indicate an inverted background.
          **$color-background-inverse-base** - Use to create an inverted background.
          `}
          title="Inverse background color"
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Inverse base"
              fullTokenName="color-background-inverse-base"
              textColor="inverse"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Typography color">
        <MainSection.Subsection
          description={`
          Typography colors are used on text elements such as headings and body.
          Use the tokens:
          **$color-text-default** - The default text color, such as headings and body text.
          **$color-text-subtle** - For secondary, subtle text color, such as additional info or sub-header.
          **$color-text-shopping** - For text related to shopping products or surfaces.

          `}
          title="Standard text colors"
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Default"
              fullTokenName="color-text-default"
              textColor="inverse"
            />
            <ColorTile description="Subtle" fullTokenName="color-text-subtle" textColor="inverse" />
            <ColorTile
              description="Shopping"
              fullTokenName="color-text-shopping"
              textColor="inverse"
            />
          </ColorSchemeLayout>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
          Text colors used to indicate status. Each color has a purposeful meaning. Use the tokens:
          **$color-text-success** - Use as text color to indicate success.
          **$color-text-warning** - Use as text color to indicate a warning or caution.
          **$color-text-error** - Use as text color to indicate an error.
          `}
          title="Status text colors"
        >
          <ColorSchemeLayout>
            <ColorTile
              description="Success"
              fullTokenName="color-text-success"
              textColor="inverse"
            />
            <ColorTile
              description="Warning"
              fullTokenName="color-text-warning"
              textColor="inverse"
            />
            <ColorTile description="Error" fullTokenName="color-text-error" textColor="inverse" />
          </ColorSchemeLayout>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
          Color used on top of inverted backgrounds.
          **$color-text-inverse** - Use this token for text layered on top of inverted backgrounds.
          `}
          title="Inverse text color"
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
        description={`
      The icon colors available indicate status and match the messaging text colors for consistency. For icon colors purposes, use the tokens:

      **$color-icon-default** - Use as the default color for icons.
      **$color-icon-subtle** - Use as the secondary color for icons.
      **$color-icon-info** - Use for info icons.
      **$color-icon-recommendation** - Use for recommendation icons.
      **$color-icon-success** - Use for success icons.
      **$color-icon-warning** - Use for warning icons.
      **$color-icon-error** - Use for error icons.
      **$color-icon-inverse** - Use for icons paired with inverted backgrounds.
      `}
        name="Iconography color"
      >
        <ColorSchemeLayout>
          <ColorTile description="Default" fullTokenName="color-icon-default" textColor="inverse" />
          <ColorTile description="Subtle" fullTokenName="color-icon-subtle" textColor="inverse" />
          <ColorTile description="Info" fullTokenName="color-icon-info" textColor="inverse" />
          <ColorTile
            description="Recommendation"
            fullTokenName="color-icon-recommendation"
            textColor="inverse"
          />
          <ColorTile description="Success" fullTokenName="color-icon-success" textColor="inverse" />
          <ColorTile description="Warning" fullTokenName="color-icon-warning" textColor="inverse" />
          <ColorTile description="Error" fullTokenName="color-icon-error" textColor="inverse" />
          <ColorTile description="Inverse" fullTokenName="color-icon-inverse" textColor="default" />
        </ColorSchemeLayout>
      </MainSection>
      <MainSection
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
        name="Color and accessibility"
      />
    </Page>
  );
}
