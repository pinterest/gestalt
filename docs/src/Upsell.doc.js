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
        name: 'imageData',
        type:
          '{| component: typeof Image | typeof Icon, width?: number, mask: { rounding: "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, wash: boolean} |}',
        required: false,
        defaultValue: null,
        description: [
          'Either <Image /> or <Icon /> to render on left side of banner. Width is not used with Icon. Image width defaults to 128 px. Max width of image is 128 px.',
        ],
        href: 'Image',
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

card(
  <Example
    name="Icon"
    defaultCode={`
<Upsell
  title="Give $30, get $60 in ads credit"
  message="When your friend spends their first $30 on ads, you’ll earn $60 of ads credit, and they’ll get $30 of ads credit, too"
  primaryLink={{href: "https://pinterest.com", label:"Send invite"}}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
  imageData={{
    component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32}/>
  }}
/>
`}
  />
);

card(
  <Example
    name="Image"
    defaultCode={`
<Upsell
  title="Stay healthy and safe"
  message="Please practice social distancing, and check out our resources for adapting to these times."
  primaryLink={{href: "https://pinterest.com", label:"Visit"}}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
  imageData={{
      component: 
        <Image
          alt="Please practice social distancing, and check out our resources for adapting to these times."
          color="rgb(231, 186, 176)"
          naturalHeight={751}
          naturalWidth={564}
          src="https://i.ibb.co/7bQQYkX/stock2.jpg"
        />,
        mask: {rounding: 4},
      width: 128,
    }}
/>
`}
  />
);

export default cards;
