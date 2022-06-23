// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Text } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';

export default function Footer(): Node {
  const links = [
    { title: "What's new", url: 'https://gestalt.pinterest.systems/home' },
    { title: 'About us', url: 'https://gestalt.pinterest.systems/about_us' },
    { title: 'Careers', url: 'https://www.pinterestcareers.com/', external: true },
    { title: 'Code sandbox', url: 'https://codesandbox.io/s/k5plvp9v8v', external: true },
    { title: 'Github', url: 'https://github.com/pinterest/gestalt', external: true },
  ];
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: 'var(--color-orange-firetini-0)',
        },
      }}
      padding={4}
      mdPadding={6}
      lgPadding={8}
      role="contentinfo"
    >
      <Box paddingX={2} paddingY={1} display="flex" direction="column" mdDirection="row">
        <Box column={12} mdColumn={3} padding={2}>
          <Flex alignItems="center" gap={2}>
            <Box aria-hidden>
              <Icon icon="pinterest" color="default" size={24} accessibilityLabel="" />
            </Box>
            <Text color="default" size="100">
              <Link
                accessibilityLabel="Visit Pinterest.com"
                href="https://www.pinterest.com"
                onClick={() => trackButtonClick('Pinterest copyright')}
              >
                &copy; 2022 Pinterest
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
          justifyContent="center"
          wrap
        >
          {links.map((link, idx) => (
            <Box marginBottom={2} marginEnd={4} key={idx}>
              <Text inline weight="bold">
                <Link
                  href={link.url}
                  target="blank"
                  externalLinkIcon={link.external ? 'default' : 'none'}
                >
                  {link.title}
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
          <Text inline>
            <Link href="https://www.netlify.com/" target="blank" externalLinkIcon="default">
              This site is powered by Netlify
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
