// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import SearchContent from './SearchContent.js';
import Toc from './Toc.js';

type Props = {|
  cards: Array<Node>,
  page: string,
|};

export default function CardPage({ cards, page }: Props): Node {
  const editPageUrl = `https://github.com/pinterest/gestalt/tree/master/docs/src/${page}.doc.js`;

  return (
    <Flex>
      <Box flex="grow" maxWidth={800}>
        <SearchContent>
          {cards.map((card, i) => (
            <Box
              marginBottom={12}
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

        <Box marginTop={12} display="flex">
          <Link href={editPageUrl} target="blank" inline>
            <Flex gap={2}>
              <Text weight="bold">Edit page on GitHub</Text>
            </Flex>
          </Link>
        </Box>
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
        <Toc cards={cards} />
      </Box>
    </Flex>
  );
}
