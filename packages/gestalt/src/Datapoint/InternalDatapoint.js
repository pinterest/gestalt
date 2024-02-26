// @flow strict
import { type Node as ReactNode } from 'react';
import DatapointTrend from './Trend';
import AccessibilityPause from '../accessibility/AccessibilityPause';
import Badge from '../Badge';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import TapArea from '../TapArea';
import Text from '../Text';
import Tooltip from '../Tooltip';
import { type Indexable } from '../zIndex';

type BadgeObject = {
  text: string,
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'recommendation'
    | 'darkWash'
    | 'lightWash',
};

type TrendObject = {
  accessibilityLabel: string,
  value: number,
};

type Props = {
  badge?: BadgeObject,
  /**
   * Changes the color of the text and internal items to be disabled
   */
  disabled?: boolean,
  /**
   * Number of lines to truncate the title value
   */
  lineClamp?: number,
  /**
   * Min width length for the title
   */
  minTitleWidth?: number,
  size?: 'md' | 'lg',
  title: string,
  tooltipText?: string,
  trend?: TrendObject,
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  tooltipZIndex?: Indexable,
  value: string,
};

function MaybeMinWidth({ minWidth, children }: { minWidth?: number, children: ReactNode }) {
  return minWidth ? <Box minWidth={minWidth}>{children}</Box> : children;
}

export default function InternalDatapoint({
  badge,
  disabled = false,
  lineClamp,
  minTitleWidth,
  size = 'md',
  title,
  tooltipText,
  tooltipZIndex,
  trend,
  trendSentiment = 'auto',
  value,
}: Props): ReactNode {
  const textColor = disabled ? 'subtle' : 'default';
  return (
    <Flex gap={{ column: 1, row: 0 }} direction="column">
      <Flex gap={{ row: 1, column: 0 }} alignItems="center" minHeight={24}>
        <MaybeMinWidth minWidth={minTitleWidth}>
          <Text size="200" color={textColor} lineClamp={lineClamp}>
            {title}
            <AccessibilityPause />
          </Text>
        </MaybeMinWidth>
        {tooltipText && (
          <Tooltip
            accessibilityLabel=""
            idealDirection="up"
            text={tooltipText}
            zIndex={tooltipZIndex}
          >
            {/* Interactive elements require an a11yLabel on them or their children.
            That's why we set`accessibilityLabel` on `TapArea` instead of `Tooltip` */}
            <TapArea accessibilityLabel={tooltipText} rounding="circle" tapStyle="none">
              <Icon accessibilityLabel="" size={16} icon="info-circle" color="subtle" />
            </TapArea>
          </Tooltip>
        )}
        {badge && <Badge text={badge.text} type={badge.type} />}
      </Flex>
      <Flex gap={size === 'lg' ? 4 : 2} alignItems="center">
        <Text size={size === 'lg' ? '500' : '400'} weight="bold" color={textColor}>
          {value}
          <AccessibilityPause />
        </Text>

        {trend && (
          <DatapointTrend
            disabled={disabled}
            sentiment={trendSentiment}
            value={trend.value}
            iconAccessibilityLabel={trend.accessibilityLabel}
          />
        )}
      </Flex>
    </Flex>
  );
}
