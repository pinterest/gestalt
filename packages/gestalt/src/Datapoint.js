// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Text from './Text.js';
import Heading from './Heading.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Tooltip from './Tooltip.js';

const CHANGE_COLOR_MAP = {
  good: 'pine',
  bad: 'red',
  neutral: 'darkGray',
};

type Props = {|
  percentChangeAccessibilityLabel: string,
  title: string,
  value: string,
  percentChange?: number,
  changeType?: 'good' | 'bad' | 'neutral' | 'auto',
  infoText?: string,
  size?: 'md' | 'lg',
|};

const DatapointValueChange = ({
  type = 'auto',
  value,
  changeAccessibilityLabel,
}: {|
  value: number,
  changeAccessibilityLabel: string,
  type?: 'good' | 'bad' | 'neutral' | 'auto',
|}): Node => {
  let valueNode;
  let valueIcon;
  let valueColor;
  let valueChangeNode;

  if (value > 0) {
    valueColor = type !== 'auto' ? CHANGE_COLOR_MAP[type] : 'pine';
    valueIcon = (
      <Icon
        accessibilityLabel={changeAccessibilityLabel}
        size={16}
        icon="sort-ascending"
        color={valueColor}
      />
    );
    valueChangeNode = (
      <Text size="sm" color={valueColor} weight="bold">
        +{Math.abs(value)}%
      </Text>
    );
  } else if (value < 0) {
    valueColor = type !== 'auto' ? CHANGE_COLOR_MAP[type] : 'red';
    valueIcon = (
      <Icon
        accessibilityLabel={changeAccessibilityLabel}
        size={16}
        icon="sort-descending"
        color={valueColor}
      />
    );
    valueChangeNode = (
      <Text size="sm" color={valueColor} weight="bold">
        -{Math.abs(value)}%
      </Text>
    );
  } else {
    valueNode = (
      <Text size="sm" color={type !== 'auto' ? CHANGE_COLOR_MAP[type] : 'darkGray'} weight="bold">
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
};

export default function Datapoint({
  percentChangeAccessibilityLabel,
  title,
  value,
  percentChange,
  infoText,
  changeType = 'auto',
  size = 'md',
}: Props): Node {
  const infoTextNode = infoText ? (
    <Tooltip text={infoText}>
      <IconButton accessibilityLabel="" size="sm" icon="info-circle" iconColor="gray" padding={1} />
    </Tooltip>
  ) : null;

  const valueSize = size === 'lg' ? 'lg' : 'sm';
  const percentChangeGap = size === 'lg' ? 4 : 2;

  return (
    <Flex gap={1} direction="column">
      <Flex gap={1} alignItems="center" minHeight={24}>
        <Text size="sm">{title}</Text>
        {infoTextNode}
      </Flex>
      <Flex gap={percentChangeGap} alignItems="center">
        <Heading accessibilityLevel="none" size={valueSize}>
          {value}
        </Heading>
        {percentChange !== undefined && percentChange !== null ? (
          <DatapointValueChange
            type={changeType}
            value={percentChange}
            changeAccessibilityLabel={percentChangeAccessibilityLabel}
          />
        ) : null}
      </Flex>
    </Flex>
  );
}

Datapoint.propTypes = {
  percentChangeAccessibilityLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  percentChange: PropTypes.number,
  infoText: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  changeType: PropTypes.oneOf(['good', 'bad', 'neutral', 'auto']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['md', 'lg']),
};
