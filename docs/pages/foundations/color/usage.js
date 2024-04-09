// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import {
  TOKEN_COLOR_BACKGROUND_BRAND,
  TOKEN_COLOR_BACKGROUND_ERROR_BASE,
  TOKEN_COLOR_BACKGROUND_ERROR_WEAK,
  TOKEN_COLOR_BACKGROUND_INFO_BASE,
  TOKEN_COLOR_BACKGROUND_INFO_WEAK,
  TOKEN_COLOR_BACKGROUND_INVERSE_BASE,
  TOKEN_COLOR_BACKGROUND_PRIMARY_BASE,
  TOKEN_COLOR_BACKGROUND_RECOMMENDATION_BASE,
  TOKEN_COLOR_BACKGROUND_RECOMMENDATION_WEAK,
  TOKEN_COLOR_BACKGROUND_SECONDARY_BASE,
  TOKEN_COLOR_BACKGROUND_SHOPPING,
  TOKEN_COLOR_BACKGROUND_SUCCESS_BASE,
  TOKEN_COLOR_BACKGROUND_SUCCESS_WEAK,
  TOKEN_COLOR_BACKGROUND_TERTIARY_BASE,
  TOKEN_COLOR_BACKGROUND_WARNING_BASE,
  TOKEN_COLOR_BACKGROUND_WARNING_WEAK,
  TOKEN_COLOR_ICON_DEFAULT,
  TOKEN_COLOR_ICON_ERROR,
  TOKEN_COLOR_ICON_INFO,
  TOKEN_COLOR_ICON_INVERSE,
  TOKEN_COLOR_ICON_RECOMMENDATION,
  TOKEN_COLOR_ICON_SUBTLE,
  TOKEN_COLOR_ICON_SUCCESS,
  TOKEN_COLOR_ICON_WARNING,
  TOKEN_COLOR_TEXT_DEFAULT,
  TOKEN_COLOR_TEXT_ERROR,
  TOKEN_COLOR_TEXT_INVERSE,
  TOKEN_COLOR_TEXT_SHOPPING,
  TOKEN_COLOR_TEXT_SUBTLE,
  TOKEN_COLOR_TEXT_SUCCESS,
  TOKEN_COLOR_TEXT_WARNING,
} from 'gestalt-design-tokens';
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
              textColor="light"
              token={TOKEN_COLOR_BACKGROUND_PRIMARY_BASE}
            />
            <ColorTile description="Brand" textColor="light" token={TOKEN_COLOR_BACKGROUND_BRAND} />
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
            textColor="default"
            token={TOKEN_COLOR_BACKGROUND_SECONDARY_BASE}
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
            textColor="inverse"
            token={TOKEN_COLOR_BACKGROUND_TERTIARY_BASE}
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
            number={500}
            textColor="inverse"
            token={TOKEN_COLOR_BACKGROUND_SHOPPING}
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
              textColor="inverse"
              token={TOKEN_COLOR_BACKGROUND_INFO_BASE}
            />
            <ColorTile
              description="Recommendation base"
              textColor="inverse"
              token={TOKEN_COLOR_BACKGROUND_RECOMMENDATION_BASE}
            />
            <ColorTile
              description="Success base"
              textColor="inverse"
              token={TOKEN_COLOR_BACKGROUND_SUCCESS_BASE}
            />
            <ColorTile
              description="Warning base"
              textColor="inverse"
              token={TOKEN_COLOR_BACKGROUND_WARNING_BASE}
            />
            <ColorTile
              description="Error base"
              textColor="inverse"
              token={TOKEN_COLOR_BACKGROUND_ERROR_BASE}
            />
            <ColorTile
              description="Neutral (tertiary base)"
              textColor="inverse"
              token={TOKEN_COLOR_BACKGROUND_TERTIARY_BASE}
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
              textColor="default"
              token={TOKEN_COLOR_BACKGROUND_INFO_WEAK}
            />
            <ColorTile
              description="Recommendation weak"
              textColor="default"
              token={TOKEN_COLOR_BACKGROUND_RECOMMENDATION_WEAK}
            />
            <ColorTile
              description="Success weak"
              textColor="default"
              token={TOKEN_COLOR_BACKGROUND_SUCCESS_WEAK}
            />
            <ColorTile
              description="Warning weak"
              textColor="default"
              token={TOKEN_COLOR_BACKGROUND_WARNING_WEAK}
            />
            <ColorTile
              description="Error weak"
              textColor="default"
              token={TOKEN_COLOR_BACKGROUND_ERROR_WEAK}
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
              textColor="inverse"
              token={TOKEN_COLOR_BACKGROUND_INVERSE_BASE}
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
            <ColorTile description="Default" textColor="inverse" token={TOKEN_COLOR_TEXT_DEFAULT} />
            <ColorTile description="Subtle" textColor="inverse" token={TOKEN_COLOR_TEXT_SUBTLE} />
            <ColorTile
              description="Shopping"
              textColor="inverse"
              token={TOKEN_COLOR_TEXT_SHOPPING}
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
            <ColorTile description="Success" textColor="inverse" token={TOKEN_COLOR_TEXT_SUCCESS} />
            <ColorTile description="Warning" textColor="inverse" token={TOKEN_COLOR_TEXT_WARNING} />
            <ColorTile description="Error" textColor="inverse" token={TOKEN_COLOR_TEXT_ERROR} />
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
            <ColorTile description="Inverse" textColor="default" token={TOKEN_COLOR_TEXT_INVERSE} />
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
          <ColorTile description="Default" textColor="inverse" token={TOKEN_COLOR_ICON_DEFAULT} />
          <ColorTile description="Subtle" textColor="inverse" token={TOKEN_COLOR_ICON_SUBTLE} />
          <ColorTile description="Info" textColor="inverse" token={TOKEN_COLOR_ICON_INFO} />
          <ColorTile
            description="Recommendation"
            textColor="inverse"
            token={TOKEN_COLOR_ICON_RECOMMENDATION}
          />
          <ColorTile description="Success" textColor="inverse" token={TOKEN_COLOR_ICON_SUCCESS} />
          <ColorTile description="Warning" textColor="inverse" token={TOKEN_COLOR_ICON_WARNING} />
          <ColorTile description="Error" textColor="inverse" token={TOKEN_COLOR_ICON_ERROR} />
          <ColorTile description="Inverse" textColor="default" token={TOKEN_COLOR_ICON_INVERSE} />
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
