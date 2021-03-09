// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Text from './Text.js';
import Heading from './Heading.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Tooltip from './Tooltip.js';

type Props = {|
  accessibilityLabel: string,
  title?: string,
  value?: string,
  delta?: number,
  helperText?: string,
  size?: 'sm' | 'md' | 'lg',
|};

export default function DataPoint({
  accessibilityLabel,
  title,
  value,
  delta,
  helperText,
  size,
}: Props): Node {
  const helperTextNode = helperText ? (
    <Tooltip text={helperText}>
      <Icon accessibilityLabel={accessibilityLabel} icon="info-circle" color="gray" />
    </Tooltip>
  ) : null;

  /*
   * TODO: We need arrow-up and arrow-down icons added to Gestalt
   */

  const valueSize = size === 'lg' ? 'md' : 'sm';
  const valueDeltaGap = size === 'lg' ? 4 : 2;

  let deltaIcon;
  let deltaColor;
  if (delta > 0) {
    deltaColor = 'green';
    deltaIcon = (
      <Icon accessibilityLabel={accessibilityLabel} size={16} icon="arrow-up" color={deltaColor} />
    );
  } else if (delta < 0) {
    deltaColor = 'red';
    deltaIcon = (
      <Icon
        accessibilityLabel={accessibilityLabel}
        size={16}
        icon="arrow-down"
        color={deltaColor}
      />
    );
  } else {
    deltaColor = 'darkGray';
    deltaIcon = null;
  }

  return (
    <Flex gap={2} direction="column">
      <Flex gap={2}>
        <Text size="sm">{title}</Text>
        {helperTextNode}
      </Flex>
      <Flex gap={valueDeltaGap} alignItems="center">
        <Heading size={valueSize}>{value}</Heading>
        <Flex gap={1}>
          {deltaIcon}
          <Text size="sm" color={deltaColor} weight="bold">
            {delta}%
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

DataPoint.propTypes = {
  accessibilityLabel: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  delta: PropTypes.number,
  helperText: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
