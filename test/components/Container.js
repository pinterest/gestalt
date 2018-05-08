import React from 'react';
import 'gestalt/dist/gestalt.css';
import { withRouter } from 'next/router';

class Container extends React.Component {
  static defaultProps = {
    props: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      mounted: !this.props.props.hasOwnProperty('deferMount'),
    };
  }

  componentDidMount() {
    window.addEventListener('trigger-mount', this.handleMount);
  }

  componentWillUnmount() {
    window.removeEventListener('trigger-mount', this.handleMount);
  }

  handleMount = () => this.setState({ mounted: true });

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
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <Component {...props} />
      </div>
    );
  }
}

export default withRouter(Container);
