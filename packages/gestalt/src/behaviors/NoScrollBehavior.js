/* @flow */
import * as React from 'react';

type Props = {|
  children?: React.Node,
|};

export default class NoScrollBehavior extends React.Component<Props> {
  componentDidMount() {
    if (document && document.body) {
      this.prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (this.prevOverflow && document && document.body) {
      document.body.style.overflow = this.prevOverflow;
    }
  }

  prevOverflow: ?string;

  render() {
    return this.props.children;
  }
}
