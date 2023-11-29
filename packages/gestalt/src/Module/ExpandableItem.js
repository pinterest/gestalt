// @flow strict
import { type Element as ReactElement, type Node as ReactNode } from 'react';
import applyModuleDensityStyle from './applyModuleDensity';
import ModuleTitle from './Title';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import IconButton from '../IconButton';
import icons from '../icons/index';
import TapArea from '../TapArea';
import Text from '../Text';

type BadgeType = {
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
};

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
  size = 'lg',
  type = 'info',
}: {
  accessibilityCollapseLabel: string,
  accessibilityExpandLabel: string,
  badge?: BadgeType,
  children?: ReactNode,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  iconButton?: ReactElement<typeof IconButton>,
  id: string,
  isCollapsed: boolean,
  onModuleClicked: (boolean) => void,
  summary?: $ReadOnlyArray<string>,
  size?: 'sm' | 'md' | 'lg',
  title: string,
  type?: 'error' | 'info',
}): ReactNode {
  const { padding, gap, summaryListGap } = applyModuleDensityStyle(size);
  return (
    <Box padding={padding}>
      <Flex direction="column" gap={{ column: gap, row: 0 }}>
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
                  size={size}
                  iconAccessibilityLabel={iconAccessibilityLabel}
                  iconButton={iconButton}
                  title={title}
                  type={type}
                />
              </Box>

              {summary && isCollapsed && (
                <Box column={padding} marginStart={padding}>
                  <Flex direction="column" gap={{ column: summaryListGap, row: 0 }}>
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

            {/* Adding a max height because the line height is 24, and we don't want the icon container to expand */}
            {Boolean(children) && (
              <Box id={id} padding={1} display="flex" alignItems="center" maxHeight={24}>
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
