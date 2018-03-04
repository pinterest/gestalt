// @flow
import React from 'react';
import { Box, Heading } from 'gestalt';

type Props = {|
  cards: *,
  location: { pathname: string },
|};

export default function CardPage(props: Props) {
  const { cards: allCards, location: { pathname } } = props;
  const ns = pathname.match(/\/(.+)/)[1];

  if (Object.keys(allCards).length === 0) {
    return <div />;
  }

  const cards = allCards[ns];
  return cards ? (
    <Box>
      {cards.map((card, i) => (
        <Box marginBottom={4} id={`card-${i}`} key={i}>
          {card.fn()}
        </Box>
      ))}
    </Box>
  ) : (
    <Box>
      <Heading size="lg" color="maroon">
        Oops!
      </Heading>
      <Heading size="md" color="red">
        This page could not be found.
      </Heading>
    </Box>
  );
}
