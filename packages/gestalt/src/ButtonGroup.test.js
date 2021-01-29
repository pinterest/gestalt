// @flow strict

import React from 'react';
import { create } from 'react-test-renderer';
import Button from './Button.js';
import ButtonGroup from './ButtonGroup.js';

describe('ButtonGroup', () => {
  test('Renders nothing when no children are passed in', () => {
    const tree = create(<ButtonGroup />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders the child without container when 1 child is passed in', () => {
    const tree = create(
      <ButtonGroup>
        <Button text="Button 1" />
      </ButtonGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders container with children when multiple children are passed in', () => {
    const tree = create(
      <ButtonGroup>
        <Button text="Button 1" />
        <Button text="Button 2" />
      </ButtonGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
