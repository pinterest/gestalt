// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Text } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';

const links: $ReadOnlyArray<{
  external: boolean,
  title: string,
  url: string,
}> = [
  {
    title: 'Careers',
    url: 'https://www.pinterestcareers.com/job-search-results/?keyword=gestalt',
    external: true,
  },
  {
    title: 'Code sandbox',
    url: 'https://codesandbox.io/s/gestalt-cnwugg?file=/yourCode.js',
    external: true,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/pinterest/gestalt',
    external: true,
  },
];

export default function Footer(): Node {
  return (
    <Box padding={4}>
      <Flex direction="row" alignItems="center" wrap>
        <Box column={12} mdColumn={3} padding={2}>
          <Flex
            alignItems="center"
            gap={{
              row: 2,
              column: 0,
            }}
          >
            <Box aria-hidden>
              <Icon icon="pinterest" color="default" size={24} accessibilityLabel="" />
            </Box>
            <Text size="100">
              <Link
                accessibilityLabel="Visit Pinterest.com"
                href="https://www.pinterest.com"
                onClick={() => trackButtonClick('Pinterest copyright')}
                target="blank"
              >
                &copy; {new Date().getFullYear()} Pinterest
              </Link>
            </Text>
          </Flex>
        </Box>
        <Box
          column={12}
          mdColumn={6}
          padding={2}
          display="inlineBlock"
          mdDisplay="flex"
          alignItems="center"
          justifyContent="center"
          wrap
        >
          {links.map(({ external, title, url }) => (
            <Box marginBottom={2} lgMarginBottom={0} smMarginEnd={4} key={title}>
              <Text inline>
                <Link
                  href={url}
                  onClick={() => trackButtonClick(title)}
                  externalLinkIcon={external ? 'default' : 'none'}
                  target={external ? 'blank' : undefined}
                >
                  {title}
                </Link>
              </Text>
            </Box>
          ))}
        </Box>
        <Box
          column={12}
          mdColumn={3}
          padding={2}
          display="block"
          mdDisplay="flex"
          justifyContent="end"
        >
          <Text inline size="100">
            <Link
              href="https://www.netlify.com/"
              target="blank"
              externalLinkIcon={{ color: 'default', size: '100' }}
            >
              This site is powered by Netlify
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
