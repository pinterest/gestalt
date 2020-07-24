// @flow strict
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Callout"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'description',
        type: 'string',
        required: true,
      },
      {
        name: 'iconAccessibilityLabel',
        type: 'string',
        required: true,
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
      },
      {
        name: 'primaryLink',
        type: '{| href: string, label: string |}',
      },
      {
        name: 'secondaryLink',
        type: '{| href: string, label: string |}',
      },
      {
        name: 'style',
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
    style="info" 
    iconAcessibilityLabel=""
    title="The thing you were doing is now done"
    description="Get a badge, show up in more experiences and more."
    primaryLink={{href: "https://pinterest.com", label:"Get started"}} 
    secondaryLink={{href: "https://pinterest.com", label:"Learn more"}} 
  />
`}
  />
);

card(
  <Example
    name="Warning Example"
    defaultCode={`
<Callout
  style="warning" 
  iconAcessibilityLabel=""
  onDismiss={()=>{}}
  description="This feature will be removed in two weeks."
  primaryLink={{href: "https://pinterest.com", label:"Learn more"}}
/>
  `}
  />
);

card(
  <Example
    name="Error Example"
    defaultCode={`
<Callout
  style="error" 
  iconAcessibilityLabel=""
  onDismiss={()=>{}}
  description="Oops"
/>
  `}
  />
);

export default cards;