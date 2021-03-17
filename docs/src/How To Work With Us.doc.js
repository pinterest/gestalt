// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import Markdown from './components/Markdown.js';
import PageHeader from './components/PageHeader.js';
import pageContent from './how-to-work-with-us.md';

const cards: Array<Node> = [];

const card = (c) => cards.push(c);
function HowToWorkWithUs() {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    fetch(pageContent)
      .then((res) => res.text())
      .then((md) => {
        setContent(md);
      });
  });

  return (
    <Box>
      <PageHeader name="How to work with us" showSourceLink={false} />

      <Markdown text={content} />
    </Box>
  );
}

card(<HowToWorkWithUs />);

export default cards;
