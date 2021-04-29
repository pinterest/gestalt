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

type Props = {|
  value: number,
  trendAccessibilityLabel: string,
  type?: 'good' | 'bad' | 'neutral' | 'auto',
|};

export default function DatapointTrend({
  type = 'auto',
  value,
  trendAccessibilityLabel,
}: Props): Node {
  let valueNode;
  let valueIcon;
  let valueColor;
  let valueChangeNode;

  if (value > 0) {
    valueColor = type !== 'auto' ? TREND_COLOR_MAP[type] : 'pine';
    valueIcon = (
      <Icon
        accessibilityLabel={trendAccessibilityLabel}
        size={16}
        icon="sort-ascending"
        color={valueColor}
      />
    );
    valueChangeNode = (
      <Text size="sm" color={valueColor} weight="bold">
        {value}%
      </Text>
    );
  } else if (value < 0) {
    valueColor = type !== 'auto' ? TREND_COLOR_MAP[type] : 'red';
    valueIcon = (
      <Icon
        accessibilityLabel={trendAccessibilityLabel}
        size={16}
        icon="sort-descending"
        color={valueColor}
      />
    );
    valueChangeNode = (
      <Text size="sm" color={valueColor} weight="bold">
        {Math.abs(value)}%
      </Text>
    );
  } else {
    valueNode = (
      <Text size="sm" color={type !== 'auto' ? TREND_COLOR_MAP[type] : 'darkGray'} weight="bold">
        {value}%
      </Text>
    );
  }

  if (valueIcon) {
    valueNode = (
      <Flex gap={1}>
        {valueIcon}
        {valueChangeNode}
      </Flex>
    );
  }

  return <React.Fragment>{valueNode}</React.Fragment>;
}

DatapointTrend.displayName = 'DatapointTrend';

DatapointTrend.propTypes = {
  value: PropTypes.number,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  type: PropTypes.oneOf(['good', 'bad', 'neutral', 'auto']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  trendAccessibilityLabel: PropTypes.string,
};
