// @flow strict
import { Text, Flex, Link, Heading, Image, Box } from 'gestalt';
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Markdown from '../../../docs-components/Markdown.js';

export default function MessagingComponentsPage(): Node {
  return (
    <Page title="Brand expression">
      <PageHeader badge="pilot" name="Brand expression" type="guidelines" />
      <Markdown
        text={`We consider brand expression in the product the combination of visual elements (colors, typography, photography, motion, and other assets) to provide a delightful experience for Pinners by bringing Pinterest brand touch-points through the user experience, such as promoting a new feature, launching new tools, and reinforcing marketing messages within the product UI.

The guidelines below aim to guide you on how to incorporate brand expression into the product, adding unique value to Pinners. They aren't intended to determine what specific surfaces must look like; instead, it is meant to illustrate the principles and general usage of brand expressions respecting usability and accessibility best practices.

These guidelines will broadly align with the brand standards. Still, they will follow [our design principles](/get_started/about_us#Our-design-principles), and there are areas where they may diverge as our focus is brand expression specific to product UI rather than marketing materials and campaigns.
We suggest continuously checking for comprehension and usability when bringing brand moments to the product.

We suggest continuously checking for comprehension and usability when bringing brand moments to the product.  `}
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
        <MainSection.Subsection>
          <Markdown
            text={`Be mindful of when and where to bring brand expressions into your design. If color fills, imagery and other brand elements are needed to reinforce brand touch-points within your design, then go for it; if not, aim to follow our [foundation guidelines](/foundations/overview). A consistent design allows Pinterest content to shine while ensuring a great usability experience.

Below we list the UI elements you can use and the ones you should avoid when bringing brand expression within your product UI. `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="UI elements and Brand expression">
          <Flex gap={8} wrap>
            <Flex.Item flexBasis="0" flex="grow" minWidth={300} maxWidth="33%">
              <Heading color="success" size="200">
                UI elements to bring brand expression
              </Heading>
              <Text>
                <ul>
                  <li>Product upsells</li>
                  <li>Hero banners</li>
                  <li>Cards</li>
                  <li>Carousels</li>
                  <li>Modals/Sheets</li>
                </ul>
              </Text>
            </Flex.Item>
            <Flex.Item flexBasis="0" flex="grow" minWidth={300} maxWidth="33%">
              <Heading color="subtle" size="200">
                Consider brand expression
              </Heading>
              <Text>
                <ul>
                  <li>Dashboards(when applicable and it does not break a component)</li>
                </ul>
              </Text>
            </Flex.Item>
            <Flex.Item flexBasis="0" flex="grow" minWidth={300} maxWidth="33%">
              <Heading color="error" size="200">
                Elements to avoid brand expression
              </Heading>
              <Text>
                <ul>
                  <li>Core UI patterns</li>
                  <li>Text components</li>
                  <li>CTAs and other action components </li>
                  <li>Tables</li>
                  <li>Form components </li>
                </ul>
              </Text>
            </Flex.Item>
          </Flex>
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
                alt=""
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
                alt=""
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="do"
            description="Use color fills in celebratory moments, such as telling good news or highlighting Pinner's achievements."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/f3/28/c9/f328c971f43eabac1a9577ac229a90ef.png"
                naturalWidth={767}
                naturalHeight={590}
                alt=""
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
                alt=""
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="do"
            description="Apply text over color fills using the appropriate text [color tokens](/foundations/design_tokens#Text-color). It will ensure an accessible, readable experience."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/ee/92/be/ee92be2b2750c84fcf3073fb13dec636.png"
                naturalWidth={686}
                naturalHeight={358}
                alt=""
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
                alt=""
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="do"
            description="Use color fills when announcing new features (e.g., new way to search for hairstyle ideas)."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/dd/8e/a4/dd8ea46b19b81846ee2f66ed322789f5.png"
                naturalWidth={750}
                naturalHeight={580}
                alt=""
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
                alt=""
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
        <Markdown
          text={`Be mindful of color usage. Pinterest’s goal as a company is to meet [WCAG 2.1 AA standards](https://www.w3.org/TR/WCAG21/), so we recommend using a tool like [aremycolorsaccessible.com](https://www.aremycolorsaccessible.com/)  to check the foreground color against the background color. In Figma, you can use the [Able](https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility) or [Pinterest brand color palettes](https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes) plugins to check color contrast in your designs.

When adding photography or any imagery source, ensure it translates well in both themes (light and dark-mode). Your image source should be equally visible in both themes, especially when you have colored backgrounds contrasting with a photo or an illustration.

Ensure to add ALT text to your image, so users who rely on assistive technologies can access your image content.`}
        />
      </MainSection>
      <MainSection name="Localization">
        <Text>
          Make sure to localize in-product marketing assets considering all the languages and
          cultures.
        </Text>
      </MainSection>
      <MainSection name="Voice and tone">
        <Text>Check out our brand voice guidelines.</Text>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Accessibility](/web/popover)**


**[Color](/web/upsell)**


**[Design tokens](/web/upsell)**


      `}
        />
      </MainSection>
    </Page>
  );
}
