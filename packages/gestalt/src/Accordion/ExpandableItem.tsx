import { ReactElement, ReactNode } from 'react';
import applyModuleDensityStyle from './applyModuleDensity';
import ModuleTitle from './Title';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import IconButton from '../IconButton';
import icons from '../icons/index';
import TapArea from '../TapArea';
import Text from '../Text';

export type BadgeType = {
  text: string;
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'recommendation'
    | 'darkWash'
    | 'lightWash';
};

export default function AccordionExpandableItem({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  badge,
  children,
  icon,
  iconAccessibilityLabel,
  iconButton,
  id,
  isCollapsed,
  onExpand,
  summary,
  title,
  size = 'lg',
  type = 'info',
}: {
  accessibilityCollapseLabel: string;
  accessibilityExpandLabel: string;
  badge?: BadgeType;
  children?: ReactNode;
  icon?: keyof typeof icons;
  iconAccessibilityLabel?: string;
  iconButton?: ReactElement<typeof IconButton>;
  id: string;
  isCollapsed: boolean;
  onExpand: (arg1: boolean) => void;
  summary?: ReadonlyArray<string>;
  size?: 'sm' | 'md' | 'lg';
  title: string;
  type?: 'error' | 'info';
}) {
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
            onExpand(!isCollapsed);
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
                  size={size}
                  title={title}
                  type={type}
                />
              </Box>

              {summary && isCollapsed && (
                <Box column={padding} marginStart={padding}>
                  <Flex direction="column" gap={{ column: summaryListGap, row: 0 }}>
                    {summary.map((item, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Text key={i} lineClamp={1} size="200">
                        {item}
                      </Text>
                    ))}
                  </Flex>
                </Box>
              )}
            </Box>

            {/* Adding a max height because the line height is 24, and we don't want the icon container to expand */}
            {Boolean(children) && (
              <Box alignItems="center" display="flex" id={id} maxHeight={24} padding={1}>
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
