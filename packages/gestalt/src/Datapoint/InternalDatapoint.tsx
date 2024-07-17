import { ReactNode } from 'react';
import DatapointTrend from './Trend';
import AccessibilityPause from '../accessibility/AccessibilityPause';
import Badge from '../Badge';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import TapArea from '../TapArea';
import Text from '../Text';
import Tooltip from '../Tooltip';
import { Indexable } from '../zIndex';

type BadgeObject = {
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

type TrendObject = {
  accessibilityLabel: string;
  value: number;
};

type Props = {
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Adds a badge to the title. Currently a beta feature, expect changes.
   */
  badge?: BadgeObject;
  /**
   * Changes the color of the text and internal items to be disabled
   */
  disabled?: boolean;
  /**
   * Number of lines to truncate the title value
   */
  lineClamp?: number;
  /**
   * Min width length for the title
   */
  minTitleWidth?: number;
  /**
   * Max width for the title
   */
  maxTitleWidth?: number;
  /**
   * number of lines to have the row height for the title
   */
  numTitleRows?: number;
  size?: 'md' | 'lg';
  title: string;
  tooltipText?: string;
  trend?: TrendObject;
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto';
  tooltipZIndex?: Indexable;
  value: string;
};

function MaybeMinWidth({
  minWidth,
  maxWidth,
  numTitleRows,
  children,
}: {
  minWidth?: number;
  maxWidth?: number;
  numTitleRows?: number;
  children: ReactNode;
}) {
  return minWidth ? (
    <Box maxWidth={maxWidth} minHeight={`${numTitleRows || 1}em`} minWidth={minWidth}>
      {children}
    </Box>
  ) : (
    children
  );
}

export default function InternalDatapoint({
  dataTestId,
  badge,
  disabled = false,
  lineClamp,
  minTitleWidth,
  maxTitleWidth,
  numTitleRows,
  size = 'md',
  title,
  tooltipText,
  tooltipZIndex,
  trend,
  trendSentiment = 'auto',
  value,
}: Props) {
  const textColor = disabled ? 'subtle' : 'default';
  return (
    <Flex dataTestId={dataTestId} direction="column" gap={{ column: 1, row: 0 }}>
      <Flex alignItems="center" gap={{ row: 1, column: 0 }} minHeight={24}>
        <MaybeMinWidth
          maxWidth={maxTitleWidth}
          minWidth={minTitleWidth}
          numTitleRows={numTitleRows}
        >
          <Text color={textColor} lineClamp={lineClamp} size="200">
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
              <Icon accessibilityLabel="" color="subtle" icon="info-circle" size={16} />
            </TapArea>
          </Tooltip>
        )}
        {badge && <Badge text={badge.text} type={badge.type} />}
      </Flex>
      <Flex alignItems="center" gap={size === 'lg' ? 4 : 2}>
        <Text color={textColor} size={size === 'lg' ? '500' : '400'} weight="bold">
          {value}
          <AccessibilityPause />
        </Text>

        {trend && (
          <DatapointTrend
            disabled={disabled}
            iconAccessibilityLabel={trend.accessibilityLabel}
            sentiment={trendSentiment}
            value={trend.value}
          />
        )}
      </Flex>
    </Flex>
  );
}
