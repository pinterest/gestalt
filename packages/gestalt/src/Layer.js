// @flow
import * as React from 'react';
import { createPortal } from 'react-dom';

type Props = {|
  children: React.Node,
|};
type State = {|
  mounted: boolean,
|};

export default class Layer extends React.Component<Props, State> {
  state = {
    mounted: false,
  };

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

  el: HTMLDivElement;

  render() {
    const { children } = this.props;
    return this.state.mounted && createPortal(children, this.el);
  }
}
