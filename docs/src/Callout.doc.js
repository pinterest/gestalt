// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Callout"
    description="Callouts are banners that display short messages that are either helpful information to a task on the page or require user attention."
  />
);

card(
  <Example
    name="Info Example"
    defaultCode={`
<Callout
  type="info"
  iconAccessibilityLabel="Info icon"
  title="Your business account was created!"
  message="Apply to the Verified Merchant Program!"
  primaryLink={{href: "https://pinterest.com", label:"Get started"}}
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
    name="Warning Example"
    defaultCode={`
<Callout
  type="warning"
  iconAccessibilityLabel="Warning icon"
  message="This feature will be removed in two weeks."
  primaryLink={{href: "https://pinterest.com", label:"Learn more"}}
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
    name="Error Example"
    defaultCode={`
<Callout
  type="error"
  iconAccessibilityLabel="Error icon"
  message="This action can't be undone."
/>
  `}
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
          'Text to render inside the callout to convey detailed information to the user. The message text has a fixed size.',
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
        name: 'iconAccessibilityLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to provide sufficient context about the callout intent.',
          'The callout component displays `error`, `info`, or `warning` icons which visually indicate the intent of the component. `iconAccessibilityLabel` allows screen readers to communicate that intent.',
          'Accessibility: It populates aria-label.',
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
          'Link-role button to render inside the callout as the main call-to-action to the user. The label text has a fixed size.',
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
          'Link-role button to render inside the callout as a secondary call-to-action to the user.',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.',
          'Accessibility: `accessibilityLabel` populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of the button `text`.',
        ],
        href: '',
      },
      {
        name: 'type',
        type: `"error" | "info" | "warning"`,
        required: true,
        defaultValue: null,
        description: [
          'Select a type of callout:',
          '-`error`: To provide error messaging to the user.',
          '-`info`: To provide general information to the user.',
          '-`warning`: To provide a warn message to the user.',
        ],
        href: '',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Heading to render inside the callout above the message to convey the callout topic to the user. The message text has a fixed size.',
        ],
        href: '',
      },
    ]}
  />
);

export default cards;
