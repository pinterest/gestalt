// @flow
import * as React from 'react';
import 'gestalt/dist/gestalt.css';
import { withRouter } from 'next/router';

type Props<T> = {|
  Component: React.Component<T>,
  props: T,
  styles: string,
  router: {
    query: string,
  },
|};

type State = {|
  mounted: boolean,
|};

class Container<T> extends React.Component<Props<T>, State> {
  static defaultProps = {
    props: {},
  };

  state = {
    mounted: !Object.prototype.hasOwnProperty.call(
      this.props.router.query,
      'deferMount'
    ),
  };

  componentDidMount() {
    window.addEventListener('trigger-mount', this.handleMount);
  }

  componentWillUnmount() {
    window.removeEventListener('trigger-mount', this.handleMount);
  }

  handleMount = () => this.setState({ mounted: true });

  render() {
    const { Component, styles, router } = this.props;
    const { mounted } = this.state;
    const props = {
      ...this.props.props,
      ...router.query,
    };
    return (
      <div>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        {mounted && <Component {...props} />}
      </div>
    );
  }
}

export default withRouter(Container);
