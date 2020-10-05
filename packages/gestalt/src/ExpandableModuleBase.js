// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import Stack from './Stack.js';
import TapArea from './TapArea.js';
import Text from './Text.js';

type Props = {|
  title: string,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  tapAccessibilityLabel: string,
  summary?: Array<string>,
  isCollapsed: boolean,
  onModuleClicked: boolean => void,
  type: 'error' | 'info',
  children?: Node,
|};

export default function ExpandableModuleBase({
  title,
  icon,
  iconAccessibilityLabel,
  tapAccessibilityLabel,
  summary,
  isCollapsed,
  onModuleClicked,
  type = 'info',
  children,
}: Props): Node {
  const EXPANDABLE_TYPE_ATTRIBUTES = {
    info: {
      icon,
      color: 'darkGray',
    },
    error: {
      icon: 'workflow-status-problem',
      color: 'red',
    },
  };

  return (
    <>
      <TapArea
        onTap={() => {
          onModuleClicked(!isCollapsed);
        }}
        accessibilityLabel={tapAccessibilityLabel}
      >
        <Box display="flex">
          <Box display="flex" flex="grow" marginEnd={6} alignItems="baseline">
            <Box column={isCollapsed ? 6 : 12} display="flex">
              {EXPANDABLE_TYPE_ATTRIBUTES[type].icon && (
                <Box marginEnd={2}>
                  <Icon
                    icon={EXPANDABLE_TYPE_ATTRIBUTES[type].icon}
                    accessibilityLabel={iconAccessibilityLabel || ''}
                    color={EXPANDABLE_TYPE_ATTRIBUTES[type].color}
                  />
                </Box>
              )}
              <Text
                weight="bold"
                truncate
                color={EXPANDABLE_TYPE_ATTRIBUTES[type].color}
              >
                {title}
              </Text>
            </Box>
            {summary && isCollapsed && (
              <Box column={6}>
                {summary.map((item, i) => (
                  <Stack key={i} gap={1}>
                    <Text size="md" truncate>
                      {item}
                    </Text>
                  </Stack>
                ))}
              </Box>
            )}
          </Box>
          <Box>
            {children && (
              <Box padding={2}>
                <Icon
                  icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                  color="darkGray"
                  size="12"
                  accessibilityLabel={tapAccessibilityLabel}
                />
              </Box>
            )}
          </Box>
        </Box>
      </TapArea>
      {!isCollapsed && <Box marginTop={6}>{children}</Box>}
    </>
  );
}
