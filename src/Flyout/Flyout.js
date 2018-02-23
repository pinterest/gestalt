// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Controller from '../FlyoutUtils/Controller';

type Props = {|
  anchor: ?any,
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number,
|};

export default class Flyout extends React.PureComponent<Props> {
  render() {
    const {
      anchor,
      children,
      idealDirection,
      positionRelativeToAnchor = true,
      onDismiss,
      size,
    } = this.props;

    if (!anchor) {
      return null;
    }

    return (
      <Controller
        anchor={anchor}
        bgColor="white"
        idealDirection={idealDirection}
        onDismiss={onDismiss}
        positionRelativeToAnchor={positionRelativeToAnchor}
        shouldFocus
        size={size}
      >
        {children}
      </Controller>
    );
  }
}

Flyout.propTypes = {
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  ]),
};
