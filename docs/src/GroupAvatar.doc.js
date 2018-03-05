// @flow
import * as React from 'react';
import { GroupAvatar, Box } from 'gestalt';
import PropTable from './components/PropTable';
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

const ben = {
  name: 'Ben S.',
  src:
    'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iBzx2mf8iyl4/v1/-1x-1.jpg',
};
const li = {
  name: 'Li Fan',
  src: 'https://tctechcrunch2011.files.wordpress.com/2016/09/lifan-photo.png',
};
const evan = {
  name: 'Evan S.',
  src:
    'https://archinect.imgix.net/uploads/q4/q4lvjve1b3pelocx.jpg?auto=compress%2Cformat',
};

card(
  <Example
    name="Example"
    defaultCode={`
<Box width={108}>
<GroupAvatar
  collaborators={[
    {
      name: 'Evan S.',
      src:
        'https://archinect.imgix.net/uploads/q4/q4lvjve1b3pelocx.jpg?auto=compress%2Cformat',
    },
    {
      name: 'Ben S.',
      src:
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iBzx2mf8iyl4/v1/-1x-1.jpg',
    },
  ]}
  size="lg"
/>
</Box>
`}
    scope={{ Box, GroupAvatar }}
  />
);

card(
  <Combination name="Size Combinations: 1 Person" size={['sm', 'md', 'lg']}>
    {props => <GroupAvatar collaborators={[ben]} {...props} />}
  </Combination>
);

card(
  <Combination name="Size Combinations: 2 People" size={['sm', 'md', 'lg']}>
    {props => <GroupAvatar collaborators={[ben, evan]} {...props} />}
  </Combination>
);

card(
  <Combination name="Size Combinations: 3 People" size={['sm', 'md', 'lg']}>
    {props => <GroupAvatar collaborators={[ben, evan, li]} {...props} />}
  </Combination>
);

card(
  <Combination
    name="Size Combinations: 1 Person (no pictures)"
    size={['sm', 'md', 'lg']}
  >
    {props => (
      <GroupAvatar
        collaborators={[ben].map(collab => ({
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
        collaborators={[ben, evan, li].map(collab => ({
          name: collab.name,
        }))}
        {...props}
      />
    )}
  </Combination>
);

export default () => <CardPage cards={cards} />;
