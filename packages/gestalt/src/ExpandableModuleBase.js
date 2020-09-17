// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import IconButton from './IconButton.js';
import Icon from './Icon.js';
import TapArea from './TapArea.js';
import Text from './Text.js';

type Props = {|
  title: string,
  icon?: string,
  iconAccessibilityLabel?: string,
  summary?: Array<string>,
  isCollapsed: boolean,
  hasError?: boolean,
  onModuleClicked?: boolean => void,
  children?: Node,
|};

export default function ExpandableModuleBase({
  title,
  icon,
  iconAccessibilityLabel,
  summary,
  isCollapsed,
  hasError,
  onModuleClicked,
  children,
}: Props) {
  return (
    <>
      <TapArea onTap={() => onModuleClicked(!isCollapsed)}>
        <Box display="flex">
          <Box display="flex" flex="grow" marginEnd={6}>
            <Box column={isCollapsed ? 6 : 12} display="flex">
              {hasError && (
                <Box marginEnd={2}>
                  <Icon
                    icon="workflow-status-problem"
                    accessibilityLabel="Error icon"
                    color="red"
                  />
                </Box>
              )}
              {icon && (
                <Box paddingX={2}>
                  <Icon
                    icon="lock"
                    accessibilityLabel={iconAccessibilityLabel || 'Title icon'}
                    color="darkGray"
                  />
                </Box>
              )}
              <Text
                weight="bold"
                truncate
                color={hasError ? 'red' : 'darkGray'}
              >
                {title}
              </Text>
            </Box>
            {summary && isCollapsed && (
              <Box column={6}>
                {summary.map((item, i) => (
                  <Box key={i} paddingY={1}>
                    <Text size="md" truncate>
                      {item}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box>
            {children && (
              <IconButton
                accessibilityLabel="arrow icon to expand or collapse the module"
                bgColor="white"
                icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                iconColor="darkGray"
                size="xs"
              />
            )}
          </Box>
        </Box>
      </TapArea>
      {!isCollapsed && <Box marginTop={6}>{children}</Box>}
    </>
  );
}
