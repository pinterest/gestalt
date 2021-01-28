// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Tooltip"
    description="The Tooltip component allows you to wrap a child with a help tooltip when hovered.
    Tooltips are about way finding, not feature adoption, education, or promotion. They should
    only include short descriptive text and are co-located with the element they describe."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
        required: true,
        description: 'The element to wrap with a tooltip on hover.',
      },
      {
        name: 'idealDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description: 'Preferred direction for the Tooltip to open',
        defaultValue: 'down',
      },
      {
        name: 'inline',
        type: 'boolean',
        href: 'inline',
        description: 'Flag used to help render the tooltip inline to the element',
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description:
          'String that is shown as addition information in a tooltip bubble to describe the child. Always localize the text.',
      },
      {
        name: 'link',
        type: 'React.Node',
        required: false,
        description: 'A link which will show on the bottom of a tooltip',
      },
      {
        name: 'zIndex',
        type: 'interface Indexable { index(): number; }',
        required: false,
        description: 'An object representing the zIndex value of the Tooltip.',
      },
    ]}
  />,
);

card(
  <Example
    name="Tooltips"
    description="General Tooltip usage involves wrapping your target in a Tooltip. Notice how long
    text is wrapped around underneath."
    defaultCode={`
<Tooltip inline text="Logout">
  <Icon
    accessibilityLabel="Logout of your profile"
    color="pine"
    icon="logout"
  />
</Tooltip>
`}
  />,
);

card(
  <Example
    name="Tooltips with link"
    description="Passing in a link will render the link in the tooltip"
    defaultCode={`
<Tooltip
  inline
  text="Logout"
  link={
    <Link href="https://pinterest.com" target="blank">
      <Text color="white" size="sm" weight="bold">
        Learn more
      </Text>
    </Link>
  }
>
  <Icon
    accessibilityLabel="Logout of your profile"
    color="pine"
    icon="logout"
  />
</Tooltip>
`}
  />,
);

card(
  <Example
    id="inline"
    name="Inlining Tooltips"
    description="Pass this flag in when rendering the tooltip around an inline element such as an Icon,
      IconButton, or a Button with the inline prop set. This will help correctly position the tooltip
      alongside the element."
    defaultCode={`
<Box>
  <Box padding={2}>
    <Tooltip inline text="Inline tooltip">
      <Button
        accessibilityLabel="This tooltip wraps an inline button and occupies the same space"
        color="gray"
        text="Inline"
        inline
      />
    </Tooltip>
  </Box>
  <Box padding={2}>
    <Tooltip text="Full width tooltip">
      <Button
        accessibilityLabel="This tooltip wraps and allows a button to remain full width"
        color="red"
        text="Full width"
      />
    </Tooltip>
  </Box>
</Box>
`}
  />,
);

card(
  <Example
    name="Accessibility"
    description={`
      If more information is needed to describe an IconButton, you can wrap it in a Tooltip
      in order to reveal more help text on hover.

      Screenreaders will pick up on the accessibilityLabel supplied to the child, in this case
      IconButton, while the Tooltip just provides a more visible on screen description.

      Be sure to internationalize your \`text\`.
  `}
    defaultCode={`
<Tooltip inline text="Remove image">
  <IconButton
    accessibilityLabel="Delete this image from your profile"
    bgColor="white"
    icon="trash-can"
    iconColor="darkGray"
    onClick={() => { console.log('😱')}}
  />
</Tooltip>
`}
  />,
);

export default cards;
