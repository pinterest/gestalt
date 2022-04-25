// @flow strict
import { Fragment } from 'react';
import { Link as GestaltLink } from 'gestalt';

export default function TestBox() {
  return (
    <Fragment>
      <GestaltLink inline href="" underline="hover" />
      <GestaltLink inline href="" />
    </Fragment>
  );
}
