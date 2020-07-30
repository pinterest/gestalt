// @flow strict
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(<PageHeader name="Callout" />);

card(
  <PropTable
    props={[
      {
        name: 'description',
        type: 'string',
        required: true,
      },
      {
        name: 'dismissButton',
        type: '{| accessibilityLabel: string, onDismiss: () => void, |}',
      },
      {
        name: 'iconAccessibilityLabel',
        type: 'string',
        required: true,
      },
      {
        name: 'primaryLink',
        type:
          '{| href: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> }) => void |}',
      },
      {
        name: 'secondaryLink',
        type:
          '{| href: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> }) => void |}',
      },
      {
        name: 'type',
        type: `"error" | "info" | "warning"`,
        required: true,
      },
      {
        name: 'title',
        type: 'string',
      },
    ]}
  />
);

card(
  <Example
    name="Info Example"
    defaultCode={`
<Callout
  type="info"
  iconAccessibilityLabel="Info icon"
  title="Your business account was successfully created!"
  description="Get a badge, show up in more shopping experiences and more. Apply to the Verified Merchant Program—it’s free!"
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
  description="This feature will be removed in two weeks."
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
  description="This action can't be undone."
/>
  `}
  />
);

export default cards;
