// @flow strict
import React, { useState, type Node } from 'react';
import Box from './Box.js';
import IconButton from './IconButton.js';
import Text from './Text.js';

type Props = {|
  id: ?string,
  title?: string | Node,
  description?: string | Node,
  summary?: string | Node,
  shouldShowSummaryInExpandState?: boolean,
  isDefaultCollapsed?: boolean,
  children?: Node,
  shouldShowArrow?: boolean,
|};

function Title({ title }: {| title: string | Node |}) {
  if (typeof title !== 'string') {
    return title;
  }
  return (
    <Text weight="bold" truncate>
      {title}
    </Text>
  );
}

function Description({ description }: {| description: string | Node |}) {
  if (typeof description !== 'string') {
    return description;
  }
  return (
    <Box paddingY={1}>
      <Text size="md" truncate>
        {description}
      </Text>
    </Box>
  );
}

function Summary({ summary }: {| summary: string | Node |}) {
  if (typeof summary !== 'string') {
    return summary;
  }
  return (
    <Box column={6}>
      <Text size="md" truncate>
        {summary}
      </Text>
    </Box>
  );
}

export default function ExpandableCard({
  id,
  title,
  description,
  summary,
  shouldShowSummaryInExpandState,
  isDefaultCollapsed = false,
  children,
  shouldShowArrow = true,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed);
  const shouldShowSummary =
    summary &&
    (isCollapsed || (!isCollapsed && shouldShowSummaryInExpandState));

  return (
    <>
      <Box id={id}>
        <Box display="flex">
          <Box
            display="flex"
            flex="grow"
            marginTop={1}
            marginEnd={6}
            alignItems="baseline"
          >
            <Box
              column={shouldShowSummary ? 6 : 12}
              display="flex"
              direction="column"
            >
              {title && <Title title={title} />}
              {description && <Description description={description} />}
            </Box>
            {shouldShowSummary && <Summary summary={summary} />}
          </Box>
          <Box>
            {children && shouldShowArrow && (
              <IconButton
                accessibilityLabel="arrow icon to expand or collapse the card"
                bgColor="white"
                icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                iconColor="darkGray"
                onClick={() => setIsCollapsed(!isCollapsed)}
                size="xs"
              />
            )}
          </Box>
        </Box>
        {!isCollapsed && <Box marginTop={6}>{children}</Box>}
      </Box>
    </>
  );
}
