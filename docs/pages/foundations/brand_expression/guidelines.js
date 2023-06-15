// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Image, List } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function MessagingComponentsPage(): Node {
  return (
    <Page title="Brand expression">
      <PageHeader
        name="Brand expression"
        type="guidelines"
        description={`We consider brand expression in the product the combination of visual elements (colors, typography, photography, motion, and other assets) to provide a delightful experience for Pinners by bringing Pinterest brand touch-points through the user experience, such as promoting a new feature, launching new tools, and reinforcing marketing messages within the product UI.

The guidelines below aim to guide you on how to incorporate brand expression into the product, adding unique value to Pinners. They aren't intended to determine what specific surfaces must look like; instead, it is meant to illustrate the principles and general usage of brand expressions respecting usability and accessibility best practices.

These guidelines will broadly align with the brand standards. Still, they will follow [our design principles](/get_started/about_us#Our-design-principles), and there are areas where they may diverge as our focus is brand expression specific to product UI rather than marketing materials and campaigns.

We suggest continuously checking for comprehension and usability when bringing brand moments to the product.

`}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Onboarding flows
          - Celebratory moments (first launching the app, first boards, reaching a certain amount of followers, special milestones)
          - In-product marketing moments
          - Ads campaigns, challenges or trends
          - Launch or login screens
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Performing critical tasks or blocking users to complete a task
          - Competing with content and Pins
          - Modifying product UI patterns or Gestalt components
          - Causing comprehension or accessibility issues
          - Without a purpose as a decorative element
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Be mindful of when and where to bring brand expressions into your design. If color fills, imagery and other brand elements are needed to reinforce brand touch-points within your design, then go for it; if not, aim to follow our [foundation guidelines](/foundations/overview). A consistent design allows Pinterest content to shine while ensuring a great usability experience.

Below we list the UI elements you can use and the ones you should avoid when bringing brand expression within your product UI. `}
        />
        <MainSection.Subsection title="UI elements and Brand expression">
          <Box display="flex" wrap>
            <Box lgColumn={4} mdColumn={12} smColumn={12}>
              <Flex direction="column" gap={4}>
                <Heading color="success" size="200" accessibilityLevel={4}>
                  UI elements to bring brand expression
                </Heading>
                <List label="UI elements to bring brand expression" labelDisplay="hidden">
                  <List.Item text="Product upsells" />
                  <List.Item text="Hero banners" />
                  <List.Item text="Cards" />
                  <List.Item text="Carousels" />
                  <List.Item text="Modals/OverlayPanels" />
                </List>
              </Flex>
            </Box>
            <Box lgColumn={4} mdColumn={12} smColumn={12}>
              <Flex direction="column" gap={4}>
                <Heading color="subtle" size="200" accessibilityLevel={4}>
                  Consider brand expression
                </Heading>
                <List label="When to consider brand expression" labelDisplay="hidden">
                  <List.Item text="Dashboards(when applicable and it does not break a component" />
                </List>
              </Flex>
            </Box>
            <Box lgColumn={4} mdColumn={12} smColumn={12}>
              <Flex direction="column" gap={4}>
                <Heading color="error" size="200" accessibilityLevel={4}>
                  Elements to avoid brand expression
                </Heading>
                <List label="Elements to avoid brand expression" labelDisplay="hidden">
                  <List.Item text="Core UI patterns" />
                  <List.Item text="Text components" />
                  <List.Item text="CTAs and other action components" />
                  <List.Item text="Tables" />
                  <List.Item text="Form components" />
                </List>
              </Flex>
            </Box>
          </Box>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use color fills (brand baseline colors) to emphasize brand moments if appropriate to create a delightful Pinner experience (e.g., feature improvement announcement, in-product marketing moments). Ensure to check color contrast achieving [WCAG 2.1 AA accessibility standards](https://www.w3.org/TR/WCAG21/)."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/f6/9e/e2/f69ee288852ea88d893d33f85616e0ce.png"
                naturalWidth={762}
                naturalHeight={610}
                fit="contain"
                alt="Example of appropriate use of brand baseline colors to emphasize a brand moment."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Use alternative colors to modify components colors or UI patterns. Color should be applied purposefully as it can convey meaning in multiple ways."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/47/dd/95/47dd959f8b00e15ca9d1fad1c41508ca.png"
                naturalWidth={752}
                naturalHeight={612}
                fit="contain"
                alt="Example of inappropriate use of alternative colors to emphasize a brand moment."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use color fills in celebratory moments, such as telling good news or highlighting Pinner's achievements."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/f3/28/c9/f328c971f43eabac1a9577ac229a90ef.png"
                naturalWidth={767}
                naturalHeight={590}
                fit="contain"
                alt="Example of using color fills in a celebratory moment."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Apply text over photography as it could lead to contrast issues and make it inaccessible through assistive devices."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/4d/d8/a5/4dd8a5d093c6bcce384a3b50dc57e9d6.png"
                naturalWidth={834}
                naturalHeight={614}
                fit="contain"
                alt="Example of inappropriately adding text over photography."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Apply text over color fills using the appropriate [text color tokens](/foundations/design_tokens#Text-color). It will ensure an accessible, readable experience."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/ee/92/be/ee92be2b2750c84fcf3073fb13dec636.png"
                naturalWidth={686}
                naturalHeight={358}
                fit="contain"
                alt="Example of using appropriate colors with typography."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Use alternative colors on text content and icons as it could lead to major contrast accessibility and usability issues. **This rule doesn't cover marketing materials, and promotional landing pages.**"
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/31/d0/f0/31d0f02d6ed561591968a8cea0aa1abe.png"
                naturalWidth={734}
                naturalHeight={614}
                fit="contain"
                alt="Example of using inappropriate colors with typography."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use color fills when announcing new features (e.g., new way to search for hairstyle ideas)."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/dd/8e/a4/dd8ea46b19b81846ee2f66ed322789f5.png"
                naturalWidth={750}
                naturalHeight={580}
                fit="contain"
                alt="Example of using color fills to announce a new feature."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Apply color fills on core UI patterns and critical tasks actions. It can distract Pinners from completing a task."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/2e/d8/60/2ed8607acc2c012c841e8aba59b38cae.png"
                naturalWidth={887}
                naturalHeight={614}
                fit="contain"
                alt="Example of using color fills in core UI patterns."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Accessibility"
        description={`Be mindful of color usage. Pinterest’s goal as a company is to meet [WCAG 2.1 AA standards](https://www.w3.org/TR/WCAG21/), so we recommend using a tool like [aremycolorsaccessible.com](https://www.aremycolorsaccessible.com/)  to check the foreground color against the background color. In Figma, you can use the [Able](https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility) or [Pinterest brand color palettes](https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes) plugins to check color contrast in your designs.

When adding photography or any imagery source, ensure it translates well in both themes (light and dark-mode). Your image source should be equally visible in both themes, especially when you have colored backgrounds contrasting with a photo or an illustration.

Ensure to add ALT text to your image, so users who rely on assistive technologies can access your image content.`}
      />
      <MainSection
        name="Localization"
        description="Make sure to localize in-product marketing assets considering all the languages and
          cultures."
      />
      <MainSection
        name="Voice and tone"
        description="Check out our [brand voice guidelines](https://www.figma.com/proto/dOKezQeD0AKtnIaurwW1oz/Pinterest-Brand-Voice?page-id=1645%3A3096&node-id=1645%3A3097&viewport=323%2C48%2C0.07&scaling=scale-down)."
      />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Accessibility](/foundations/accessibility)**
How to create accessible designs and components that contribute to an accessible product

**[Color](/foundations/color/palette)**
Palettes and guidelines for using color across product interfaces and surfaces

**[Design tokens](/foundations/design_tokens)**
An expanded color palette for charts, graphs and other data visualizations. Includes guidelines for accessibility and usage.

      `}
        />
      </MainSection>
    </Page>
  );
}
