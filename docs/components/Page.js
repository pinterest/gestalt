// @flow strict
import { type Node, useEffect, Children } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import SearchContent from './SearchContent.js';
import Toc from './Toc.js';

const DETAIL_PAGE_MAX_WIDTH = 1312;

type Props = {|
  children: Node,
  title: string,
  showSideNav?: boolean,
  showEditLink?: boolean,
|};

export default function Page({
  title: page,
  children,
  showSideNav = true,
  showEditLink = true,
}: Props): Node {
  const sections = Children.toArray(children);

  const editPageUrl = `https://github.com/pinterest/gestalt/tree/master/docs/pages/${page.toLowerCase()}.js`;

  useEffect(() => {
    if (page && document) {
      document.title = `${page} - Gestalt`;
    }
  }, [page]);

  return (
    <Flex>
      <Box flex="grow" maxWidth={showSideNav ? DETAIL_PAGE_MAX_WIDTH : '100%'}>
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

        {showEditLink && (
          <Box marginTop={12}>
            <Link href={editPageUrl} target="blank" inline>
              <Text underline>Edit page on GitHub</Text>
            </Link>
          </Box>
        )}
      </Box>

      {showSideNav && (
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
