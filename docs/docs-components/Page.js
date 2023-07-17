// @flow strict
import { Children, type Node, useEffect } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import { CONTENT_MAX_WIDTH_PX } from './AppLayout.js';
import SearchContent from './SearchContent.js';
import Toc from './Toc.js';

const DETAIL_PAGE_MAX_WIDTH = 894;

type Props = {|
  children: Node,
  title: string,
  hideSideNav?: boolean,
  hideEditLink?: boolean,
  pageSourceUrl?: string,
|};

export default function Page({
  title: page,
  children,
  hideSideNav = false,
  hideEditLink = false,
  pageSourceUrl,
}: Props): Node {
  const sections = Children.toArray<Node>(children);

  const editPageUrl =
    pageSourceUrl ??
    `https://github.com/pinterest/gestalt/tree/master/docs/pages/web/${page.toLowerCase()}.js`;

  useEffect(() => {
    if (page && document) {
      document.title = `${page} - Gestalt`;
    }
  }, [page]);

  return (
    <Flex width="100%">
      <Box flex="grow" maxWidth={hideSideNav ? CONTENT_MAX_WIDTH_PX : DETAIL_PAGE_MAX_WIDTH}>
        <SearchContent>
          <Flex
            gap={{
              row: 0,
              column: 8,
            }}
            direction="column"
          >
            {sections.map((card, i) => (
              <Box
                id={`card-${i}`}
                // eslint-disable-next-line react/no-array-index-key
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

        {!hideEditLink && (
          <Box marginTop={12}>
            <Link href={editPageUrl} target="blank" display="inlineBlock">
              <Text underline>Edit page on GitHub</Text>
            </Link>
          </Box>
        )}
      </Box>

      {!hideSideNav && (
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
