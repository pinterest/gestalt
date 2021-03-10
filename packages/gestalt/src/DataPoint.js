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
  valueChangeIconAccessibilityLabel: string,
  infoIconAccessibilityLabel: string,
  title?: string,
  value?: string,
  valueChange?: number,
  helperText?: string,
  size?: 'sm' | 'lg',
|};

export default function DataPoint({
  infoIconAccessibilityLabel,
  valueChangeIconAccessibilityLabel,
  title,
  value,
  valueChange,
  helperText,
  size = 'sm',
}: Props): Node {
  const helperTextNode = helperText ? (
    <Tooltip text={helperText}>
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
  const valueChangeGap = size === 'lg' ? 4 : 2;

  let valueChangeNode;
  if (valueChange === undefined || valueChange === null) {
    valueChangeNode = null;
  } else if (valueChange > 0) {
    valueChangeNode = (
      <Flex gap={1}>
        <Icon
          accessibilityLabel={valueChangeIconAccessibilityLabel}
          size={16}
          icon="arrow-up"
          color="green"
        />
        <Text size="sm" color="green" weight="bold">
          {valueChange}%
        </Text>
      </Flex>
    );
  } else if (valueChange < 0) {
    valueChangeNode = (
      <Flex gap={1}>
        <Icon
          accessibilityLabel={valueChangeIconAccessibilityLabel}
          size={16}
          icon="arrow-down"
          color="red"
        />
        <Text size="sm" color="red" weight="bold">
          {valueChange}%
        </Text>
      </Flex>
    );
  } else {
    valueChangeNode = (
      <Text size="sm" color="darkGray" weight="bold">
        {valueChange}%
      </Text>
    );
  }

  return (
    <Flex gap={1} direction="column">
      <Flex gap={1} alignItems="center" minHeight={24}>
        <Text size="sm">{title}</Text>
        {helperTextNode}
      </Flex>
      <Flex gap={valueChangeGap} alignItems="center">
        <Heading size={valueSize}>{value}</Heading>
        {valueChangeNode}
      </Flex>
    </Flex>
  );
}

DataPoint.propTypes = {
  valueChangeIconAccessibilityLabel: PropTypes.string.isRequired,
  infoIconAccessibilityLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueChange: PropTypes.number,
  helperText: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['sm', 'lg']),
};
