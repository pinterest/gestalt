// @flow strict
import * as React from 'react';
// flowlint-next-line untyped-import:off
import { createPortal } from 'react-dom';

type Props = {|
  children: React.Node,
|};

type State = {|
  mounted: boolean,
|};

export default class Layer extends React.Component<Props, State> {
  state: State = {
    mounted: false,
  };

  el: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    if (typeof document !== 'undefined' && document.createElement) {
      this.el = document.createElement('div');
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Using Layer without document present. Children will not be rendered.'
      );
    }
  }

  componentDidMount() {
    if (typeof document !== 'undefined' && document.body) {
      document.body.appendChild(this.el);
      this.setState({ mounted: true });
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el);
    }
  }

  render(): React.Portal | null {
    const { children } = this.props;
    const { mounted } = this.state;
    if (!mounted) {
      return null;
    }
    return createPortal(children, this.el);
  }
}
