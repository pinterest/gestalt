// @flow
import React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Tooltip"
    description="The Tooltip component allows you to wrap a child with a help tooltip when focused
    or hovered."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
        required: true,
        description: 'The element to wrap with a tooltip on hover or focus.',
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description:
          'String that is shown as addition information in a tooltip bubble to describe the child. This supersedes the accessibilityLabel and clients such as VoiceOver will use this to describe the element. Always localize the label.',
      },
    ]}
  />
);

card(
  <Example
    name="Icon Button Tooltips"
    description={`
      If more information is needed to describe an IconButton, you can wrap it in a Tooltip and
      in order to reveal more help text on hover or focus. This text will supersede
      any accessibility label and be available to screenreaders.

      Be sure to internationalize your \`text\`.
  `}
    defaultCode={`
<Tooltip text="Delete image">
  <IconButton
    accessibilityLabel="Delete this image from your profile"
    bgColor="white"
    icon="trash-can"
    iconColor="darkGray"
    onClick={() => { console.log('😱')}}
  />
</Tooltip>
`}
  />
);

card(
  <Example
    name="Icon Tooltips"
    defaultCode={`
<Tooltip text="Logout">
  <Icon
    accessibilityLabel="Logout of your profile"
    color="pine"
    icon="logout"
  />
</Tooltip>
`}
  />
);

card(
  <Example
    name="Text Tooltips"
    description="A tooltip can be used to help describe confusing text such as an acronym"
    defaultCode={`
<Tooltip text="Words per minute">
  <Heading>
    150 WPM
  </Heading>
</Tooltip>
`}
  />
);

export default cards;
