/* @flow */
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Column.css';

type DeprecatedColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ColumnProps =
  | {|
      children?: React.Node,
      span: Columns,
      smSpan?: Columns,
      mdSpan?: Columns,
      lgSpan?: Columns,
    |}
  | {|
      children?: React.Node,
      xs?: DeprecatedColumns,
      sm?: DeprecatedColumns,
      md?: DeprecatedColumns,
      lg?: DeprecatedColumns,
    |};

export default function Column(props: ColumnProps) {
  const { children } = props;
  const cs = classnames(
    (props.xs || props.sm || props.md || props.lg) && styles.deprecatedColumn,
    props.xs && styles[`xsCol${props.xs}`],
    props.sm && styles[`smCol${props.sm}`],
    props.md && styles[`mdCol${props.md}`],
    props.lg && styles[`lgCol${props.lg}`],
    props.span != null && styles[`xsCol${props.span}`],
    props.smSpan != null && styles[`smCol${props.smSpan}`],
    props.mdSpan != null && styles[`mdCol${props.mdSpan}`],
    props.lgSpan != null && styles[`lgCol${props.lgSpan}`]
  );
  return <div className={cs}>{children}</div>;
}

Column.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  span: PropTypes.number,
  smSpan: PropTypes.number,
  mdSpan: PropTypes.number,
  lgSpan: PropTypes.number,
};
