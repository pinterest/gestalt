// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Button from './Button';

test('<Button color="transparent" />', () => {
  const tree = create(
    <Button color="transparent" text="Hello World" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
