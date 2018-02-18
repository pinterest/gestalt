import React from 'react';
import Box from '../../../src/Box/Box';
import Heading from '../../../src/Heading/Heading';

export default function CardPage(props) {
  const { cards: allCards, params: { ns } } = props;

  if (Object.keys(allCards).length === 0 || !ns) {
    return <div />;
  }

  const cards = allCards[ns];
  return cards ? (
    <Box>
      {cards.map((card, i) => (
        <Box marginTop={6} marginBottom={6} id={`card-${i}`} key={i}>
          {card.fn()}
        </Box>
      ))}
    </Box>
  ) : (
    <Box>
      <Heading size="lg" color="red">
        Oops
      </Heading>
      <Heading size="md">This page could not be found.</Heading>
    </Box>
  );
}
