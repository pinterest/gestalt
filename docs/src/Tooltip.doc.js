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
    or hovered. Tooltips are about way finding, not feature adoption, education, or promotion. They
    should only include short descriptive text and are co-located with the element they describe."
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
          'String that is shown as addition information in a tooltip bubble to describe the child. Always localize the text.',
      },
    ]}
  />
);

card(
  <Example
    name="Icon Button Tooltips"
    description={`
      If more information is needed to describe an IconButton, you can wrap it in a Tooltip
      in order to reveal more help text on hover or focus.

      Screenreaders will pick up on the accessibilityLabel supplied to the child, in this case
      IconButton, while the Tooltip just provides a more visible on screen description.

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
    name="Button Tooltips"
    defaultCode={`
<Tooltip text="Add friend">
  <Button
    accessibilityLabel="Add Peter as a friend"
    color="red"
    text="Add"
  />
</Tooltip>
`}
  />
);

export default cards;
