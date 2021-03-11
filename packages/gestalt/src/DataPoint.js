// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Text from './Text.js';
import Heading from './Heading.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Tooltip from './Tooltip.js';

type Props = {|
  percentChangeAccessibilityLabel: string,
  title?: string,
  value?: string,
  percentChange?: number,
  infoText?: string,
  size?: 'sm' | 'lg',
|};

export default function DataPoint({
  percentChangeAccessibilityLabel,
  title,
  value,
  percentChange,
  infoText,
  size = 'sm',
}: Props): Node {
  const infoTextNode = infoText ? (
    <Tooltip text={infoText}>
      <IconButton accessibilityLabel="" size="sm" icon="info-circle" iconColor="gray" padding={1} />
    </Tooltip>
  ) : null;

  /*
   * TODO: We need arrow-up and arrow-down icons added to Gestalt
   */
  const valueSize = size === 'lg' ? 'md' : 'sm';
  const percentChangeGap = size === 'lg' ? 4 : 2;

  let percentChangeNode;
  if (percentChange === undefined || percentChange === null) {
    percentChangeNode = null;
  } else if (percentChange > 0) {
    percentChangeNode = (
      <Flex gap={1}>
        <Icon
          accessibilityLabel={percentChangeAccessibilityLabel}
          size={16}
          icon="sort-ascending"
          color="green"
        />
        <Text size="sm" color="green" weight="bold">
          {percentChange}%
        </Text>
      </Flex>
    );
  } else if (percentChange < 0) {
    percentChangeNode = (
      <Flex gap={1}>
        <Icon
          accessibilityLabel={percentChangeAccessibilityLabel}
          size={16}
          icon="sort-descending"
          color="red"
        />
        <Text size="sm" color="red" weight="bold">
          {percentChange}%
        </Text>
      </Flex>
    );
  } else {
    percentChangeNode = (
      <Text size="sm" color="darkGray" weight="bold">
        {percentChange}%
      </Text>
    );
  }

  return (
    <Flex gap={1} direction="column">
      <Flex gap={1} alignItems="center" minHeight={24}>
        <Text size="sm">{title}</Text>
        {infoTextNode}
      </Flex>
      <Flex gap={percentChangeGap} alignItems="center">
        <Heading size={valueSize}>{value}</Heading>
        {percentChangeNode}
      </Flex>
    </Flex>
  );
}

DataPoint.propTypes = {
  percentChangeAccessibilityLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  percentChange: PropTypes.number,
  infoText: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['sm', 'lg']),
};
