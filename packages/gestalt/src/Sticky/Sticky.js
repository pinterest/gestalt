// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import layout from '../Layout.css';

type Threshold =
  | {| top: number | string |}
  | {| bottom: number | string |}
  | {| left: number | string |}
  | {| right: number | string |}
  | {| top: number | string, bottom: number | string |}
  | {| left: number | string, right: number | string |}
  | {|
      top: number | string,
      left: number | string,
      right: number | string,
      bottom: number | string,
    |};

type Props = {|
  children: React.Node,
  dangerouslySetZIndex?: { __zIndex: number },
  ...Threshold,
|};

export default function Sticky(props: Props) {
  const { dangerouslySetZIndex = { __zIndex: 1 }, children } = props;
  const style = {
    top: props.top != null ? props.top : undefined,
    left: props.left != null ? props.left : undefined,
    right: props.right != null ? props.right : undefined,
    bottom: props.bottom != null ? props.bottom : undefined,
    // eslint-disable-next-line no-underscore-dangle
    zIndex: dangerouslySetZIndex.__zIndex,
  };
  return (
    <div className={layout.sticky} style={style}>
      {children}
    </div>
  );
}

Sticky.propTypes = {
  children: PropTypes.node,
  dangerouslySetZIndex: PropTypes.exact({
    __zIndex: PropTypes.number,
  }),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
