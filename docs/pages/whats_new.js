// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import Markdown from '../components/Markdown.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';

const npmPackages = [
  'gestalt',
  'gestalt-datepicker',
  'gestalt-design-tokens',
  'eslint-plugin-gestalt',
];

export default function Changelog({ changelog }: {| changelog: string |}): Node {
  return (
    <Page title="Changelog">
      <Box>
        <PageHeader name="What's new 🎉" showSourceLink={false} />
        <Flex alignItems="start" direction="column" gap={4}>
          <Flex gap={4} wrap>
            {npmPackages.map((packageName) => (
              <Link
                key={packageName}
                inline
                target="blank"
                href={`https://npmjs.org/package/${packageName}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.shields.io/npm/v/${packageName}.svg?label=${packageName}`}
                  alt={`${packageName} NPM package version badge`}
                />
              </Link>
            ))}
          </Flex>
          <Text>
            Gestalt is a set of React UI components that enforces Pinterest’s design language. We
            use it to streamline communication between designers and developers by enforcing a bunch
            of fundamental UI components. This common set of components helps raise the bar for UX
            &amp; accessibility across Pinterest.
          </Text>
          <Text>
            Find information below on all new and updated components by version number, as well as
            available codemods to help upgrade between versions.
          </Text>
        </Flex>

        <Markdown text={changelog} type="changelog" />
      </Box>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| changelog: string |} |}> {
  const result = await fetch(
    'https://raw.githubusercontent.com/pinterest/gestalt/master/CHANGELOG.md',
  );
  return {
    props: { changelog: await result.text() },
  };
}
