import { Children, ReactNode, useEffect } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import { CONTENT_MAX_WIDTH_PX } from './AppLayout';
import SearchContent from './SearchContent';
import Toc from './Toc';

const DETAIL_PAGE_MAX_WIDTH = 894;

type Props = {
  children: ReactNode;
  title: string;
  hideSideNav?: boolean;
  hideEditLink?: boolean;
  pageSourceUrl?: string;
};

export default function Page({
  title: page,
  children,
  hideSideNav = false,
  hideEditLink = false,
  pageSourceUrl,
}: Props) {
  // @ts-expect-error - TS2558 - Expected 0 type arguments, but got 1.
  const sections = Children.toArray<ReactNode>(children);

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
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            {sections.map((card, i) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                dangerouslySetInlineStyle={{
                  __style: {
                    scrollMarginTop: 60,
                  },
                }}
                id={`card-${i}`}
              >
                {card}
              </Box>
            ))}
          </Flex>
        </SearchContent>

        {!hideEditLink && (
          <Box marginTop={12}>
            <Link display="inlineBlock" href={editPageUrl} target="blank">
              <Text underline>Edit page on GitHub</Text>
            </Link>
          </Box>
        )}
      </Box>

      {!hideSideNav && (
        <Box
          display="none"
          flex="none"
          lgDisplay="block"
          lgMarginStart={8}
          marginStart={4}
          maxWidth={240}
          mdMarginStart={6}
          minWidth={200}
        >
          <Toc cards={sections} />
        </Box>
      )}
    </Flex>
  );
}
