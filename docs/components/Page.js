// @flow strict
import { type Node, useEffect, Children } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import SearchContent from './SearchContent.js';
import Toc from './Toc.js';

type Props = {|
  children: Node,
  title: string,
  isFullWidth?: boolean,
|};

export default function Page({ title: page, children, isFullWidth = false }: Props): Node {
  const sections = Children.toArray(children);

  const DETAIL_PAGE_MAX_WIDTH = 1312;

  const editPageUrl = `https://github.com/pinterest/gestalt/tree/master/docs/pages/${page.toLowerCase()}.js`;

  useEffect(() => {
    if (page && document) {
      document.title = `${page} - Gestalt`;
    }
  }, [page]);

  return (
    <Flex>
      <Box flex="grow" maxWidth={isFullWidth ? '100%' : DETAIL_PAGE_MAX_WIDTH}>
        <SearchContent>
          <Flex gap={8} direction="column">
            {sections.map((card, i) => (
              <Box
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
          </Flex>
        </SearchContent>

        <Box marginTop={12} display="flex">
          <Link href={editPageUrl} target="blank" inline>
            <Flex gap={2}>
              <Text underline>Edit page on GitHub</Text>
            </Flex>
          </Link>
        </Box>
      </Box>

      {!isFullWidth && (
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
          <Toc cards={sections} />
        </Box>
      )}
    </Flex>
  );
}
