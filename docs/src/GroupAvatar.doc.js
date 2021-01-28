// @flow strict
import React, { type Node } from 'react';
import { GroupAvatar } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="GroupAvatar"
    description={`You can use an \`GroupAvatar\` to represent a group of users. A light wash is automatically
applied to each collaborator image to ensure the component retains a circular appearance.`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'collaborators',
        type: 'Array<{ name: string, src?: string }>',
        required: true,
      },
      {
        name: 'outline',
        type: 'boolean',
        defaultValue: false,
        description: `Adds a white border around GroupAvatar so it's visible when displayed on other images`,
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl" | "fit"`,
        defaultValue: 'fit',
        description:
          'xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px. If size is `fit`, GroupAvatar will fill 100% of the parent container width',
      },
    ]}
  />,
);

const user1 = {
  name: 'Keerthi',
  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
};
const user2 = {
  name: 'Shanice',
  src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
};
const user3 = {
  name: 'James',
  src: 'https://i.ibb.co/2Fc00R3/james.jpg',
};

card(
  <Example
    name="Example"
    defaultCode={`
<Box width={108}>
  <GroupAvatar
    collaborators={[
      {
        name: 'Keerthi',
        src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
      },
      {
        name: 'Shanice',
        src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
      },
    ]}
    size="lg"
  />
</Box>
`}
  />,
);

card(
  <Combination
    id="1-person"
    name="Size Combinations: 1 Person"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
  >
    {(props) => <GroupAvatar collaborators={[user1]} {...props} />}
  </Combination>,
);

card(
  <Combination
    id="2-people"
    name="Size Combinations: 2 People"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
  >
    {(props) => <GroupAvatar collaborators={[user1, user3]} {...props} />}
  </Combination>,
);

card(
  <Combination
    id="3-people"
    name="Size Combinations: 3 People"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
  >
    {(props) => <GroupAvatar collaborators={[user1, user3, user2]} {...props} />}
  </Combination>,
);

card(
  <Combination
    id="no-pictures"
    name="Size Combinations: 1 Person (no pictures)"
    size={['sm', 'md', 'lg']}
  >
    {(props) => (
      <GroupAvatar
        collaborators={[user1].map((collab) => ({
          name: collab.name,
        }))}
        {...props}
      />
    )}
  </Combination>,
);

card(
  <Combination
    id="3-no-pictures"
    name="Size Combinations: 3 People (no pictures)"
    size={['sm', 'md', 'lg']}
  >
    {(props) => (
      <GroupAvatar
        collaborators={[user1, user3, user2].map((collab) => ({
          name: collab.name,
        }))}
        {...props}
      />
    )}
  </Combination>,
);

card(
  <Example
    description={`
    GroupAvatars that are not given a \`size\` prop will expand to fit to the width of their
    parent container. A common use case is to achieve column-based sizing.

    Resize the browser to see these GroupAvatar change to match the width of the \`Column\` they
    have been placed in.
  `}
    name="Container-based Sizes"
    defaultCode={`
<Box display="flex" direction="row">
  <Box column={2} padding={2}>
    <GroupAvatar collaborators={[{ name: 'Julia' }]} />
  </Box>
  <Box column={2} padding={2}>
    <GroupAvatar collaborators={[{ name: 'James', src: "https://i.ibb.co/2Fc00R3/james.jpg" }, { name: 'Julia' }]} />
  </Box>
  <Box column={3} padding={2}>
    <GroupAvatar collaborators={[{ name: 'Keerthi', src: "https://i.ibb.co/ZfCZrY8/keerthi.jpg" }, { name: 'Shanice', src: "https://i.ibb.co/7tGKGvb/shanice.jpg" }, { name: 'Julia' }]} />
  </Box>
</Box>
  `}
  />,
);
export default cards;
