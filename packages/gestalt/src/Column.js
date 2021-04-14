// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Column.css';

type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ColumnProps = {|
  children?: Node,
  span: Columns,
  smSpan?: Columns,
  mdSpan?: Columns,
  lgSpan?: Columns,
|};

export default function Column(props: ColumnProps): Node {
  const { children } = props;
  const cs = classnames(
    props.span != null && styles[`xsCol${props.span}`],
    props.smSpan != null && styles[`smCol${props.smSpan}`],
    props.mdSpan != null && styles[`mdCol${props.mdSpan}`],
    props.lgSpan != null && styles[`lgCol${props.lgSpan}`],
  );
  return <div className={cs}>{children}</div>;
}

Column.propTypes = {
  children: PropTypes.node,
  span: PropTypes.number,
  smSpan: PropTypes.number,
  mdSpan: PropTypes.number,
  lgSpan: PropTypes.number,
};
