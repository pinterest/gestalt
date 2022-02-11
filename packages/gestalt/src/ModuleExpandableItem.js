// @flow strict
import type { Element as ReactElement, Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import icons from './icons/index.js';
import ModuleTitle from './ModuleTitle.js';
import TapArea from './TapArea.js';
import Text from './Text.js';

/**
 * https://gestalt.pinterest.systems/module
 */
export default function ModuleExpandableItem({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  badgeText,
  children,
  icon,
  iconAccessibilityLabel,
  iconButton,
  id,
  isCollapsed,
  onModuleClicked,
  summary,
  title,
  type = 'info',
}: {|
  accessibilityCollapseLabel: string,
  accessibilityExpandLabel: string,
  badgeText?: string,
  children?: Node,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  iconButton?: ReactElement<typeof IconButton>,
  id: string,
  isCollapsed: boolean,
  onModuleClicked: (boolean) => void,
  summary?: $ReadOnlyArray<string>,
  title: string,
  type?: 'error' | 'info',
|}): Node {
  return (
    <Box padding={6}>
      <Flex direction="column" gap={6}>
        <TapArea
          accessibilityControls={id}
          accessibilityExpanded={!isCollapsed}
          accessibilityLabel={isCollapsed ? accessibilityExpandLabel : accessibilityCollapseLabel}
          onTap={({ event }) => {
            if (event?.target instanceof Element && event.target.closest('button') !== null) {
              return;
            }
            onModuleClicked(!isCollapsed);
          }}
        >
          <Flex>
            <Box alignItems="baseline" display="flex" flex="grow" marginEnd={6}>
              <Box column={isCollapsed && summary ? 6 : 12}>
                <ModuleTitle
                  badgeText={badgeText}
                  icon={icon}
                  iconAccessibilityLabel={iconAccessibilityLabel}
                  iconButton={iconButton}
                  title={title}
                  type={type}
                />
              </Box>

              {summary && isCollapsed && (
                <Box column={6} marginStart={6}>
                  <Flex direction="column" gap={2}>
                    {summary.map((item, i) => (
                      <Text key={i} size="200" lineClamp={1}>
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
