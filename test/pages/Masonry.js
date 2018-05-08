// @flow
import * as React from 'react';
import MasonryExample from '../containers/MasonryExample';
import Container from '../components/Container';
import classicGridServerStyles from '../containers/classicGridServerStyles';
import masonryPins from '../utils/pins';

type Props<T> = {
  props: T,
  styles: string,
};

export default class Masonry<T> extends React.Component<Props<T>> {
  static getInitialProps() {
    return {
      styles: classicGridServerStyles,
      props: { initialPins: masonryPins },
    };
  }
  render() {
    const { props, styles } = this.props;
    return (
      <Container Component={MasonryExample} styles={styles} props={props} />
    );
  }
}
