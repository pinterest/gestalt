// @flow strict
import { Text, Flex, Link, Heading } from 'gestalt';
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
          <Text>
            Be mindful of when and where to bring brand expressions into your design. If color
            fills, imagery and other brand elements are needed to reinforce brand touch-points
            within your design, then go for it; if not, aim to follow our{' '}
            <Link inline href="/foundations/overview">
              foundation guidelines
            </Link>
            . A consistent design allows Pinterest content to shine while ensuring a great usability
            experience.
          </Text>
          <Text>
            Below we list the UI elements you can use and the ones you should avoid when bringing
            brand expression within your product UI.
          </Text>
        </MainSection.Subsection>
        <MainSection.Subsection title="UI elements and Brand expression">
          <Flex>
            <Flex.Item>
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
            <Flex.Item>
              <Heading color="subtle" size="200">
                Consider brand expression
              </Heading>
              <Text>
                <ul>
                  <li>Dashboards(when applicable and it does not break a component)</li>
                </ul>
              </Text>
            </Flex.Item>
            <Flex.Item>
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
          />
          <MainSection.Card
            type="don't"
            description="Use alternative colors to modify components colors or UI patterns. Color should be applied purposefully as it can convey meaning in multiple ways."
          />
          <MainSection.Card
            type="do"
            description="Use color fills in celebratory moments, such as telling good news or highlighting Pinner's achievements."
          />
          <MainSection.Card
            type="don't"
            description="Apply text over photography as it could lead to contrast issues and make it inaccessible through assistive devices."
          />
          <MainSection.Card
            type="do"
            description="Apply text over color fills using the appropriate text [color tokens](/foundations/design_tokens#Text-color). It will ensure an accessible, readable experience."
          />
          <MainSection.Card
            type="don't"
            description="Use alternative colors on text content and icons as it could lead to major contrast accessibility and usability issues. **This rule doesn't cover marketing materials, and promotional landing pages.**"
          />
          <MainSection.Card
            type="do"
            description="Use color fills when announcing new features (e.g., new way to search for hairstyle ideas)."
          />
          <MainSection.Card
            type="don't"
            description="Apply color fills on core UI patterns and critical tasks actions. It can distract Pinners from completing a task."
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
        <Text>
          <p>
            Be mindful of color usage. Pinterest’s goal as a company is to meet{' '}
            <Link inline href="https://www.w3.org/TR/WCAG21/">
              WCAG 2.1 AA standards
            </Link>
            , so we recommend using a tool like{' '}
            <Link inline href="https://www.aremycolorsaccessible.com/">
              aremycolorsaccessible.com
            </Link>{' '}
            to check the foreground color against the background color. In Figma, you can use the{' '}
            <Link
              inline
              href="https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility"
            >
              Able
            </Link>{' '}
            or{' '}
            <Link
              inline
              href="https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes"
            >
              Pinterest brand color palettes
            </Link>{' '}
            plugins to check color contrast in your designs.
          </p>
          <p>
            When adding photography or any imagery source, ensure it translates well in both themes
            (light and dark-mode). Your image source should be equally visible in both themes,
            especially when you have colored backgrounds contrasting with a photo or an
            illustration.
          </p>
          <p>
            Ensure to add ALT text to your image, so users who rely on assistive technologies can
            access your image content.
          </p>
        </Text>
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
