// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon.js';
import Tooltip from './Tooltip.js';
// import styles from './Status.css';

export type StatusColor = 'gray' | 'green' | 'orange' | 'red';

type Props = {|
  type?: string,
|};

export default function Status(props: Props): Node {
  const { type } = props;

  let accessibilityLabel;
  let color;
  let icon;

  switch (type) {
    case 'unstarted':
      icon = 'workflow-status-unstarted';
      color = 'darkGray';
      accessibilityLabel = 'Unstarted';
      break;
    case 'in-progress':
      icon = 'workflow-status-in-progress';
      color = 'green';
      accessibilityLabel = 'Unstarted';
      break;
    case 'halted':
      icon = 'workflow-status-halted';
      color = 'darkGray';
      accessibilityLabel = 'Unstarted';
      break;
    case 'ok':
      icon = 'workflow-status-ok';
      color = 'green';
      accessibilityLabel = 'Unstarted';
      break;
    case 'problem':
      icon = 'workflow-status-problem';
      color = 'red';
      accessibilityLabel = 'Unstarted';
      break;
    /*
    case 'canceled':
      icon = 'workflow-status-canceled';
      color = 'green';
      accessibilityLabel = 'Unstarted';
      break;
    */
    case 'warning':
      icon = 'workflow-status-warning';
      color = 'orange';
      accessibilityLabel = 'Unstarted';
      break;
    default:
      icon = 'workflow-status-unstarted';
      color = 'darkGray';
      accessibilityLabel = 'Unstarted';
  }

  return (
    <Tooltip text="Send Pin">
      <Icon accessibilityLabel={accessibilityLabel} color={color} icon={icon} />
    </Tooltip>
  );
}

Status.propTypes = {
  type: PropTypes.string,
};
