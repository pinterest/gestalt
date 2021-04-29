// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Text from './Text.js';
import Flex from './Flex.js';
import Icon from './Icon.js';

const TREND_COLOR_MAP = {
  good: 'pine',
  bad: 'red',
  neutral: 'darkGray',
};

type Sentiment = 'good' | 'bad' | 'neutral' | 'auto';

function getValueColor({ sentiment, value }) {
  if (sentiment === 'auto') {
    if (value === 0) {
      return 'darkGray';
    }
    return value > 0 ? 'pine' : 'red';
  }
  return TREND_COLOR_MAP[sentiment];
}

type Props = {|
  iconAccessibilityLabel: string,
  sentiment?: Sentiment,
  value: number,
|};

export default function DatapointTrend({
  iconAccessibilityLabel,
  sentiment = 'auto',
  value,
}: Props): Node {
  const color = getValueColor({ sentiment, value });

  return (
    <Flex gap={1}>
      {value !== 0 && (
        <Icon
          accessibilityLabel={iconAccessibilityLabel}
          color={color}
          icon={value > 0 ? 'sort-ascending' : 'sort-descending'}
          size={16}
        />
      )}

      <Text size="md" color={color} weight="bold">
        {`${Math.abs(value)}%`}
      </Text>
    </Flex>
  );
}

DatapointTrend.propTypes = {
  value: PropTypes.number,
  sentiment: (PropTypes.oneOf([
    'good',
    'bad',
    'neutral',
    'auto',
  ]): React$PropType$Primitive<Sentiment>),
  iconAccessibilityLabel: PropTypes.string,
};
