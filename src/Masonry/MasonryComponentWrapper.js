// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  isInViewport: boolean,
  component: React.Node,
};

export default class MasonryComponentWrapper extends React.Component<Props> {
  static defaultProps: {};

  shouldComponentUpdate(props: Props) {
    return (
      props.isInViewport === true ||
      this.props.isInViewport !== props.isInViewport
    );
  }

  render() {
    return this.props.component;
  }
}

MasonryComponentWrapper.propTypes = {
  // Whether the wrapped component is in the viewport
  isInViewport: PropTypes.bool.isRequired,

  // The component to render
  component: PropTypes.node.isRequired,
};
