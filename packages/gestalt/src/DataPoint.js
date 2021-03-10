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
  valuePercentChangeIconAccessibilityLabel: string,
  infoIconAccessibilityLabel: string,
  title?: string,
  value?: string,
  valuePercentChange?: number,
  infoText?: string,
  size?: 'sm' | 'lg',
|};

export default function DataPoint({
  infoIconAccessibilityLabel,
  valuePercentChangeIconAccessibilityLabel,
  title,
  value,
  valuePercentChange,
  infoText,
  size = 'sm',
}: Props): Node {
  const infoTextNode = infoText ? (
    <Tooltip text={infoText}>
      <IconButton
        accessibilityLabel={infoIconAccessibilityLabel}
        size="sm"
        icon="info-circle"
        iconColor="gray"
        padding={1}
      />
    </Tooltip>
  ) : null;

  /*
   * TODO: We need arrow-up and arrow-down icons added to Gestalt
   */
  const valueSize = size === 'lg' ? 'md' : 'sm';
  const valuePercentChangeGap = size === 'lg' ? 4 : 2;

  let valuePercentChangeNode;
  if (valuePercentChange === undefined || valuePercentChange === null) {
    valuePercentChangeNode = null;
  } else if (valuePercentChange > 0) {
    valuePercentChangeNode = (
      <Flex gap={1}>
        <Icon
          accessibilityLabel={valuePercentChangeIconAccessibilityLabel}
          size={16}
          icon="sort-ascending"
          color="green"
        />
        <Text size="sm" color="green" weight="bold">
          {valuePercentChange}%
        </Text>
      </Flex>
    );
  } else if (valuePercentChange < 0) {
    valuePercentChangeNode = (
      <Flex gap={1}>
        <Icon
          accessibilityLabel={valuePercentChangeIconAccessibilityLabel}
          size={16}
          icon="sort-descending"
          color="red"
        />
        <Text size="sm" color="red" weight="bold">
          {valuePercentChange}%
        </Text>
      </Flex>
    );
  } else {
    valuePercentChangeNode = (
      <Text size="sm" color="darkGray" weight="bold">
        {valuePercentChange}%
      </Text>
    );
  }

  return (
    <Flex gap={1} direction="column">
      <Flex gap={1} alignItems="center" minHeight={24}>
        <Text size="sm">{title}</Text>
        {infoTextNode}
      </Flex>
      <Flex gap={valuePercentChangeGap} alignItems="center">
        <Heading size={valueSize}>{value}</Heading>
        {valuePercentChangeNode}
      </Flex>
    </Flex>
  );
}

DataPoint.propTypes = {
  valuePercentChangeIconAccessibilityLabel: PropTypes.string.isRequired,
  infoIconAccessibilityLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valuePercentChange: PropTypes.number,
  infoText: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['sm', 'lg']),
};
