// @flow strict
import type { Node } from 'react';
import { Flex } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import ColorTile from '../components/ColorTile.js';
import Page from '../components/Page.js';

export default function ColorUsagePage(): Node {
  return (
    <Page title="Color Usage">
      <PageHeader
        name="Color usage"
        description={`
    Our color palettes are shared between Brand and Gestalt, and represent our full range of options. Please refer to the [Color Palette page](/color_palette) for all the shades and tints available.

    On this page, you will find guidance on how to use our color tokens for:

    - Primary and secondary elements
    - Additional UI elements, including colors for shopping, messages, typography, and iconography
    - Accessibility and inclusive design
    `}
        showSourceLink={false}
      />
      <MainSection
        name="Applying color to UI"
        description={`
        When designing a product interface, you can choose between any color swatch available in our [design tokens documentation](/design_tokens). The color tokens represent the values used within Gestalt to construct layouts and components.

        Colors available in our extended palette and not listed on Gestalt Colors & Styles Figma library are reserved for larger brand moments, and they should not be applied to components.

        By limiting the range of colors, the areas that receive color gain more attention, such as text, images, and components. Pinterest content is multicolored, and having a limited range of colors is a great way to keep consistency, making our product more visible and engaging.

        If there is a need for a color not available in our design tokens, please reach out to the Core Brand team for guidance on using color to propose a brand moment within the product UI.
        `}
      />
      <MainSection
        name="Primary color"
        description={`
        A primary color is the color displayed most frequently across screens and components, used to convey high-emphasis actions. Our primary color related tokens are:
        **$color-background-primary-base** - Use this token when conveying a primary action.
        **$color-background-brand** - Use this token when a background color is needed to signify the Pinterest brand.        `}
      >
        <ColorTile
          description="Primary base"
          textColor="white"
          fullVariableName="color-background-primary-base"
        />
      </MainSection>
      <MainSection
        name="Secondary color"
        description={`
        A secondary color highlights medium to low-emphasis actions, creating a balance with the primary color. Our secondary color related token is:
        **$color-background-secondary-base** - Use this token for secondary, medium to low-emphasis actions.
        `}
      >
        <ColorTile
          description="Secondary base"
          fullVariableName="color-background-secondary-base"
        />
      </MainSection>
      <MainSection
        name="Accent gray color"
        description={`
        Our tertiary color offers ways to accent the UI when the primary color doesn't work well on the proposed layout. Our accent gray related token is:
        **$color-background-tertiary-base** - Use this token on medium to low-emphasis actions.
        `}
      >
        <ColorTile
          description="Tertiary base"
          textColor="white"
          fullVariableName="color-background-tertiary-base"
        />
      </MainSection>
      <MainSection
        name="Shopping color"
        description={`
        Instead of the Pushpin 450, the Skycicle 500 (blue) is the primary color to indicate shopping-related features. The related token is:
        **$color-background-shopping** - Use this token name when conveying a primary action on shopping experiences.
        `}
      >
        <ColorTile description="Shopping" name="Skycicle" number={500} tokenId="blue" />
      </MainSection>
      {/*
     <MainSection
        name="Behavior color"
        description="Color can also provide information about the state of a component. There are color tokens for selected and hover state"
      >
        <MainSection.Subsection
          title="Hover"
          description={`
          **$color-background-primary-strong** - This token is the strong version of the primary background color, use for primary  hover purposes.
          **$color-background-secondary-strong** - This token is the strong version of the secondary background color, use for secondary hover purposes.
          **$color-background-tertiary-strong** - This token is the strong version of the tertiary background color, use for tertiary hover purposes.
        `}
        >
          <Flex gap={4} wrap>
            <ColorTile
              description="Primary strong"
              textColor="white"
              fullVariableName="color-background-primary-strong"
            />
            <ColorTile description="Secondary strong" name="Roboflow" number={700} tokenId="gray" />
            <ColorTile description="Tertiary strong" name="Roboflow" number={400} tokenId="gray" />
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Selected"
          description={`
          **$color-background-selected-base** - Use this token to convey a selected state, such as a selected iconButton.
          **$color-background-selected-weak** - Use this token as the weak version of the selected background color.
          **$color-background-selected-strong** - Use this token as the strong version of the selected background color.
        `}
        >
          <Flex gap={4} wrap>
            <ColorTile
              description="Selected base"
              textColor="white"
              fullVariableName="color-background-selected-base"
            />
            <ColorTile description="Secondary strong" name="Roboflow" number={700} tokenId="gray" />
            <ColorTile description="Tertiary strong" name="Roboflow" number={400} tokenId="gray" />
          </Flex>
        </MainSection.Subsection>
      </MainSection>
     */}

      <MainSection
        name="Background color"
        description="Background colors are used behind text or applied to other elements to deliver specific messages or meanings, such as information, success, warning, and error. They are divided into two categories, base colors and weak colors. "
      >
        <MainSection.Subsection
          title="Base background colors"
          description={`
          Use on UI elements to convey a specific status or message. Usually, they aren't used behind default text.
          **$color-background-info-base** - Use this token as a background color to indicate neutral information.
          **$color-background-success-base** - Use this token as a background color to indicate success.
          **$color-background-warning-base** - Use this token as a background color to indicate warning alerts.
          **$color-background-error-base** -  Use this tokens as a background color to indicate errors.
        `}
        >
          <Flex gap={4} direction="column">
            <Flex gap={4} wrap>
              <ColorTile
                description="Info base"
                textColor="white"
                fullVariableName="color-background-info-base"
              />
              <ColorTile
                description="Success base"
                textColor="white"
                fullVariableName="color-background-success-base"
              />
            </Flex>
            <Flex gap={4} wrap>
              <ColorTile
                description="Warning base"
                textColor="white"
                fullVariableName="color-background-warning-base"
              />
              <ColorTile
                description="Error base"
                textColor="white"
                fullVariableName="color-background-error-base"
              />
            </Flex>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Weak background colors"
          description={`
          Since they have a light tint, these colors can be used behind text.
          **$color-background-info-weak** - Use this token as a background color to indicate neutral information.
          **$color-background-success-weak** - Use this token as a background color to indicate success.
          **$color-background-warning-weak** - Use this token as a background color to indicate warning alerts.
          **$color-background-error-weak** -  Use this tokens as a background color to indicate errors.
        `}
        >
          <Flex gap={4} direction="column">
            <Flex gap={4} wrap>
              <ColorTile description="Info weak" fullVariableName="color-background-info-weak" />
              <ColorTile
                description="Success weak"
                fullVariableName="color-background-success-weak"
              />
            </Flex>
            <Flex gap={4} wrap>
              <ColorTile
                description="Warning weak"
                fullVariableName="color-background-warning-weak"
              />
              <ColorTile description="Error weak" fullVariableName="color-background-error-weak" />
            </Flex>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Inverse background color"
          description={`
          Color used to indicate an inverted background. Use the token:
          **$color-background-inverse-base** - Use this token as a background color on inverted backgrounds.
          `}
        >
          <ColorTile
            description="Inverse base"
            textColor="white"
            fullVariableName="color-background-inverse-base"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Typography color">
        <MainSection.Subsection
          title="Standard text colors"
          description={`
          Typography colors are used on text elements such as headings and body.
          Use the tokens:
          **$color-text-default** - For default text-color, such as headings and body text.
          **$color-text-subtle** - For secondary, subtle text-color, such as additional info or sub-header.
          `}
        >
          <Flex gap={4} wrap>
            <ColorTile
              description="Default"
              textColor="white"
              fullVariableName="color-text-default"
            />
            <ColorTile
              description="Subtle"
              textColor="white"
              fullVariableName="color-text-subtle"
            />
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Status text colors"
          description={`
          Text colors used to indicate status. Each color has a purposeful meaning. Use the tokens:
          **$color-text-success** - Use this token as text color to indicate success.
          **$color-text-warning** - Use this token as text color to indicate a warning or caution.
          **$color-text-error** - Use this token as text color to indicate an error.
          `}
        >
          <Flex gap={4} wrap>
            <ColorTile
              description="Success"
              textColor="white"
              fullVariableName="color-text-success"
            />
            <ColorTile
              description="Warning"
              textColor="white"
              fullVariableName="color-text-warning"
            />
            <ColorTile description="Error" textColor="white" fullVariableName="color-text-error" />
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Inverse text color"
          description={`
          Colors used on top of inverted backgrounds. Use the tokens:
          **$color-text-inverse** - Use this token for text layered on top of inverted backgrounds.
          `}
        >
          <ColorTile description="Inverse" fullVariableName="color-text-inverse" />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Iconography color"
        description={`
      The icon colors available indicate status and match the messaging text colors for consistency. For icon colors purposes, use the tokens:

      **$color-text-icon-default** - Use this token as the default color for icons.
      **$color-text-icon-subtle** - Use this token as the secondary color for icons.
      **$color-text-icon-success** - Use this token for success icons.
      **$color-text-icon-warning** - Use this token for warning icons.
      **$color-text-icon-error** - Use this token for error icons.
      **$color-text-icon-inverse** - Use this token for icons paired with inverted backgrounds.
      `}
      >
        <Flex gap={4} direction="column">
          <Flex gap={4} wrap>
            <ColorTile
              description="Default"
              textColor="white"
              fullVariableName="color-text-icon-default"
            />
            <ColorTile
              description="Subtle"
              textColor="white"
              fullVariableName="color-text-icon-subtle"
            />
          </Flex>
          <Flex gap={4} wrap>
            <ColorTile
              description="Success"
              textColor="white"
              fullVariableName="color-text-icon-success"
            />
            <ColorTile
              description="Warning"
              textColor="white"
              fullVariableName="color-text-icon-warning"
            />
          </Flex>
          <Flex gap={4} wrap>
            <ColorTile
              description="Error"
              textColor="white"
              fullVariableName="color-text-icon-error"
            />
            <ColorTile description="Inverse" fullVariableName="color-text-icon-inverse" />
          </Flex>
        </Flex>
      </MainSection>
      <MainSection
        name="Color and accessibility"
        description={`
      Please consider accessibility when using colors. When it comes to accessibility, it is our responsibility to deliver an inclusive product that inspires everyone.

      [Section 508](https://webaim.org/standards/508/checklist), which aligns with [WCAG 2.0 Level AA](https://www.w3.org/TR/WCAG21/), establishes a legal standard for the contrast level essential between text and its background. The baseline AA contrast standard is 4.5:1 for most text and 3:1 for large text. We also recommend avoiding pure black text on white helps dyslexia, Irlen Syndrome, light sensitivity, and autism.

      Don’t use color exclusively to convey meaning. Color should only be used as an enhancement — if color is the only cue, that cue won’t get through as intended to everyone. Learn more about [Accessibility Design considerations](/accessibility).

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
