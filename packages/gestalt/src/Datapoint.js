// @flow strict
import { type Node } from 'react';
import DatapointTrend from './DatapointTrend.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import Tooltip from './Tooltip.js';

type TrendObject = {|
  accessibilityLabel: string,
  value: number,
|};

type Props = {|
  /**
   * Used to set the size of the datapoint. See the [size](#Size) variant to learn more.
   */
  size?: 'md' | 'lg',
  /**
   * The header text for the component.
   */
  title: string,
  /**
   * Contextual information displayed in a tooltip to describe the Datapoint. See the [tooltipText](#Tooltip-text) variant to learn more.
   */
  tooltipText?: string,
  /**
   * Object detailing the trend value (change in time - e.g., +30%), and accessibilityLabel to describe the trend's icon (e.g., "Trending up").  See the [trend](#Trend) variant to learn more.
   */
  trend?: TrendObject,
  /**
   * A visual indicator whether the trend is considered "good", "bad" or "neutral". By setting \`trendSentiment\` to \`auto\`, a positive trend will be considered "good", a negative trend will be considered "bad" and a trend of zero will be considered "neutral".  See the [trendSentiment](#Trend-sentiment) variant to learn more.
   */
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  /**
   * The datapoint value (e.g., 1.23M)
   */
  value: string,
|};

/**
 * [Datapoint](https://gestalt.pinterest.systems/datapoint) displays at-a-glance data for a user to quickly view key metrics.
 *
 * ⚠️ Please note: Datapoint is not currently supported in dark mode.
 */
export default function Datapoint({
  size = 'md',
  title,
  tooltipText,
  trend,
  trendSentiment = 'auto',
  value,
}: Props): Node {
  return (
    <Flex gap={1} direction="column">
      <Flex gap={1} alignItems="center" minHeight={24}>
        <Text size="md">{title}</Text>
        {tooltipText && (
          <Tooltip text={tooltipText} idealDirection="up">
            {/* Interactive elements require an a11yLabel on them or their children. In this particular case,
            screenreaders do read the Tooltip text that provides the context to the interactive children.
            Therefore no a11yLabel is needed and integration tests can be safely disabled. */}
            <TapArea accessibilityLabel="" rounding="circle" tapStyle="none">
              <Icon accessibilityLabel="" size={16} icon="info-circle" color="gray" />
            </TapArea>
          </Tooltip>
        )}
      </Flex>
      <Flex gap={size === 'lg' ? 4 : 2} alignItems="center">
        <Heading accessibilityLevel="none" size={size === 'lg' ? 'md' : 'sm'}>
          {value}
        </Heading>
        {trend && (
          <DatapointTrend
            sentiment={trendSentiment}
            value={trend.value}
            iconAccessibilityLabel={trend.accessibilityLabel}
          />
        )}
      </Flex>
    </Flex>
  );
}
