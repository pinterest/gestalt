// @flow strict
import { Component, type Node } from 'react';

type Props = {
  children: Node,
};

export default class NoScrollBehavior extends Component<Props> {
  prevOverflow: string | null;

  constructor(props: Props) {
    super(props);
    this.prevOverflow = null;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.prevOverflow = window.document.body.style.overflow;
      window.document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.document.body.style.overflow = this.prevOverflow;
    }
  }

  render(): Node {
    return this.props.children;
  }
}
