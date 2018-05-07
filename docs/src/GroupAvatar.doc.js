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
import CardPage from './components/CardPage';

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
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        description: 'sm: 24px, md: 40px, lg: 72px',
        required: true,
      },
    ]}
    heading={false}
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

export default () => <CardPage cards={cards} />;
