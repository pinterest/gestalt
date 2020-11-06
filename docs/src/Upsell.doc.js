// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Upsell"
    description="Upsells are banners that display short messages that focus on selling or upgrading something the user already has."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'message',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Text to render inside the Upsell to convey detailed information to the user. The message text has a fixed size.',
        ],
        href: '',
      },
      {
        name: 'dismissButton',
        type: '{| accessibilityLabel: string, onDismiss: () => void, |}',
        required: false,
        defaultValue: null,
        description: [
          'Callback fired when the dismiss button is clicked (pressed and released) with a mouse or keyboard.',
          'Supply a short, descriptive label for screen-readers to provide sufficient context about the dismiss button action. IconButtons do not render text for screen readers to read requiring an accessibility label.',
          'Accessibility: `accessibilityLabel` populates aria-label.',
        ],
        href: '',
      },
      {
        name: 'primaryLink',
        type:
          '{| accessibilityLabel?: string , href: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}',
        required: false,
        defaultValue: null,
        description: [
          'Link-role button to render inside the Upsell as the main call-to-action to the user. The label text has a fixed size.',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.',
          'Accessibility: `accessibilityLabel` populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of the button `text`.',
        ],
        href: '',
      },
      {
        name: 'secondaryLink',
        type:
          '{| accessibilityLabel?: string , href: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}',
        required: false,
        defaultValue: null,
        description: [
          'Link-role button to render inside the Upsell as a secondary call-to-action to the user.',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.',
          'Accessibility: `accessibilityLabel` populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of the button `text`.',
        ],
        href: '',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Heading to render inside the Upsell above the message to convey the Upsell topic to the user. The message text has a fixed size.',
        ],
        href: '',
      },
    ]}
  />
);

card(
  <Example
    name="Call to Actions and Title"
    defaultCode={`
<Upsell
  title="Join the Verified Merchant Program"
  message="Apply to the Verified Merchant Program—it’s free"
  primaryLink={{href: "https://pinterest.com", label:"Apply now"}}
  secondaryLink={{href: "https://pinterest.com", label:"Learn more"}}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
/>
`}
  />
);

card(
  <Example
    name="Simple message"
    defaultCode={`
<Upsell
  message="Single line upsell with no title or call to action."
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
/>
  `}
  />
);

export default cards;
