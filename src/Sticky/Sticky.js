// @flow

import React from 'react';
import layout from '../Layout.css';

type Threshold =
  | {| top: number |}
  | {| bottom: number |}
  | {| left: number |}
  | {| right: number |}
  | {| top: number, bottom: number |}
  | {| left: number, right: number |}
  | {| top: number, left: number, right: number, bottom: number |};

type Props = {|
  children: any,
  ...Threshold,
|};

export default function Sticky(props: Props) {
  const style = {
    top: typeof props.top === 'number' ? props.top : undefined,
    left: typeof props.left === 'number' ? props.left : undefined,
    right: typeof props.right === 'number' ? props.right : undefined,
    bottom: typeof props.bottom === 'number' ? props.bottom : undefined,
  };
  return (
    <div className={layout.sticky} style={style}>
      {props.children}
    </div>
  );
}
