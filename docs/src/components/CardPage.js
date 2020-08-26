// @flow strict
import React from 'react';
import { Box, Sticky } from 'gestalt';
import SearchContent from './SearchContent.js';
import Toc from './Toc.js';

type Props = {|
  cards: Array<React.Node>,
|};

const CardPage = ({ cards }: Props) => (
  <Box display="flex">
    <Box flex="grow" maxWidth={1200}>
      <SearchContent>
        {cards.map((card, i) => (
          <Box
            marginBottom={4}
            id={`card-${i}`}
            key={i}
            dangerouslySetInlineStyle={{
              __style: {
                scrollMarginTop: 60,
              },
            }}
          >
            {card}
          </Box>
        ))}
      </SearchContent>
    </Box>
    <Box
      minWidth={200}
      maxWidth={240}
      marginStart={4}
      mdMarginStart={6}
      lgMarginStart={8}
      display="none"
      lgDisplay="block"
      flex="none"
    >
      <Sticky top={90}>
        <Toc cards={cards} />
      </Sticky>
    </Box>
  </Box>
);

export default CardPage;
