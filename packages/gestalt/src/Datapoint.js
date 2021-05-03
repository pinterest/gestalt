// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Text from './Text.js';
import Heading from './Heading.js';
import Flex from './Flex.js';
import IconButton from './IconButton.js';
import Tooltip from './Tooltip.js';
import DatapointTrend from './DatapointTrend.js';

type TrendObject = {|
  accessibilityLabel: string,
  value: number,
|};

type Sentiment = 'good' | 'bad' | 'neutral' | 'auto';

type Props = {|
  tooltipText?: string,
  size?: 'md' | 'lg',
  title: string,
  trend?: TrendObject,
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  value: string,
|};

export default function Datapoint({
  tooltipText,
  size = 'md',
  title,
  trend,
  trendSentiment = 'auto',
  value,
}: Props): Node {
  const valueSize = size === 'lg' ? 'lg' : 'sm';
  const percentChangeGap = size === 'lg' ? 4 : 2;

  return (
    <Flex gap={1} direction="column">
      <Flex gap={1} alignItems="center" minHeight={24}>
        <Text size="sm">{title}</Text>
        {tooltipText && (
          <Tooltip text={tooltipText} idealDirection="up">
            <IconButton
              accessibilityLabel=""
              size="sm"
              icon="info-circle"
              iconColor="gray"
              padding={1}
            />
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

Datapoint.propTypes = {
  tooltipText: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['md', 'lg']),
  title: PropTypes.string.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  trend: PropTypes.shape({
    accessibilityLabel: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }),
  trendSentiment: (PropTypes.oneOf([
    'good',
    'bad',
    'neutral',
    'auto',
  ]): React$PropType$Primitive<Sentiment>),
  value: PropTypes.string.isRequired,
};
