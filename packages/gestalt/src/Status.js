// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Text from './Text.js';

export type StatusColor = 'gray' | 'green' | 'orange' | 'red';

type Props = {|
  type?: string,
  name?: string,
  subText?: string,
  accessibilityLabel: string,
|};

export default function Status(props: Props): Node {
  const { accessibilityLabel, type, name, subText } = props;

  let color;
  let icon;

  /*
   * QUESTION: Are switch / case conditionals OK? I've had folks balk at their use in the past.
   */
  switch (type) {
    case 'unstarted':
      icon = 'workflow-status-unstarted';
      color = 'darkGray';
      break;
    case 'in-progress':
      icon = 'workflow-status-in-progress';
      color = 'green';
      break;
    case 'halted':
      icon = 'workflow-status-halted';
      color = 'darkGray';
      break;
    case 'ok':
      icon = 'workflow-status-ok';
      color = 'green';
      break;
    case 'problem':
      icon = 'workflow-status-problem';
      color = 'red';
      break;
    /*
     * TODO: We're missing the canceled icon - so that'll need to be added to the Icon component
     */
    /*
    case 'canceled':
      icon = 'workflow-status-canceled';
      color = 'green';
      break;
    */
    case 'warning':
      icon = 'workflow-status-warning';
      color = 'orange';
      break;
    default:
      icon = 'workflow-status-unstarted';
      color = 'darkGray';
  }

  const nameNode = name ? <Text size="md">{name}</Text> : null;
  const subTextNode = subText ? (
    <Text size="md" color="gray">
      {subText}
    </Text>
  ) : null;

  /*
   * QUESTION: This whole section seems janky. Would love to get your take on how to improve
   */
  let textNode = null;
  if (name && subText) {
    textNode = (
      <Flex direction="column">
        {nameNode}
        {subTextNode}
      </Flex>
    );
  } else if (name) {
    textNode = <React.Fragment>{nameNode}</React.Fragment>;
  }

  return (
    <Flex gap={2}>
      <Icon accessibilityLabel={accessibilityLabel} size={20} color={color} icon={icon} />
      {textNode}
    </Flex>
  );
}

Status.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  subText: PropTypes.string,
  accessibilityLabel: PropTypes.string.isRequired,
};
