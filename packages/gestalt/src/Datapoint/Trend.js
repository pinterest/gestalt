// @flow strict
import { type Node } from 'react';
import Flex from '../Flex.js';
import Icon from '../Icon.js';
import Text from '../Text.js';

const TREND_COLOR_MAP = {
  good: 'success',
  bad: 'error',
  neutral: 'default',
};

type Sentiment = 'good' | 'bad' | 'neutral' | 'auto';

function getValueColor({ sentiment, value }: { sentiment: string, value: number }) {
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

export default function Trend({ iconAccessibilityLabel, sentiment = 'auto', value }: Props): Node {
  const color = getValueColor({ sentiment, value });

  return (
    <Flex gap={{ column: 0, row: 1 }}>
      {value !== 0 && (
        <Icon
          accessibilityLabel={iconAccessibilityLabel}
          color={color}
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
