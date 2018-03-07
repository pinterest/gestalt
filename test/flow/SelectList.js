// @flow
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';
import { SelectList } from '../../packages/gestalt/src';

type Enum = 'a' | 'b';

function makeList(options: Array<{ label: string, value: Enum }>, cb: any) {
  // $ExpectError
  return <SelectList id="list" onChange={cb} options={options} />;
}
