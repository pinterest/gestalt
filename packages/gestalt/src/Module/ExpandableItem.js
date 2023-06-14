// @flow strict
import { type Element as ReactElement, type Node } from 'react';
import ModuleTitle from './Title.js';
import Box from '../Box.js';
import Flex from '../Flex.js';
import Icon from '../Icon.js';
import IconButton from '../IconButton.js';
import icons from '../icons/index.js';
import TapArea from '../TapArea.js';
import Text from '../Text.js';

type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
|};

export default function ModuleExpandableItem({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  badge,
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
  badge?: BadgeType,
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
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
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
                  badge={badge}
                  icon={icon}
                  iconAccessibilityLabel={iconAccessibilityLabel}
                  iconButton={iconButton}
                  title={title}
                  type={type}
                />
              </Box>

              {summary && isCollapsed && (
                <Box column={6} marginStart={6}>
                  <Flex direction="column" gap={{ column: 2, row: 0 }}>
                    {summary.map((item, i) => (
                      // eslint-disable-next-line react/no-array-index-key
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
                  color="default"
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
