// @flow strict
import React, { type Node } from 'react';
import Text from './Text.js';
import Heading from './Heading.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Tooltip from './Tooltip.js';
import TapArea from './TapArea.js';
import DatapointTrend from './DatapointTrend.js';

type TrendObject = {|
  accessibilityLabel: string,
  value: number,
|};

type Props = {|
  tooltipText?: string,
  size?: 'md' | 'lg',
  title: string,
  trend?: TrendObject,
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  value: string,
|};

/**
 * [Datapoint](https://gestalt.pinterest.systems/datapoint) displays at-a-glance data for a user to quickly view key metrics.
 *
 * ⚠️ Please note: Datapoint is not currently supported in dark mode.
 */
export default function Datapoint({
  tooltipText,
  size = 'md',
  title,
  trend,
  trendSentiment = 'auto',
  value,
}: Props): Node {
  const valueSize = size === 'lg' ? 'md' : 'sm';
  const percentChangeGap = size === 'lg' ? 4 : 2;

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
      <Flex gap={percentChangeGap} alignItems="center">
        <Heading accessibilityLevel="none" size={valueSize}>
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
