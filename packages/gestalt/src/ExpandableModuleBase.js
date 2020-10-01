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
  onModuleClicked?: boolean => void,
  type?: string,
  children?: Node,
|};

const EXPANDABLE_TYPE_ATTRIBUTES = {
  info: {
    color: 'darkGray',
  },
  error: {
    icon: 'workflow-status-problem',
    color: 'red',
    accessibilityLabel: 'Error icon',
  },
};

export default function ExpandableModuleBase({
  title,
  icon,
  iconAccessibilityLabel,
  summary,
  isCollapsed,
  onModuleClicked,
  type = 'info',
  children,
}: Props): Node {
  const handleModuleClick = () => {
    if (onModuleClicked) {
      onModuleClicked(!isCollapsed);
    }
  };
  return (
    <>
      <TapArea onTap={handleModuleClick}>
        <Box display="flex">
          <Box display="flex" flex="grow" marginEnd={6}>
            <Box column={isCollapsed ? 6 : 12} display="flex">
              {EXPANDABLE_TYPE_ATTRIBUTES[type].icon && (
                <Box marginEnd={2}>
                  <Icon
                    icon={EXPANDABLE_TYPE_ATTRIBUTES[type].icon}
                    accessibilityLabel={
                      EXPANDABLE_TYPE_ATTRIBUTES[type].accessibilityLabel
                    }
                    color={EXPANDABLE_TYPE_ATTRIBUTES[type].color}
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
                color={EXPANDABLE_TYPE_ATTRIBUTES[type].color}
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
