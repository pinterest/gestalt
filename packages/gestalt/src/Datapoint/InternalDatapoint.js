// @flow strict
import { type Node } from 'react';
import Badge from '../Badge.js';
import Flex from '../Flex.js';
import Icon from '../Icon.js';
import TapArea from '../TapArea.js';
import Text from '../Text.js';
import Tooltip from '../Tooltip.js';
import { type Indexable } from '../zIndex.js';
import DatapointTrend from './Trend.js';

type BadgeObject = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
|};

type TrendObject = {|
  accessibilityLabel: string,
  value: number,
|};

type Props = {|
  badge?: BadgeObject,
  /**
   * Changes the color of the text and internal items to be disabled
   */
  disabled?: boolean,
  /**
   * Number of lines to truncate the title value
   */
  lineClamp?: number,
  size?: 'md' | 'lg',
  title: string,
  tooltipText?: string,
  trend?: TrendObject,
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  tooltipZIndex?: Indexable,
  value: string,
|};

export default function InternalDatapoint({
  badge,
  disabled = false,
  lineClamp,
  size = 'md',
  title,
  tooltipText,
  tooltipZIndex,
  trend,
  trendSentiment = 'auto',
  value,
}: Props): Node {
  const textColor = disabled ? 'subtle' : 'default';
  return (
    <Flex gap={{ column: 1, row: 0 }} direction="column">
      <Flex gap={{ row: 1, column: 0 }} alignItems="center" minHeight={24}>
        <Text size="200" color={textColor} lineClamp={lineClamp}>
          {title}
        </Text>
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
