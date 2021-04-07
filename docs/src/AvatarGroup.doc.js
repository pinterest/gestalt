// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="AvatarGroup"
    description="Brief description of this component"
    defaultCode={`
<AvatarGroup size="md"
  collaborators={[
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Alberto',
      src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
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
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        description=""
        defaultCode={`
        function AccessibilityExample() {
  const size = "md"
  const addMoreCollaborators = true
  const [collaborators, setCollaborators] = React.useState([
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Shanuce',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Shanuce',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
      {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Shanuce',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Shanuce',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
      {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Shanuce',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
    {
      name: 'Shanuce',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
  ]);

  return (

<Box><AvatarGroup role="button" onClick={() => setCollaborators([ {
      name: 'Alberto',
      src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
    },
     {
      name: 'Alberto',
    },  {
      name: 'Alberto',
      src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
    }])} addCollaborators={addMoreCollaborators} size={size}
  collaborators={collaborators}
  /></Box>
)}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
