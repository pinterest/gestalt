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

  componentDidMount() {
    document.body.setAttribute('data-test-react-mounted', true);
  }

  componentWillUnmount() {
    document.body.removeAttribute('data-test-react-mounted');
  }

  render() {
    const { Component, styles, router } = this.props;
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
        <style jsx global>
          {styles}
        </style>
        <Component {...props} />
      </div>
    );
  }
}

export default withRouter(Container);
