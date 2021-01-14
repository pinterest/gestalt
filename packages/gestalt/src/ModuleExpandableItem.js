// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import { type BaseProps, type ExpandableItemProps } from './moduleTypes.js';
import ModuleTitle from './ModuleTitle.js';

type Props = {|
  ...BaseProps,
  ...ExpandableItemProps,
|};

export default function ModuleExpandableItem({
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
        <Box padding={6} display="flex">
          <Box display="flex" flex="grow" marginEnd={6} alignItems="baseline">
            <Box column={isCollapsed && summary ? 6 : 12} display="flex">
              <ModuleTitle
                type={type}
                title={title}
                icon={icon}
                iconAccessibilityLabel={iconAccessibilityLabel}
              />
            </Box>
            {summary && isCollapsed && (
              <Box column={6} marginStart={6}>
                {summary.map((item, i) => (
                  <Box key={i} marginBottom={i === summary.length - 1 ? 0 : 2}>
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
              <Box padding={1}>
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
