// @flow
import * as React from 'react';
import { GroupAvatar } from 'gestalt';
import PropTable from './components/PropTable';
import james from './avatars/james.jpg';
import keerthi from './avatars/keerthi.jpg';
import shanice from './avatars/shanice.jpg';
import Example from './components/Example';
import Combination from './components/Combination';
import PageHeader from './components/PageHeader';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="GroupAvatar"
    description={`You can use an \`GroupAvatar\` to represent a group of users. A light wash is automatically
applied to each collaborator image to ensure the component retains a circular appeareance`}
  />
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
        type: `"sm" | "md" | "lg"`,
        description:
          'sm: 24px, md: 40px, lg: 72px. If size is undefined, Avatar will fill 100% of the parent container width',
      },
    ]}
  />
);

const user1 = {
  name: 'Keerthi',
  src: keerthi,
};
const user2 = {
  name: 'Shanice',
  src: shanice,
};
const user3 = {
  name: 'James',
  src: james,
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
        src: '${keerthi}',
      },
      {
        name: 'Shanice',
        src: '${shanice}',
      },
    ]}
    size="lg"
  />
</Box>
`}
  />
);

card(
  <Example
    description={`
    GroupAvatars that are not given a \`size\` prop will be expand to fit to the width of their
    parent container. A common use case is to achieve column-based sizing.

    Resize the browser to see these GroupAvatar change to match the width of the \`Column\` they
    have been placed in.
  `}
    name="Container Based Sizes"
    defaultCode={`
<Box display="flex" direction="row">
  <Box column={2} padding={2}>
    <GroupAvatar collaborators={[{ name: 'Julia' }]} />
  </Box>
  <Box column={2} padding={2}>
    <GroupAvatar collaborators={[{ name: 'James', src: "${james}" }, { name: 'Julia' }]} />
  </Box>
  <Box column={3} padding={2}>
    <GroupAvatar collaborators={[{ name: 'Keerthi', src: "${keerthi}" }, { name: 'Shanice', src: "${shanice}" }, { name: 'Julia' }]} />
  </Box>
</Box>
  `}
  />
);

card(
  <Combination name="Size Combinations: 1 Person" size={['sm', 'md', 'lg']}>
    {props => <GroupAvatar collaborators={[user1]} {...props} />}
  </Combination>
);

card(
  <Combination name="Size Combinations: 2 People" size={['sm', 'md', 'lg']}>
    {props => <GroupAvatar collaborators={[user1, user3]} {...props} />}
  </Combination>
);

card(
  <Combination name="Size Combinations: 3 People" size={['sm', 'md', 'lg']}>
    {props => <GroupAvatar collaborators={[user1, user3, user2]} {...props} />}
  </Combination>
);

card(
  <Combination
    name="Size Combinations: 1 Person (no pictures)"
    size={['sm', 'md', 'lg']}
  >
    {props => (
      <GroupAvatar
        collaborators={[user1].map(collab => ({
          name: collab.name,
        }))}
        {...props}
      />
    )}
  </Combination>
);

card(
  <Combination
    name="Size Combinations: 3 People (no pictures)"
    size={['sm', 'md', 'lg']}
  >
    {props => (
      <GroupAvatar
        collaborators={[user1, user3, user2].map(collab => ({
          name: collab.name,
        }))}
        {...props}
      />
    )}
  </Combination>
);

export default cards;
