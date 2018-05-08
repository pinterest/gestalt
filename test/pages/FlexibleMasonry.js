// @flow
import * as React from 'react';
import MasonryExample from '../containers/MasonryExample';
import Container from '../components/Container';
import flexibleGridServerStyles from '../containers/classicGridServerStyles';
import masonryPins from '../utils/pins';

type Props<T> = {
  props: T,
  styles: string,
};

export default class FlexibleMasonry<T> extends React.Component<Props<T>> {
  static getInitialProps() {
    return {
      styles: flexibleGridServerStyles,
      props: { initialPins: masonryPins, flexible: true },
    };
  }
  render() {
    const { props, styles } = this.props;
    return (
      <Container Component={MasonryExample} styles={styles} props={props} />
    );
  }
}
