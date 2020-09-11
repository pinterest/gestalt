// @flow strict
import React, { useState, type Node } from 'react';
import { Box, Icon, IconButton, Text } from 'gestalt';
import slugify from 'slugify';

type Props = {|
  id: ?string,
  title?: string | Node,
  icon?: string,
  description?: string | Node,
  summary?: string | Node,
  shouldShowSummaryInExpandState?: boolean,
  isDefaultCollapsed?: boolean,
  children?: Node,
  shouldShowArrow?: boolean,
  onClick?: () => void,
|};

// TODO: handleKeyUp? ESCAPE_KEY_CODE?, warning?

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
  icon,
  description,
  summary,
  shouldShowSummaryInExpandState,
  isDefaultCollapsed = false,
  children,
  shouldShowArrow = true,
  onClick,
}: Props) {
  const slugifiedId = id ?? slugify(title);
  const iconAccessibilityLabel = 'Title icon';
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed);
  const shouldShowSummary =
    summary &&
    (isCollapsed || (!isCollapsed && shouldShowSummaryInExpandState));

  return (
    <>
      <Box id={slugifiedId}>
        <Box display="flex">
          <Box
            display="flex"
            flex="grow"
            marginTop={1}
            marginEnd={6}
            alignItems="baseline"
          >
            <Box column={shouldShowSummary ? 6 : 12} display="flex">
              <Box display="flex" alignItems="center">
                {icon && (
                  <Box marginEnd={2}>
                    <Icon
                      icon={icon}
                      accessibilityLabel={iconAccessibilityLabel}
                      color="darkGray"
                    />
                  </Box>
                )}
                <Box display="flex" direction="column">
                  {title && <Title title={title} />}
                  {description && <Description description={description} />}
                </Box>
              </Box>
            </Box>
            {shouldShowSummary && <Summary summary={summary} />}
          </Box>
          <Box>
            {children && shouldShowArrow && (
              <IconButton
                accessibilityLabel={iconAccessibilityLabel}
                bgColor="white"
                icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                iconColor="darkGray"
                onClick={onClick || (() => setIsCollapsed(!isCollapsed))}
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
