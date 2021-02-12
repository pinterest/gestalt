// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ActivationCard"
    description="Activation cards are used in groups to communicate a user’s stage in a series of steps toward an overall action."
  />,
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
          'Text to render inside the activation card to convey detailed information to the user. The message text has a fixed size.',
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
        name: 'link',
        type:
          '{| accessibilityLabel?: string , href: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}, onNavigationOptions: ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void, rel: "none" | "nofollow", target: "null" | "self" | "blank" |}',
        required: false,
        defaultValue: null,
        description: [
          'Link-role button to render inside the activation card as a call-to-action to the user.',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.',
          `- onNavigationOptions: onNavigationOptions works in conjunction with a Provider. Pass custom props to onNavigation. See Provider for examples. onNavigation's type is flexible. Each key's value is a React.Node or an event handler function.`,
          'Accessibility: `accessibilityLabel` populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of the button `text`.',
        ],
        href: '',
      },
      {
        name: 'status',
        type: `"notStarted" | "pending" | "needsAttention" | "complete"`,
        required: true,
        defaultValue: null,
        description: [
          'Select the activation card status:',
          '-`notStarted`: A task that has not be started',
          '-`pending`: A task that is pending action',
          "-`needsAttention`: A task that requires the user's attention",
          '-`complete`: A task that has been completed',
        ],
        href: '',
      },
      {
        name: 'statusMessage',
        type: 'string',
        required: true,
        defaultValue: null,
        description: ['A message to indicate the current status of the activation card.'],
        href: '',
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Heading to render inside the activation card above the message to convey the activation card topic to the user.',
        ],
        href: '',
      },
    ]}
  />,
);

card(
  <Example
    name="Not started and Pending Cards"
    defaultCode={`
<Box display="flex" marginStart={-1} marginEnd={-1}>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="notStarted"
      statusMessage="Not started"
      title="Claim your website"
      message="Grow distribution and track Pins linked to your website"
      link={{href: "https://pinterest.com", label:"Claim your website now"}}
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: ()=>{},
      }}
    />
  </Box>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="pending"
      statusMessage="Pending"
      title="Claim your website"
      message="We will notify you via email as soon as your site has been successfully claimed."
      link={{href: "https://pinterest.com", label:"Learn more"}}
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: ()=>{},
      }}
    />
  </Box>
</Box>
  `}
  />,
);

card(
  <Example
    name="Needs attention and Complete Cards"
    defaultCode={`
<Box display="flex" marginStart={-1} marginEnd={-1}>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="needsAttention"
      statusMessage="Needs attention"
      title="Tag is unhealthy"
      message="Oops! Your tag must be healthy to continue."
      link={{accessibilityLabel:"Learn more about tag health", href: "https://pinterest.com", label:"Learn more"}}
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: ()=>{},
      }}
    />
  </Box>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="complete"
      statusMessage="Completed"
      title="Nice work"
      message="Tag is installed and healthy"
    />
  </Box>
</Box>
  `}
  />,
);

export default cards;
