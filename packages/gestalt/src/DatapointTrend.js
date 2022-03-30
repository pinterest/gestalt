// @flow strict
import { type Node } from 'react';
import Text from './Text.js';
import Flex from './Flex.js';
import Icon from './Icon.js';

const TREND_COLOR_MAP = {
  good: 'success',
  bad: 'error',
  neutral: 'default',
};

const NEW_TO_OLD_COLOR_MAPPING = {
  success: 'pine',
  error: 'red',
  default: 'darkGray',
};

type Sentiment = 'good' | 'bad' | 'neutral' | 'auto';

function getValueColor({ sentiment, value }) {
  if (sentiment === 'auto') {
    if (value === 0) {
      return 'default';
    }
    return value > 0 ? 'success' : 'error';
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
          color={NEW_TO_OLD_COLOR_MAPPING[color]}
          icon={value > 0 ? 'sort-ascending' : 'sort-descending'}
          size={16}
        />
      )}

      <Text size="200" color={color} weight="bold">
        {`${Math.abs(value)}%`}
      </Text>
    </Flex>
  );
}
