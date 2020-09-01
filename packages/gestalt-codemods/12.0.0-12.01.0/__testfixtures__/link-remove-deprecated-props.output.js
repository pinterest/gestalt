// @flow strict
import React from 'react';
import { Link, Link as Renamed } from 'gestalt';

export default function TestBox() {
  return <>
  <Link href='https://www.pinterest.com/' />
  <Renamed href='https://www.pinterest.com/' />
</>;
}
