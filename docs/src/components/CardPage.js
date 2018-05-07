// @flow
import * as React from 'react';
import SearchContent from './SearchContent';
import { Box } from 'gestalt';

type Props = {|
  cards: Array<React.Node>,
|};

const CardPage = ({ cards }: Props) => (
  <SearchContent>
    {cards.map((card, i) => (
      <Box marginBottom={4} id={`card-${i}`} key={i}>
        {card}
      </Box>
    ))}
  </SearchContent>
);

export default CardPage;
