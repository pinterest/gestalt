// @flow
import * as React from 'react';
import { Box } from 'gestalt';

type Props = {|
  cards: Array<React.Node>,
|};

const CardPage = ({ cards }: Props) => (
  <Box>
    {cards.map((card, i) => (
      <Box marginBottom={4} id={`card-${i}`} key={i}>
        {card}
      </Box>
    ))}
  </Box>
);

export default CardPage;
