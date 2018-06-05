// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Controller from '../FlyoutUtils/Controller';

type Props = {|
  anchor: ?any,
  children?: React.Node,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  role?: 'alertdialog' | 'dialog',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number,
|};

export default function Flyout(props: Props) {
  const {
    anchor,
    children,
    idealDirection,
    onDismiss,
    positionRelativeToAnchor = true,
    role,
    size,
  } = props;

  if (!anchor) {
    return null;
  }

  const bgColor = role === 'alertdialog' ? 'orange' : 'white';

  return (
    <Controller
      anchor={anchor}
      bgColor={bgColor}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      shouldFocus={role === 'dialog'}
      size={size}
    >
      {children}
    </Controller>
  );
}

Flyout.defaultProps = {
  role: 'dialog',
  positionRelativeToAnchor: true,
};

Flyout.propTypes = {
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  role: PropTypes.oneOf(['alertdialog', 'dialog']),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  ]),
};
