// @flow strict
import React, { type Node } from 'react';
import {
  Badge,
  Box,
  IconButton,
  Text,
  Tooltip,
  Heading,
  Link,
  Flex,
} from 'gestalt';
import Markdown from './Markdown.js';
import { useNavigationSidebarContext } from './navigationSidebarContext.js';

type Props = {|
  description?: string,
  beta?: boolean,
  fileName: string,
  showSourceLink?: boolean,
|};

const gestaltPath = (component) => {
  if (component === 'DatePicker') {
    return `packages/gestalt-datepicker/src/${component}.js`;
  }
  return `packages/gestalt/src/${component}.js`;
};

const githubUrl = (component) =>
  [
    'https://github.com/pinterest/gestalt/blob/master',
    gestaltPath(component),
  ].join('/');

const MAX_PINNED_SECTIONS = 3;

export default function ComponentHeader({
  beta,
  description = '',
  fileName,
  showSourceLink = true,
}: Props): Node {
  const { pinnedSection, setPinnedSection } = useNavigationSidebarContext();

  function handlePinnedComponents() {
    const arrayPinned = JSON.parse(pinnedSection);
    if (
      !arrayPinned.includes(fileName) &&
      arrayPinned.length < MAX_PINNED_SECTIONS
    ) {
      return setPinnedSection(JSON.stringify([...arrayPinned, fileName]));
    }
    if (arrayPinned.includes(fileName)) {
      return setPinnedSection(
        JSON.stringify(arrayPinned.filter((item) => item !== fileName))
      );
    }

    arrayPinned.shift();
    arrayPinned.push(fileName);

    return setPinnedSection(JSON.stringify(arrayPinned));
  }

  const pinnedSectionArr = JSON.parse(pinnedSection);
  const pinnedSectionMax = pinnedSectionArr.length < MAX_PINNED_SECTIONS;

  return (
    <Box marginBottom={6}>
      <Box marginBottom={4}>
        <Flex gap={2}>
          <Heading>
            {fileName}{' '}
            {beta ? (
              <Tooltip inline text="Do not use in production code">
                <Badge text="Beta" position="top" />
              </Tooltip>
            ) : null}
          </Heading>
          <Tooltip
            text={
              pinnedSectionMax
                ? 'Pin this section in the sidebar'
                : 'Max 3 pinned sections'
            }
          >
            <IconButton
              accessibilityLabel="Pin this section in navigation sidebar"
              icon="angled-pin"
              iconColor="gray"
              onClick={() => handlePinnedComponents()}
              padding={1}
              size="xs"
              selected={pinnedSectionArr.includes(fileName)}
            />
          </Tooltip>
        </Flex>
        {showSourceLink && (
          <Text color="gray">
            <Link href={githubUrl(fileName)} inline>
              Source
            </Link>
          </Text>
        )}
      </Box>
      {description && <Markdown text={description} />}
    </Box>
  );
}
