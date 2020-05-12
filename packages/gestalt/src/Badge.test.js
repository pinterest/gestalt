// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Badge from './Badge.js';

it('Badge renders', () => {
  const component = create(<Badge text="Badge" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render with white text and blue background', () => {
  const instance = create(<Badge text="Badge" />).root;
  const { className } = instance.find(element => element.type === 'span').props;

  expect(className).toContain('blueBg');
});
