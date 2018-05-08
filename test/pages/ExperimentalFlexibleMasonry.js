// @flow
import * as React from 'react';
import ExperimentalMasonryExample from '../containers/ExperimentalMasonryExample';
import Container from '../components/Container';
import flexibleGridServerStyles from '../containers/classicGridServerStyles';
import masonryPins from '../utils/pins';

type Props<T> = {
  props: T,
  styles: string,
};

export default class ExperimentalFlexibleMasonry<T> extends React.Component<
  Props<T>
> {
  static getInitialProps() {
    return {
      styles: flexibleGridServerStyles,
      props: { initialPins: masonryPins, flexible: true },
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
