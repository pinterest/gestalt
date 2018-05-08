// @flow
import * as React from 'react';
import ExperimentalMasonryExample from '../containers/ExperimentalMasonryExample';
import Container from '../components/Container';
import classicGridServerStyles from '../containers/classicGridServerStyles';
import masonryPins from '../utils/pins';

type Props<T> = {
  props: T,
  styles: string,
};

export default class ExperimentalMasonry<T> extends React.Component<Props<T>> {
  static getInitialProps() {
    return {
      styles: classicGridServerStyles,
      props: { initialPins: masonryPins },
    };
  }
  render() {
    const { props, styles } = this.props;
    return (
      <Container
        Component={ExperimentalMasonryExample}
        styles={styles}
        props={props}
      />
    );
  }
}
