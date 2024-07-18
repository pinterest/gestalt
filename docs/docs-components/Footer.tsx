import { Box, Flex, Icon, Link, Text } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick';

const links: ReadonlyArray<{
  external: boolean;
  title: string;
  url: string;
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

export default function Footer() {
  return (
    <Box padding={4}>
      <Flex alignItems="center" direction="row" wrap>
        <Box column={12} mdColumn={3} padding={2}>
          <Flex
            alignItems="center"
            gap={{
              row: 2,
              column: 0,
            }}
          >
            <Box aria-hidden>
              <Icon accessibilityLabel="" color="default" icon="pinterest" size={24} />
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
          alignItems="center"
          column={12}
          display="inlineBlock"
          justifyContent="center"
          mdColumn={6}
          mdDisplay="flex"
          padding={2}
          wrap
        >
          {links.map(({ external, title, url }) => (
            <Box key={title} lgMarginBottom={0} marginBottom={2} smMarginEnd={4}>
              <Text inline>
                <Link
                  externalLinkIcon={external ? 'default' : 'none'}
                  href={url}
                  onClick={() => trackButtonClick(title)}
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
          display="block"
          justifyContent="end"
          mdColumn={3}
          mdDisplay="flex"
          padding={2}
        >
          <Text inline size="100">
            <Link
              externalLinkIcon={{ size: '100' }}
              href="https://www.netlify.com/"
              target="blank"
            >
              This site is powered by Netlify
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
