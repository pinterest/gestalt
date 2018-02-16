// @flow
import * as React from 'react';
import GroupAvatar from './GroupAvatar';
import Box from '../Box/Box';
import {
  ns,
  card,
  PropTable,
  Example,
  Combination,
} from '../../.corkboard/cards';

ns(
  'Group Avatar',
  `You can use an \`GroupAvatar\` to represent a group of users. A light wash is automatically
applied to each collaborator image to ensure the component retains a circular appeareance`
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
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 36px, sm: 60px, md: 108px, lg: 156px, xl: 198px`,
        required: 'true',
      },
    ]}
  />,
  { heading: false }
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
  'Example',
  <Example
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
    size="md"
  />
</Box>
`}
    scope={{ Box, GroupAvatar }}
  />,
  { stacked: true }
);

card(
  'Size Combinations: 1 Person',
  <Combination size={['xs', 'sm', 'md', 'lg', 'xl']}>
    {props => <GroupAvatar collaborators={[ben]} {...props} />}
  </Combination>
);

card(
  'Size Combinations: 2 People',
  <Combination size={['xs', 'sm', 'md', 'lg', 'xl']}>
    {props => <GroupAvatar collaborators={[ben, evan]} {...props} />}
  </Combination>
);

card(
  'Size Combinations: 3 People',
  <Combination size={['xs', 'sm', 'md', 'lg', 'xl']}>
    {props => <GroupAvatar collaborators={[ben, evan, li]} {...props} />}
  </Combination>
);

card(
  'Size Combinations: 3 People (no pictures)',
  <Combination size={['xs', 'sm', 'md', 'lg', 'xl']}>
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
