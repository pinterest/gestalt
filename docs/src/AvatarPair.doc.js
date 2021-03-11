// @flow strict
import type { Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<PageHeader name="AvatarPair" description="Show avatars in pairs" />);

card(
  <PropTable
    props={[
      {
        name: 'collaborators',
        type: 'Array<{| name: string, src?: string |}>',
        required: true,
      },
      {
        name: 'size',
        type: `"md" | "lg" | "fit"`,
        defaultValue: 'fit',
        description:
          'md: 48px, lg: 64px. If size is `fit`, AvatarPair will fill 100% of the parent container width',
      },
    ]}
  />,
);

card(
  <Example
    name="Example: Basic"
    defaultCode={`
<AvatarPair size="md"
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
/>
`}
  />,
);

card(
  <Example
    description={`
    The size of the avatars is defined by their container. In this case the container is 64px wide & tall and each avatar is 48px.
  `}
    name="Example: Fit container width"
    defaultCode={`
<Box width={64}>
  <AvatarPair
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
  />
</Box>
`}
  />,
);

export default cards;
