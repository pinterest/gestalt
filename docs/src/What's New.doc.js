// @flow strict
import React, { type Node, useEffect } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import Markdown from './components/Markdown.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

function Changelog() {
  const [changelogData, setChangelogData] = React.useState('Loading changelog from GitHub...');

  useEffect(() => {
    const fetchChangelog = async () => {
      const result = await fetch(
        'https://cdn.jsdelivr.net/gh/pinterest/gestalt@master/CHANGELOG.md',
      );
      setChangelogData(
        result.ok
          ? await result.text()
          : 'There was error loading the changelog, please try again later.',
      );
    };

    fetchChangelog();
  }, []);

  return (
    <Box>
      <PageHeader name="What's New 🎉" showSourceLink={false} />
      <Flex alignItems="start" direction="column" gap={4}>
        <Flex gap={4}>
          <Link inline target="blank" href="https://npmjs.org/package/gestalt">
            <img
              src="https://img.shields.io/npm/v/gestalt.svg?label=gestalt"
              alt="Gestalt NPM package version badge"
            />
          </Link>

          <Link inline target="blank" href="https://npmjs.org/package/gestalt-datepicker">
            <img
              src="https://img.shields.io/npm/v/gestalt-datepicker.svg?label=gestalt-datepicker"
              alt="Gestalt DatePicker NPM package version badge"
            />
          </Link>
        </Flex>
        <Text>
          Gestalt is a set of React UI components that enforces Pinterest’s design language. We use
          it to streamline communication between designers and developers by enforcing a bunch of
          fundamental UI components. This common set of components helps raise the bar for UX &amp;
          accessibility across Pinterest.
        </Text>
        <Text>
          Find information below on all new and updated components by version number, as well as
          available codemods to help upgrade between versions.
        </Text>
      </Flex>

      <Markdown text={changelogData} type="changelog" />
    </Box>
  );
}

card(<Changelog />);

export default cards;
