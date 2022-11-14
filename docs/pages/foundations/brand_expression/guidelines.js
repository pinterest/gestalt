// @flow strict
import { Text, Flex, Box, Link } from 'gestalt';
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Markdown from '../../../docs-components/Markdown';

export default function MessagingComponentsPage(): Node {
  return (
    <Page title="Brand expression">
      <PageHeader badge="pilot" name="Brand expression" type="guidelines" />
      <Markdown
        text={`We consider brand expression in the product the combination of visual elements (colors, typography, photography, motion, and other assets) to provide a delightful experience for Pinners by bringing Pinterest brand touch-points through the user experience, such as promoting a new feature, launching new tools, and reinforcing marketing messages within the product UI.

The guidelines below aim to guide you on how to incorporate brand expression into the product, adding unique value to Pinners. They aren't intended to determine what specific surfaces must look like; instead, it is meant to illustrate the principles and general usage of brand expressions respecting usability and accessibility best practices.

These guidelines will broadly align with the brand standards. Still, they will follow our design principles, and there are areas where they may diverge as our focus is brand expression specific to product UI rather than marketing materials and campaigns.
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
          - To reflect a person, company or brand within the product.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To represent a group of people, companies and/or brands. Use [AvatarGroup](/web/avatargroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">Foo</MainSection>
      <MainSection name="Accessibility">Foo</MainSection>
      <MainSection name="Localization">Foo</MainSection>
      <MainSection name="Voice and tone">Foo</MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Popover](/web/popover)**
A popover can be formatted to provide help and guidance around new features, or features a user may not be aware of.

**[Upsell](/web/upsell)**
Upsells are on-page banners that encourage more ad spend and upgrades. They can also be used to promote and market new features.

**Error message variants**
Variants for other non-messaging components that provide a way to show an error message (simple error status indicators are not included)..

- **[Text field error message](/web/textfield#Error-message)**
- **[RadioGroup error message](/web/radiogroup#With-an-error)**
- **[Checkbox error message](/web/checkbox#Error-message)**
      `}
        />
      </MainSection>
    </Page>
  );
}
