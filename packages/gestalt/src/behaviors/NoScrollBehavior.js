/* @flow */
import * as React from 'react';

type Props = {|
  children?: React.Node,
|};

export default class NoScrollBehavior extends React.Component<Props> {
  componentDidMount() {
    if (typeof window !== 'undefined' && window.document) {
      this.prevOverflow = window.document.body.style.overflow;
      window.document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (this.prevOverflow) {
      window.document.body.style.overflow = this.prevOverflow;
    }
  }

  prevOverflow: ?string;

  render() {
    return this.props.children;
  }
}
