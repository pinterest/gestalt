// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import ModuleTitle from './ModuleTitle.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import type { ModuleExpandableItemProps } from './moduleTypes.js';

/**
 * https://gestalt.pinterest.systems/Module
 */
export default function ModuleExpandableItem({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  children,
  iconAccessibilityLabel,
  id,
  isCollapsed,
  onModuleClicked,
  summary,
  title,
  type = 'info',
  ...props
}: ModuleExpandableItemProps): Node {
  return (
    <Box padding={6}>
      <Flex direction="column" gap={6}>
        <TapArea
          accessibilityControls={id}
          accessibilityExpanded={!isCollapsed}
          accessibilityLabel={isCollapsed ? accessibilityExpandLabel : accessibilityCollapseLabel}
          onTap={() => {
            onModuleClicked(!isCollapsed);
          }}
        >
          <Flex>
            <Box alignItems="baseline" display="flex" flex="grow" marginEnd={6}>
              <Box column={isCollapsed && summary ? 6 : 12}>
                <ModuleTitle
                  badgeText={props.badgeText ? props.badgeText : undefined}
                  icon={props.icon ? props.icon : undefined}
                  iconAccessibilityLabel={iconAccessibilityLabel}
                  iconButton={props.iconButton ? props.iconButton : undefined}
                  title={title}
                  type={type}
                />
              </Box>

              {summary && isCollapsed && (
                <Box column={6} marginStart={6}>
                  <Flex direction="column" gap={2}>
                    {summary.map((item, i) => (
                      <Text key={i} size="md" lineClamp={1}>
                        {item}
                      </Text>
                    ))}
                  </Flex>
                </Box>
              )}
            </Box>

            {Boolean(children) && (
              <Box id={id} padding={1}>
                <Icon
                  accessibilityLabel={
                    isCollapsed ? accessibilityExpandLabel : accessibilityCollapseLabel
                  }
                  color="darkGray"
                  icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                  size="12"
                />
              </Box>
            )}
          </Flex>
        </TapArea>

        {/* Flex.Item necessary to prevent gap from being applied to each child */}
        {!isCollapsed && <Flex.Item>{children}</Flex.Item>}
      </Flex>
    </Box>
  );
}
