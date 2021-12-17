// @flow strict
import type { Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import path from 'path';
import fs from 'fs';
import nextConfig from 'next/config';
import Markdown from '../components/Markdown.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';

export default function Changelog({ changelog }: {| changelog: string |}): Node {
  return (
    <Page title="Changelog">
      <Box>
        <PageHeader name="What's New 🎉" showSourceLink={false} />
        <Flex alignItems="start" direction="column" gap={4}>
          <Flex gap={4}>
            <Link inline target="blank" href="https://npmjs.org/package/gestalt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.shields.io/npm/v/gestalt.svg?label=gestalt"
                alt="Gestalt NPM package version badge"
              />
            </Link>

            <Link inline target="blank" href="https://npmjs.org/package/gestalt-datepicker">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.shields.io/npm/v/gestalt-datepicker.svg?label=gestalt-datepicker"
                alt="Gestalt DatePicker NPM package version badge"
              />
            </Link>
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

export async function getStaticProps(): Promise<{| props: {| changelog: string |} |}> {
  const filePath = path.join(nextConfig().serverRuntimeConfig.GESTALT_ROOT, `CHANGELOG.md`);
  const changelog = await fs.promises.readFile(filePath, 'utf-8');
  return {
    props: { changelog },
  };
}
