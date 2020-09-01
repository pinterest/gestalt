// @flow strict
import React from 'react';
import { Link, Link as Renamed } from 'gestalt';

export default function TestBox() {
  return <>
  <Link
    id="test"
    accessibilitySelected="test"
    role="tab"
    href='https://www.pinterest.com/'
  />
  <Renamed
    id="test"
    accessibilitySelected="test"
    role="tab"
    href='https://www.pinterest.com/'
  />
</>;
}
