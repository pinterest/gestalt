// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Button from './Button.js';

describe('<Button />', () => {
  test('Custom color', () => {
    const instance = create(<Button color="transparent" text="Hello World" />)
      .root;
    expect(
      instance.find(element => element.type === 'button').props.className
    ).toContain('transparent');
  });

  test('Custom text color', () => {
    const instance = create(
      <Button color="white" textColor="blue" text="Hello World" />
    ).root;
    expect(
      instance.find(element => element.type === 'div').props.className
    ).toContain('blue');
  });

  test('Disabled state', () => {
    const instance = create(<Button color="red" disabled text="Hello World" />)
      .root;
    const { className } = instance.find(
      element => element.type === 'button'
    ).props;
    expect(className).toContain('disabled');
    expect(className).not.toContain('red');
  });
});
