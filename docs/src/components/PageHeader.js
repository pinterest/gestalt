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
import { usePinnedSectionContext } from './pinnedSectionContext.js';

type Props = {|
  name: string,
  description?: string,
  beta?: boolean,
  fileName?: string, // only use if name !== file name
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

export default function ComponentHeader({
  beta,
  name,
  description = '',
  fileName,
  showSourceLink = true,
}: Props): Node {
  const { pinnedSection, setPinnedSection } = usePinnedSectionContext();

  function handlePinnedComponents() {
    const arrayPinned = JSON.parse(pinnedSection);
    if (!arrayPinned.includes(fileName || name) && arrayPinned.length < 3) {
      return setPinnedSection(
        JSON.stringify([...arrayPinned, fileName || name])
      );
    }
    return setPinnedSection(
      JSON.stringify(arrayPinned.filter((item) => item !== (fileName || name)))
    );
  }

  const pinnedSectionArr = JSON.parse(pinnedSection);
  const pinnedSectionMax = pinnedSectionArr.length < 3;

  return (
    <Box marginBottom={6}>
      <Box marginBottom={4}>
        <Flex gap={2}>
          <Heading>
            {name}{' '}
            {beta ? (
              <Tooltip inline text="Do not use in production code">
                <Badge text="Beta" position="top" />
              </Tooltip>
            ) : null}
          </Heading>
          {showSourceLink && (
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
                selected={pinnedSectionArr.includes(fileName || name)}
                disabled={
                  !pinnedSectionMax &&
                  !pinnedSectionArr.includes(fileName || name)
                }
              />
            </Tooltip>
          )}
        </Flex>
        {showSourceLink && (
          <Text color="gray">
            <Link href={githubUrl(fileName || name)} inline>
              Source
            </Link>
          </Text>
        )}
      </Box>
      {description && <Markdown text={description} />}
    </Box>
  );
}
