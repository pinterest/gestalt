// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import TapArea from './TapArea.js';
import Text from './Text.js';

type Props = {|
  id: string,
  title: string,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  summary?: Array<string>,
  isCollapsed: boolean,
  onModuleClicked: boolean => void,
  type?: 'error' | 'info',
  children?: Node,
|};

export default function ExpandableModuleBase({
  id,
  title,
  icon,
  iconAccessibilityLabel,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
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
        accessibilityLabel={
          isCollapsed ? accessibilityExpandLabel : accessibilityCollapseLabel
        }
        accessibilityControls={id}
        accessibilityExpanded={!isCollapsed}
      >
        <Box padding={6} display="flex" alignItems="center">
          <Box display="flex" flex="grow" marginEnd={6} alignItems="center">
            <Box column={isCollapsed && summary ? 6 : 12} display="flex">
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
              <Box column={6} paddingX={6}>
                {summary.map((item, i) => (
                  <Box key={i} marginBottom={i === item.length - 1 ? 0 : 2}>
                    <Text size="md" truncate>
                      {item}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box id={id}>
            {children && (
              <Box padding={2}>
                <Icon
                  icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                  color="darkGray"
                  size="12"
                  accessibilityLabel={
                    isCollapsed
                      ? accessibilityExpandLabel
                      : accessibilityCollapseLabel
                  }
                />
              </Box>
            )}
          </Box>
        </Box>
      </TapArea>
      {!isCollapsed && (
        <Box marginTop={-6} padding={6}>
          {children}
        </Box>
      )}
    </>
  );
}
