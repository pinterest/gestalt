import { ReactElement, ReactNode } from 'react';
import applyModuleDensityStyle from './applyModuleDensity';
import ModuleTitle from './Title';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
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
  dataTestId,
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
  dataTestId?: string;
  icon?: keyof typeof icons;
  iconAccessibilityLabel?: string;
  iconButton?: ReactElement;
  id: string;
  isCollapsed: boolean;
  onExpand: (arg1: boolean) => void;
  summary?: ReadonlyArray<string>;
  size?: 'sm' | 'md' | 'lg';
  title: string;
  type?: 'error' | 'info';
}) {
  const { padding, gap, summaryListGap } = applyModuleDensityStyle(size);
  const dataTestIdTap = dataTestId && `${dataTestId  }-taparea`;
  const dataTestIdTitle = dataTestId && `${dataTestId  }-title`;
  const dataTestIdCollapsedSummary = dataTestId && `${dataTestId  }-collapsed-summary`;
  const dataTestIdArrow = dataTestId && `${dataTestId  }-arrow`;
  const dataTestIdExpandedContent = dataTestId && `${dataTestId  }-expanded-content`;
  return (
    <Box padding={padding}>
      <Flex direction="column" gap={{ column: gap, row: 0 }}>
        <TapArea
          accessibilityControls={id}
          accessibilityExpanded={!isCollapsed}
          accessibilityLabel={isCollapsed ? accessibilityExpandLabel : accessibilityCollapseLabel}
          dataTestId={dataTestIdTap}
          onTap={({ event }) => {
            if (event?.target instanceof Element && event.target.closest('button') !== null) {
              return;
            }
            onExpand(!isCollapsed);
          }}
        >
          <Flex>
            <Box alignItems="baseline" display="flex" flex="grow" marginEnd={6}>
              <Box column={isCollapsed && summary ? 6 : 12} data-test-id={dataTestIdTitle}>
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
                <Box column={padding} data-test-id={dataTestIdCollapsedSummary} marginStart={padding}>
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
              <Box alignItems="center" data-test-id={dataTestIdArrow} display="flex" id={id} maxHeight={24} padding={1}>
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
        {!isCollapsed && <Flex.Item dataTestId={dataTestIdExpandedContent}>{children}</Flex.Item>}
      </Flex>
    </Box>
  );
}
